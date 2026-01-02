// server/api/admins/[id].delete.ts
import User from '../../models/User'
import { connectDB } from '../../utils/mongoose'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  await connectDB()

  const params = event.context.params || {}
  const id = params.id
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Missing admin id' })
  }

  // Auth check
  const token = getCookie(event, 'auth_token') || ''
  let actor: any = null
  if (token) {
    try {
      const secret = process.env.JWT_SECRET || 'dev-secret'
      const payload = jwt.verify(token, secret) as any
      actor = payload || null
    } catch (err) {
      actor = null
    }
  }

  const actorRole = actor?.role as string | undefined
  if (!actorRole || !['superadmin'].includes(actorRole)) {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden: requires superadmin role' })
  }

  try {
    const userDoc = await User.findById(id)
    if (!userDoc) {
      throw createError({ statusCode: 404, statusMessage: 'User not found' })
    }

    // Prevent self-deletion
    if (actor && String(userDoc._id) === actor.id) {
      throw createError({ statusCode: 400, statusMessage: 'Cannot delete your own account' })
    }

    // OPTION 1: HARD DELETE (removes from database)
    await User.findByIdAndDelete(id)
    
    // OPTION 2: Or keep soft delete but remove from active queries
    // await User.findByIdAndUpdate(id, {
    //   $set: { 
    //     isActive: false,
    //     email: `deleted_${Date.now()}_${userDoc.email}`,
    //     name: 'Deleted User'
    //   }
    // })

    return { 
      success: true, 
      message: 'User permanently deleted',
      userId: id
    }
  } catch (err: any) {
    console.error('admins/[id].delete error:', err)
    throw createError({ 
      statusCode: 500, 
      statusMessage: 'Failed to delete user' 
    })
  }
})