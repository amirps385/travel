// server/api/leads/[id].patch.ts
import Lead from '../../models/Lead'
import User from '../../models/User'
import { connectDB } from '../../utils/mongoose'

export default defineEventHandler(async (event) => {
  await connectDB()

  const params = event.context.params || {}
  const id = params.id
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Missing lead id' })
  }

  const body = (await readBody(event)) || {}

  try {
    const leadDoc = await Lead.findById(id)
    if (!leadDoc) {
      throw createError({ statusCode: 404, statusMessage: 'Lead not found' })
    }

    // --- KEEP PREVIOUS VALUES (we must capture before we mutate) ---
    const prevStatus = (leadDoc.status ?? '') as any

    // We'll collect server-created events here and merge with incoming events later
    const serverEvents: any[] = []

    // Track contact changes for contact_edited event
    const contactFields = ['name','email','phone','country','originCity','age']
    let contactChanged = false
    const changedKeys: string[] = []

    // Simple fields to copy directly (excluding events/tasks/assignedToId/nextFollowUpAt which we handle below)
    const simpleFields = [
      'name','email','phone','countryCode','country','originCity','activities','days','who','date',
      'travellers','ages','genders','budget',
      'status','priority','priorityUpdatedBy','priorityUpdatedAt',
      'source','leadSourceDetail','utm','documents','updatedBy'
    ]

    // Apply simple fields and detect contact changes
    for (const key of simpleFields) {
      if (Object.prototype.hasOwnProperty.call(body, key)) {
        // If it's a contact-related field, check if the value actually changed
        if (contactFields.includes(key)) {
          const before = String(leadDoc.get(key) ?? '')
          const after = String(body[key] ?? '')
          if (before !== after) {
            contactChanged = true
            changedKeys.push(key)
          }
        }
        leadDoc.set(key, body[key])
      }
    }

    // age singular (UI uses 'age')
    if (body.age !== undefined) {
      if (String(leadDoc.age ?? '') !== String(body.age)) {
        contactChanged = true
        changedKeys.push('age')
      }
      leadDoc.age = body.age
    }

    // --- assignedToId handling (create an assign event) ---
    if (body.assignedToId !== undefined) {
      const beforeAssigned = leadDoc.assignedToId ? String(leadDoc.assignedToId) : null
      const afterAssigned = body.assignedToId ? String(body.assignedToId) : null
      leadDoc.assignedToId = body.assignedToId || null

      if (beforeAssigned !== afterAssigned) {
        const by = body.updatedBy ? { name: body.updatedBy } : { name: 'system' }
        serverEvents.push({
          type: 'assign',
          at: new Date(),
          by,
          metadata: { short: `Assigned to ${ afterAssigned || 'Unassigned' }` }
        })
      }
    }

    // --- nextFollowUpAt handling (create followup_set / followup_cleared event) ---
    if (body.nextFollowUpAt !== undefined) {
      const iso = body.nextFollowUpAt ? new Date(body.nextFollowUpAt) : null
      const before = leadDoc.nextFollowUpAt ? String(leadDoc.nextFollowUpAt) : null
      const after = iso ? String(iso) : null
      leadDoc.nextFollowUpAt = iso

      if (before !== after) {
        const by = body.updatedBy ? { name: body.updatedBy } : { name: 'system' }
        serverEvents.push({
          type: iso ? 'followup_set' : 'followup_cleared',
          at: new Date(),
          by,
          metadata: { short: iso ? `Follow-up set ${(new Date(iso)).toLocaleString()}` : 'Follow-up cleared' }
        })
      }
    }

    // --- STATUS change handling: if status changed, create status_change event ---
    if (body.status !== undefined) {
      const afterStatus = (leadDoc.status ?? '') as any
      // Compare prevStatus (captured at top) with afterStatus (already set by simpleFields)
      if (String(prevStatus) !== String(afterStatus)) {
        const by = body.updatedBy ? { name: body.updatedBy } : { name: 'system' }
        const reasonText = (body.reason || body.note || '') // allow reason or note from client
        serverEvents.push({
          type: 'status_change',
          at: new Date(),
          by,
          note: reasonText || undefined,
          reason: reasonText || undefined,
          metadata: {
            short: `Status ${ prevStatus || 'unknown' } → ${ afterStatus || '' }`,
            from: prevStatus || null,
            to: afterStatus || null
          }
        })
      }
    }

    // --- EVENTS from client: normalize dates but do NOT lose serverEvents (we'll merge) ---
    let incomingEvents: any[] | null = null
    if (Array.isArray(body.events)) {
      incomingEvents = (body.events || []).map((e: any) => {
        const copy: any = { ...e }
        if (copy.at) copy.at = new Date(copy.at)
        if (copy.updatedAt) copy.updatedAt = new Date(copy.updatedAt)
        return copy
      })
    }

    // --- TASKS from client: normalize and replace (server doesn't create task events here) ---
    if (Array.isArray(body.tasks)) {
      const normalizedTasks = (body.tasks || []).map((t: any) => {
        const copy: any = { ...t }
        if (!copy.id) copy.id = 'task-' + Math.random().toString(36).slice(2, 9)
        if (copy.due) copy.due = new Date(copy.due)
        if (!copy.createdAt) copy.createdAt = new Date()
        return copy
      })
      leadDoc.tasks = normalizedTasks
    }

    // --- CONTACT_EDITED event if any contact field changed ---
    if (contactChanged) {
      const by = body.updatedBy ? { name: body.updatedBy } : { name: 'system' }
      serverEvents.push({
        type: 'contact_edited',
        at: new Date(),
        by,
        metadata: { short: `Contact updated: ${ changedKeys.join(', ') }` }
      })
    }

    // --- Merge incoming events (if any) and serverEvents, avoiding duplicates by simple heuristic ---
    if (incomingEvents) {
      // Avoid adding server events that are duplicates of any incoming events (same type + same 'at' time near-equal)
      const merged = incomingEvents.slice()
      for (const sv of serverEvents) {
        const dup = merged.some((inc: any) => {
          if (!inc || !inc.type || !inc.at) return false
          try {
            const incAt = new Date(inc.at).getTime()
            const svAt = new Date(sv.at).getTime()
            return inc.type === sv.type && Math.abs(incAt - svAt) < 2000 // 2s tolerance
          } catch {
            return false
          }
        })
        if (!dup) merged.push(sv)
      }
      // Replace leadDoc.events with merged array
      leadDoc.events = merged
    } else {
      // No incoming events provided — create events array if missing and append serverEvents
      leadDoc.events = leadDoc.events || []
      for (const sv of serverEvents) {
        // avoid duplicates in existing events by checking last ~10s
        const recentDup = (leadDoc.events || []).some((e: any) =>
          e.type === sv.type &&
          e.by?.name === sv.by?.name &&
          Math.abs(new Date(e.at).getTime() - new Date(sv.at).getTime()) < 10000
        )
        if (!recentDup) {
          leadDoc.events.push(sv)
        }
      }
    }

    // Mark updatedBy & updatedAt
    if (body.updatedBy) leadDoc.updatedBy = body.updatedBy
    leadDoc.updatedAt = new Date()

    // Save changes
    await leadDoc.save()

    // Resolve assignedTo user object for response
    let assignedTo = null
    if (leadDoc.assignedToId) {
      assignedTo = await User.findById(leadDoc.assignedToId)
        .select('_id name email role')
        .lean()
        .catch(() => null)
    }

    // Return object form (Mongoose will convert Dates to ISO strings in JSON)
    const out = (leadDoc.toObject && leadDoc.toObject()) ? leadDoc.toObject() : JSON.parse(JSON.stringify(leadDoc))
    out.assignedTo = assignedTo || null
    return out

  } catch (err: any) {
    console.error('Lead patch error:', err)
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e: any) => e.message).join(', ')
      throw createError({ statusCode: 400, statusMessage: `Validation failed: ${messages}` })
    }
    throw createError({ statusCode: 500, statusMessage: 'Failed to update lead' })
  }
})
