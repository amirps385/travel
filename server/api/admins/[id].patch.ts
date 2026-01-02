// server/api/admins/[id].patch.ts
import User from '../../models/User'
import { connectDB } from '../../utils/mongoose'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  await connectDB()

  // require id param
  const params = event.context.params || {}
  const id = params.id
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Missing admin id' })
  }

  // OPTIONAL: Check auth but don't restrict to superadmin
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

  // Allow any admin to edit (not just superadmin)
  // Remove or adjust this check:
  const actorRole = actor?.role as string | undefined
  if (!actorRole || !['superadmin', 'admin'].includes(actorRole)) {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden: requires admin role' })
  }

  const body = (await readBody(event)) as any || {}

  try {
    const userDoc = await User.findById(id)
    if (!userDoc) {
      throw createError({ statusCode: 404, statusMessage: 'User not found' })
    }

    // Prevent editing self's role or status (optional safety)
    if (actor && String(userDoc._id) === actor.id) {
      // Don't allow self-modification of certain fields
      if (body.role !== undefined) {
        throw createError({ statusCode: 400, statusMessage: 'Cannot change your own role' })
      }
      if (body.isActive !== undefined && body.isActive === false) {
        throw createError({ statusCode: 400, statusMessage: 'Cannot deactivate your own account' })
      }
    }

    // Allowed updates
    if (body.role !== undefined) userDoc.role = String(body.role || '')
    if (body.isActive !== undefined) userDoc.isActive = Boolean(body.isActive)
    if (body.name !== undefined) userDoc.name = String(body.name)
    if (body.email !== undefined) userDoc.email = String(body.email)

    userDoc.updatedAt = new Date()
    await userDoc.save()

    // Return complete user object
    return {
      id: String(userDoc._id),
      _id: String(userDoc._id),
      name: userDoc.name,
      email: userDoc.email,
      role: userDoc.role,
      isActive: userDoc.isActive === undefined ? true : Boolean(userDoc.isActive),
      avatar: userDoc.avatar || null,
      updatedAt: userDoc.updatedAt
    }
  } catch (err: any) {
    console.error('admins/[id].patch error:', err)
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors || {}).map((e: any) => e.message).join(', ')
      throw createError({ statusCode: 400, statusMessage: `Validation failed: ${messages}` })
    }
    throw createError({ statusCode: 500, statusMessage: 'Failed to update admin' })
  }
})