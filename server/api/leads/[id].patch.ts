// server/api/leads/[id].patch.ts
import { defineEventHandler, readBody, createError, sendError } from 'h3'
import Lead from '../../models/Lead'
import User from '../../models/User'
import { connectDB } from '../../utils/mongoose'

export default defineEventHandler(async (event) => {
  await connectDB()

  try {
    const id = event.context.params?.id
    if (!id) {
      throw createError({ statusCode: 400, statusMessage: 'Missing lead id' })
    }

    const body: any = (await readBody(event)) || {}

    // load current lead document (use any to avoid TS type issues)
    const leadDoc: any = await Lead.findById(id)
    if (!leadDoc) {
      throw createError({ statusCode: 404, statusMessage: 'Lead not found' })
    }

    // Keep previous values for event metadata
    const prevStatus = leadDoc.status ?? null
    const prevAssignedId = leadDoc.assignedToId ?? null
    const prevAssignedName = leadDoc.assignedTo?.name ?? null

    // collect server-generated events
    const serverEvents: any[] = []

    // Track whether contact fields changed (for contact_edited)
    const contactFields = ['name','email','phone','country','originCity','age']
    const changedKeys: string[] = []
    for (const k of contactFields) {
      if (Object.prototype.hasOwnProperty.call(body, k)) {
        const before = leadDoc[k] ?? ''
        const after = body[k] ?? ''
        if (String(before) !== String(after)) changedKeys.push(k)
        leadDoc[k] = body[k]
      }
    }

    // Apply simple allowed fields (non-event)
    const allowedSimple = [
      'countryCode','activities','days','who','date','travellers','ages','genders',
      'budget','source','leadSourceDetail','utm','documents','attachments','tasks'
    ]
    for (const k of allowedSimple) {
      if (Object.prototype.hasOwnProperty.call(body, k)) {
        leadDoc[k] = body[k]
      }
    }

    // handle assignedToId specially
    if (Object.prototype.hasOwnProperty.call(body, 'assignedToId')) {
      const newAssignedId = body.assignedToId || null
      leadDoc.assignedToId = newAssignedId

      // lookup user for friendly assignedTo
      let newUser: any = null
      if (newAssignedId) {
        try {
          newUser = await User.findById(newAssignedId).select('_id name email role').lean().catch(() => null)
        } catch {
          newUser = null
        }
      }

      if (newUser) {
        leadDoc.assignedTo = { id: String(newUser._id), name: newUser.name, email: newUser.email, role: newUser.role }
      } else {
        leadDoc.assignedTo = null
      }

      // create assign event if changed
      if ((prevAssignedId ?? null) !== (newAssignedId ?? null)) {
        const byName = body.updatedBy ?? 'system'
        serverEvents.push({
          type: 'assign',
          at: new Date().toISOString(),
          by: { name: byName },
          metadata: { from: prevAssignedName, to: newUser?.name ?? null, short: `Assigned to ${newUser?.name ?? 'Unassigned'}` }
        })
      }
    }

    // handle nextFollowUpAt
    if (Object.prototype.hasOwnProperty.call(body, 'nextFollowUpAt')) {
      const beforeFollow = leadDoc.nextFollowUpAt ? String(leadDoc.nextFollowUpAt) : null
      const afterFollow = body.nextFollowUpAt ? String(body.nextFollowUpAt) : null
      leadDoc.nextFollowUpAt = body.nextFollowUpAt ?? null
      if (beforeFollow !== afterFollow) {
        const byName = body.updatedBy ?? 'system'
        serverEvents.push({
          type: body.nextFollowUpAt ? 'followup_set' : 'followup_cleared',
          at: new Date().toISOString(),
          by: { name: byName },
          metadata: { short: body.nextFollowUpAt ? `Follow-up set ${new Date(body.nextFollowUpAt).toLocaleString()}` : 'Follow-up cleared' }
        })
      }
    }

    // handle status change
    if (Object.prototype.hasOwnProperty.call(body, 'status')) {
      const newStatus = body.status
      // apply new status to doc
      leadDoc.status = newStatus

      if (String(prevStatus) !== String(newStatus)) {
        const byName = body.updatedBy ?? 'system'
        const reasonText = body.reason ?? body.note ?? ''
        serverEvents.push({
          type: 'status_change',
          at: new Date().toISOString(),
          by: { name: byName },
          note: reasonText || '',
          reason: reasonText || '',
          metadata: { from: prevStatus, to: newStatus, short: `Status ${prevStatus ?? 'unknown'} → ${newStatus}` }
        })
      }
    }

    // if contact fields changed, add contact_edited event
    if (changedKeys.length) {
      const byName = body.updatedBy ?? 'system'
      serverEvents.push({
        type: 'contact_edited',
        at: new Date().toISOString(),
        by: { name: byName },
        metadata: { short: `Contact updated: ${changedKeys.join(', ')}`, changes: changedKeys.reduce((acc: any, key: string) => {
          acc[key] = { from: leadDoc[key] ?? null, to: body[key] ?? null }; return acc
        }, {}) }
      })
    }

    // Normalize incoming events if provided
    let incomingEvents: any[] | null = null
    if (Array.isArray(body.events)) {
      incomingEvents = (body.events || []).map((e: any) => {
        const copy: any = { ...e }
        if (copy.at) copy.at = new Date(copy.at).toISOString()
        if (copy.updatedAt) copy.updatedAt = new Date(copy.updatedAt).toISOString()
        return copy
      })
    }

    // Merge incoming events with serverEvents (dedupe by type+at)
    if (incomingEvents) {
      const existingKeys = new Set(incomingEvents.map((ev: any) => `${ev.type}::${ev.at || ''}`))
      const extras = serverEvents.filter(sv => !existingKeys.has(`${sv.type}::${sv.at || ''}`))
      leadDoc.events = incomingEvents.concat(extras)
    } else {
      leadDoc.events = leadDoc.events || []
      // append serverEvents if they don't look like duplicates (simple heuristic)
      for (const sv of serverEvents) {
        const isDup = (leadDoc.events || []).some((e: any) => e.type === sv.type && e.by?.name === sv.by?.name && Math.abs(new Date(e.at).getTime() - new Date(sv.at).getTime()) < 10000)
        if (!isDup) leadDoc.events.push(sv)
      }
    }

    // Other misc fields
    if (body.updatedBy) leadDoc.updatedBy = body.updatedBy
    leadDoc.updatedAt = new Date()

    // Save and return updated doc
    await leadDoc.save()

    // populate assignedTo for response (fresh lookup)
    let assignedTo: any = null
    if (leadDoc.assignedToId) {
      try {
        assignedTo = await User.findById(leadDoc.assignedToId).select('_id name email role').lean().catch(() => null)
      } catch {
        assignedTo = null
      }
    }

    const out = (typeof leadDoc.toObject === 'function') ? leadDoc.toObject() : JSON.parse(JSON.stringify(leadDoc))
    out.assignedTo = assignedTo || null

    return out
  } catch (err: any) {
    console.error('PATCH /api/leads/:id error', err)
    // convert to h3 error so Nuxt dev server returns sensible message
    throw createError({ statusCode: err?.statusCode || 500, statusMessage: err?.message || 'Server error' })
  }
})
