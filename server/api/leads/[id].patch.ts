// server/api/leads/[id].patch.ts
import Lead from '../../models/Lead'
import User from '../../models/User'
import { connectDB } from '../../utils/mongoose'
import jwt from 'jsonwebtoken'

interface TaskData {
  id: string;
  title: string;
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

    // Check if lead is assigned to current user OR is unassigned
    if (leadAssignedToId && leadAssignedToId !== currentUserId) {
      throw createError({
        statusCode: 403,
        statusMessage: 'You can only modify leads assigned to you or unassigned leads'
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

    // If assigning to a user (not unassigning)
    if (body.assignedToId) {
      // Validate that the assigned user exists and has appropriate role
      const assignedUser = await User.findById(body.assignedToId)
      if (!assignedUser) {
        throw createError({ statusCode: 400, statusMessage: 'Assigned user not found' })
      }

      // Only allow assignment to lead managers, admins, or superadmins
      if (!['lead-manager', 'admin', 'superadmin'].includes(assignedUser.role)) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Can only assign leads to lead managers or admins'
        })
      }

      // Add assignment metadata
      body.assignmentBy = currentUser.name || currentUser.email
      body.assignmentAt = new Date()
    } else {
      // Unassigning (setting to null)
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

  // Add updated by information
  const updateData: any = {
    ...body,
    updatedAt: new Date(),
    updatedBy: currentUser.name || currentUser.email
  }

  // Handle tasks specifically - ensure they're properly saved
  if (body.tasks !== undefined) {
    // Validate tasks structure
    if (Array.isArray(body.tasks)) {
      // Ensure each task has required fields
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
    // Validate events structure
    if (Array.isArray(body.events)) {
      // Map incoming events into Date objects (preserve fields)
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

      // --- FOLLOW-UP SPECIFIC FIXES (only these) ---
      // 1) If there is an explicit followup_set in incoming events, use the most recent one to set nextFollowUpAt
      const incomingFollowupSets = (body.events as EventData[]).filter(e => e.type === 'followup_set' && e.metadata && e.metadata.followUpDate)
      if (incomingFollowupSets.length > 0) {
        // choose the last followup_set (frontend pushes the modifying followup_set last in many flows)
        const lastSet = incomingFollowupSets[incomingFollowupSets.length - 1]
        try {
          // convert metadata.followUpDate to Date/ISO
          const followDate = lastSet.metadata.followUpDate
          if (followDate) {
            updateData.nextFollowUpAt = new Date(followDate)
          }
        } catch (err) {
          // ignore parse errors, do not throw
        }
      }

      // 2) If incoming events contain followup_deleted, and that deleted follow-up matches the currently saved nextFollowUpAt,
      //    clear nextFollowUpAt (so UI won't show a follow-up that was deleted).
      const incomingFollowupDeletes = (body.events as EventData[]).filter(e => e.type === 'followup_deleted' && e.metadata)
      if (incomingFollowupDeletes.length > 0) {
        // current saved next followup iso (string) for comparison
        const currentNextIso = existingLead.nextFollowUpAt ? new Date(existingLead.nextFollowUpAt).toISOString() : null

        for (const del of incomingFollowupDeletes) {
          // metadata.followupId may be an 'at' timestamp from the frontend (they use followup.createdAt)
          const metaId = del.metadata?.followupId
          const metaOriginalDate = del.metadata?.originalDate || del.metadata?.followUpDate

          // If metadata contains an ISO date (originalDate or followUpDate) compare to currentNextIso
          if (metaOriginalDate) {
            try {
              const md = new Date(metaOriginalDate).toISOString()
              if (currentNextIso && md === currentNextIso) {
                updateData.nextFollowUpAt = null
                break
              }
            } catch {}
          }

          // If metadata.followupId looks like an ISO or timestamp, try to find matching followup in existing events
          if (metaId) {
            try {
              // Try match by event.at equality in existing lead
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

      // 3) If incoming events include followup_status_changed referring to the active followup and the status is one
      //    that should clear the scheduled follow-up (completed/cancelled), clear nextFollowUpAt.
      const incomingFollowupStatusChanges = (body.events as EventData[]).filter(e => e.type === 'followup_status_changed' && e.metadata)
      if (incomingFollowupStatusChanges.length > 0) {
        const currentNextIso = existingLead.nextFollowUpAt ? new Date(existingLead.nextFollowUpAt).toISOString() : null
        for (const fs of incomingFollowupStatusChanges) {
          const followupId = fs.metadata?.followupId
          const newStatus = fs.metadata?.changes?.status?.to || fs.status || ''
          const shouldClear = ['completed', 'cancelled', 'missed'].includes(String(newStatus).toLowerCase())
          if (!shouldClear) continue

          // If the followupId refers to an event at timestamp or ISO that matches currentNextIso, clear it.
          if (followupId && currentNextIso) {
            try {
              // If followupId is an ISO timestamp string (frontend used followup.createdAt), compare directly
              if (String(followupId) === currentNextIso) {
                updateData.nextFollowUpAt = null
                break
              }
              // Also try to find the followup in existingLead.events and compare its metadata.followUpDate
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
      // --- end follow-up specific fixes ---
    }
  }

  // Update lead
  const lead = await Lead.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true }
  ).lean() as any

  if (!lead) {
    throw createError({ statusCode: 404, statusMessage: 'Lead not found' })
  }

  // Return the updated lead
  return {
    ...lead,
    _id: String(lead._id),
    id: String(lead._id)
  }
})
