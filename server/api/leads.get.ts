// server/api/leads.get.ts
import Lead from '../models/Lead'
import { connectDB } from '../utils/mongoose'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  await connectDB()
  
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
      // Don't throw here, just leave currentUser as null
    }
  }
  
  // Build query based on user role
  let query = {}

  if (currentUser) {
    // Admins and superadmins see everything
    if (['admin', 'superadmin'].includes(currentUser.role)) {
      query = {}
    } else {
      // Non-admin roles (lead-manager, content-manager, itinerary-planner, etc.)
      // should only see leads explicitly assigned to them.
      query = {
        assignedToId: currentUser._id || currentUser.id
      }
    }
  }

  // If no user is logged in (shouldn't happen for admin routes, but just in case)
  if (!currentUser) {
    // For public access or when no auth, return empty or handle differently
    // For now, return empty array for safety
    return []
  }
  
  try {
    const leads = await Lead.find(query)
      .populate('assignedToId', 'name email role')
      .sort({ createdAt: -1 })
      .lean()
    
    // Transform the data for frontend
    const transformedLeads = leads.map(lead => {
      const leadObj = lead as any
      return {
        ...leadObj,
        _id: String(leadObj._id),
        id: String(leadObj._id),
        // Normalize assignedTo field
        assignedTo: leadObj.assignedToId ? {
          id: String(leadObj.assignedToId._id),
          name: leadObj.assignedToId.name,
          email: leadObj.assignedToId.email,
          role: leadObj.assignedToId.role
        } : null,
        assignedToId: leadObj.assignedToId ? String(leadObj.assignedToId._id) : null,
        // Ensure closedDate is properly formatted if it exists
        closedDate: leadObj.closedDate ? new Date(leadObj.closedDate).toISOString() : null
      }
    })
    
    return transformedLeads
  } catch (err) {
    console.error('Error fetching leads:', err)
    throw createError({ 
      statusCode: 500, 
      statusMessage: 'Failed to fetch leads' 
    })
  }
})