// server/api/leads/[id].get.ts
import Lead from '../../models/Lead'
import User from '../../models/User'
import { connectDB } from '../../utils/mongoose'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  await connectDB()

  const params = event.context.params || {}
  const id = params.id

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Missing lead id' })
  }

  try {
    // Get current user from JWT
    const token = getCookie(event, 'auth_token')
    let currentUser = null
    
    if (token) {
      try {
        const secret = process.env.JWT_SECRET || 'dev-secret'
        const payload = jwt.verify(token, secret) as any
        currentUser = payload
      } catch (err) {
        console.error('Token verification failed:', err)
        throw createError({ statusCode: 401, statusMessage: 'Invalid or expired token' })
      }
    }
    
    if (!currentUser) {
      throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
    }
    
    // Build query based on user role
    let query: any = { _id: id }
    
    // If user is not admin/superadmin, check if they have access
    if (!['admin', 'superadmin'].includes(currentUser.role)) {
      // For lead-manager and other roles, only allow access if lead is assigned to them or unassigned
      query.$or = [
        { assignedToId: currentUser._id || currentUser.id },
        { assignedToId: null },
        { assignedToId: { $exists: false } }
      ]
    }
    
    const lead = (await Lead.findOne(query)
      .populate('assignedToId', 'name email role')
      .lean()) as any

    if (!lead) {
      throw createError({ 
        statusCode: 404, 
        statusMessage: 'Lead not found or you do not have permission to access it' 
      })
    }

    let assignedTo = null
    if (lead.assignedToId) {
      // safe attempt to resolve assigned user (may return null)
      assignedTo = await User.findById(lead.assignedToId)
        .select('_id name email role')
        .lean()
        .catch(() => null)
    }

    return {
      ...lead,
      _id: String(lead._id),
      id: String(lead._id),
      assignedTo: assignedTo || null
    }
  } catch (err: any) {
    console.error('Get lead error:', err)
    if (err.statusCode) throw err
    throw createError({ statusCode: 500, statusMessage: 'Failed to fetch lead' })
  }
})