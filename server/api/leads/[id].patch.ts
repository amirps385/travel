// server/api/leads/[id].patch.ts
import Lead from '../../models/Lead'
import User from '../../models/User'
import { connectDB } from '../../utils/mongoose'
import jwt from 'jsonwebtoken'

interface TaskData {
  id?: string;
  title?: string;
  due?: string | Date;
  note?: string;
  status?: string;
  createdAt?: string | Date;
  createdBy?: string;
  updatedBy?: string;
  updatedAt?: string | Date;
}

interface EventData {
  type: string;
  at?: string | Date;
  by?: any;
  note?: string;
  status?: string;
  reason?: string;
  metadata?: any;
  updatedBy?: string;
  updatedAt?: string | Date;
}

export default defineEventHandler(async (event) => {
  await connectDB()

  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Lead ID required' })
  }

  // Get current user from JWT
  const token = getCookie(event, 'auth_token')
  let currentUser: any = null
  if (token) {
    try {
      const secret = process.env.JWT_SECRET || 'dev-secret'
      const payload = jwt.verify(token, secret) as any
      currentUser = payload
    } catch (err) {
      throw createError({ statusCode: 401, statusMessage: 'Invalid or expired token' })
    }
  }

  if (!currentUser) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const body = await readBody(event)

  // First, check if user can access this lead
  const existingLead = await Lead.findById(id).lean() as any
  if (!existingLead) {
    throw createError({ statusCode: 404, statusMessage: 'Lead not found' })
  }

  // Permission check: Non-admin users can only modify leads assigned to them
  if (!['admin', 'superadmin'].includes(currentUser.role)) {
    const leadAssignedToId = existingLead.assignedToId ? String(existingLead.assignedToId) : null
    const currentUserId = String(currentUser._id || currentUser.id)

    if (leadAssignedToId !== currentUserId) {
      throw createError({
        statusCode: 403,
        statusMessage: 'You can only modify leads assigned to you'
      })
    }
  }

  // Check if user is trying to change assignment
  if (body.assignedToId !== undefined || body.assignedTo !== undefined) {
    // Only allow superadmin or admin to change assignment
    if (!['superadmin', 'admin'].includes(currentUser.role)) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Only admins can assign leads to other users'
      })
    }

    if (body.assignedToId) {
      const assignedUser = await User.findById(body.assignedToId)
      if (!assignedUser) {
        throw createError({ statusCode: 400, statusMessage: 'Assigned user not found' })
      }

      if (!['lead-manager', 'admin', 'superadmin'].includes(assignedUser.role)) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Can only assign leads to lead managers or admins'
        })
      }

      body.assignmentBy = currentUser.name || currentUser.email
      body.assignmentAt = new Date()
    } else {
      body.assignmentBy = currentUser.name || currentUser.email
      body.assignmentAt = new Date()
      body.unassigned = true
    }
  }

  // Check if user is trying to change sensitive fields without permission
  if (body.role !== undefined && !['superadmin', 'admin'].includes(currentUser.role)) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Only admins can change lead roles'
    })
  }

  // Build updateData and attach metadata
  const updateData: any = {
    ...body,
    updatedAt: new Date(),
    updatedBy: currentUser.name || currentUser.email
  }

  // --- Normalize adults/children/ages/genders when provided (or partially provided) ---
  if (
    body.adults !== undefined ||
    body.children !== undefined ||
    body.adultAges !== undefined ||
    body.childAges !== undefined ||
    body.ages !== undefined ||
    body.genders !== undefined
  ) {
    // Normalize numbers
    const adults = body.adults !== undefined ? Number(body.adults || 0) : (existingLead.adults || 0)
    const children = body.children !== undefined ? Number(body.children || 0) : (existingLead.children || 0)
    const travellers = adults + children

    // Normalize arrays (safe conversions)
    const adultAges: number[] = Array.isArray(body.adultAges)
      ? body.adultAges.map((a: any) => Number(a))
      : (existingLead.adultAges || []).map((a: any) => Number(a))

    const childAges: number[] = Array.isArray(body.childAges)
      ? body.childAges.map((a: any) => Number(a))
      : (existingLead.childAges || []).map((a: any) => Number(a))

    // If body.ages supplied explicitly, use that (converted); otherwise combine adultAges + childAges
    let agesCombined: number[] = []
    if (Array.isArray(body.ages) && body.ages.length > 0) {
      agesCombined = body.ages.map((a: any) => Number(a))
    } else {
      agesCombined = [...adultAges, ...childAges]
    }

    // Genders: prefer provided genders, otherwise fallback to existing or fill with 'unspecified'
    let genders: string[] = Array.isArray(body.genders)
      ? body.genders.map((g: any) => String(g))
      : (existingLead.genders || []).map((g: any) => String(g))

    if (agesCombined.length > genders.length) {
      const diff = agesCombined.length - genders.length
      genders = genders.concat(Array(diff).fill('unspecified'))
    }

    updateData.adults = adults
    updateData.children = children
    updateData.travellers = travellers
    updateData.adultAges = adultAges
    updateData.childAges = childAges
    updateData.ages = agesCombined
    updateData.genders = genders
  }

  // Handle tasks specifically - ensure they're properly saved
  if (body.tasks !== undefined) {
    if (Array.isArray(body.tasks)) {
      updateData.tasks = body.tasks.map((task: TaskData) => ({
        id: task.id || `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        title: task.title || 'Untitled Task',
        due: task.due ? new Date(task.due) : null,
        note: task.note || '',
        status: task.status || 'open',
        createdAt: task.createdAt ? new Date(task.createdAt) : new Date(),
        createdBy: task.createdBy || currentUser.name || currentUser.email,
        updatedBy: task.updatedBy || currentUser.name || currentUser.email,
        updatedAt: task.updatedAt ? new Date(task.updatedAt) : new Date()
      }))
    }
  }

  // Handle events specifically - ensure they're properly saved
  if (body.events !== undefined) {
    if (Array.isArray(body.events)) {
      updateData.events = body.events.map((ev: EventData) => ({
        type: ev.type || 'note',
        at: ev.at ? new Date(ev.at) : new Date(),
        by: ev.by || { name: currentUser.name || currentUser.email },
        note: ev.note || '',
        status: ev.status || 'active',
        reason: ev.reason || '',
        metadata: ev.metadata || {},
        updatedBy: ev.updatedBy || currentUser.name || currentUser.email,
        updatedAt: ev.updatedAt ? new Date(ev.updatedAt) : new Date()
      }))

      // --- FOLLOW-UP HELPERS ---
      const incomingFollowupSets = (body.events as EventData[]).filter(e => e.type === 'followup_set' && e.metadata && e.metadata.followUpDate)
      if (incomingFollowupSets.length > 0) {
        const lastSet = incomingFollowupSets[incomingFollowupSets.length - 1]
        try {
          const followDate = lastSet.metadata.followUpDate
          if (followDate) {
            updateData.nextFollowUpAt = new Date(followDate)
          }
        } catch (err) {
          // ignore parse errors
        }
      }

      const incomingFollowupDeletes = (body.events as EventData[]).filter(e => e.type === 'followup_deleted' && e.metadata)
      if (incomingFollowupDeletes.length > 0) {
        const currentNextIso = existingLead.nextFollowUpAt ? new Date(existingLead.nextFollowUpAt).toISOString() : null
        for (const del of incomingFollowupDeletes) {
          const metaId = del.metadata?.followupId
          const metaOriginalDate = del.metadata?.originalDate || del.metadata?.followUpDate
          if (metaOriginalDate) {
            try {
              const md = new Date(metaOriginalDate).toISOString()
              if (currentNextIso && md === currentNextIso) {
                updateData.nextFollowUpAt = null
                break
              }
            } catch {}
          }
          if (metaId) {
            try {
              const matching = (existingLead.events || []).find((e: any) => {
                try {
                  return e.type === 'followup_set' && (new Date(e.at)).toISOString() === String(metaId)
                } catch { return false }
              })
              if (matching) {
                const followMetaDate = matching.metadata?.followUpDate
                if (followMetaDate) {
                  const fm = new Date(followMetaDate).toISOString()
                  if (currentNextIso && fm === currentNextIso) {
                    updateData.nextFollowUpAt = null
                    break
                  }
                }
              }
            } catch {}
          }
        }
      }

      const incomingFollowupStatusChanges = (body.events as EventData[]).filter(e => e.type === 'followup_status_changed' && e.metadata)
      if (incomingFollowupStatusChanges.length > 0) {
        const currentNextIso = existingLead.nextFollowUpAt ? new Date(existingLead.nextFollowUpAt).toISOString() : null
        for (const fs of incomingFollowupStatusChanges) {
          const followupId = fs.metadata?.followupId
          const newStatus = fs.metadata?.changes?.status?.to || fs.status || ''
          const shouldClear = ['completed', 'cancelled', 'missed'].includes(String(newStatus).toLowerCase())
          if (!shouldClear) continue

          if (followupId && currentNextIso) {
            try {
              if (String(followupId) === currentNextIso) {
                updateData.nextFollowUpAt = null
                break
              }
              const existingFollow = (existingLead.events || []).find((e: any) => {
                try {
                  return e.type === 'followup_set' && new Date(e.at).toISOString() === String(followupId)
                } catch { return false }
              })
              if (existingFollow && existingFollow.metadata?.followUpDate) {
                if (new Date(existingFollow.metadata.followUpDate).toISOString() === currentNextIso) {
                  updateData.nextFollowUpAt = null
                  break
                }
              }
            } catch {}
          }
        }
      }
    }
  }

  // Handle preferredTime specifically
  if (body.preferredTime !== undefined) {
    updateData.preferredTime = body.preferredTime ? new Date(body.preferredTime) : null
  }

  // NEW: Handle closed date and closed lost details specifically
  if (body.closedDate !== undefined) {
    updateData.closedDate = body.closedDate ? new Date(body.closedDate) : null
  }

  if (body.closedReason !== undefined) {
    updateData.closedReason = body.closedReason || null
  }

  if (body.closedLostDetails !== undefined) {
    updateData.closedLostDetails = body.closedLostDetails || null
  }

  // Clear closed date and reason when status changes away from closed-won/closed-lost
  if (body.status !== undefined) {
    const isClosedStatus = body.status === 'closed-won' || body.status === 'closed-lost'
    if (!isClosedStatus) {
      updateData.closedDate = null
      updateData.closedReason = null
      updateData.closedLostDetails = null
    }
  }

  // Optional: Add status transition validation
  if (body.status !== undefined) {
    const validStatuses = ['new', 'qualified', 'unqualified', 'working', 'closed-won', 'closed-lost']
    
    if (!validStatuses.includes(body.status)) {
      throw createError({
        statusCode: 400,
        statusMessage: `Invalid status: ${body.status}. Valid statuses are: ${validStatuses.join(', ')}`
      })
    }
  }

  // Update lead in DB
  const lead = await Lead.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true }
  ).lean() as any

  if (!lead) {
    throw createError({ statusCode: 404, statusMessage: 'Lead not found' })
  }

  return {
    ...lead,
    _id: String(lead._id),
    id: String(lead._id),
    closedDate: lead.closedDate ? new Date(lead.closedDate).toISOString() : null
  }
})
