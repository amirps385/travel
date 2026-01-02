// server/api/auth/signup.post.ts
import type { H3Event } from 'h3'
import User from '../../models/User'
import { connectDB } from '../../utils/mongoose'
import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event: H3Event) => {
  try {
    await connectDB()

    const body = (await readBody(event)) as Record<string, unknown> | undefined
    const name = body && body.name ? String(body.name).trim() : ''
    const email = body && body.email ? String(body.email).trim().toLowerCase() : ''
    const password = body && body.password ? String(body.password) : ''
    const avatar = body && body.avatar ? String(body.avatar) : undefined

    if (!name || !email || !password) {
      console.warn('[signup] missing fields', { name, email })
      throw createError({ statusCode: 400, statusMessage: 'Missing name/email/password' })
    }

    // check existing
    const existing = await User.findOne({ email }).lean()
    if (existing) {
      console.warn('[signup] duplicate email', email)
      throw createError({ statusCode: 409, statusMessage: 'Email already in use' })
    }

    // create user
    const hash = await bcrypt.hash(password, 10)
    const created = await User.create({
      name,
      email,
      passwordHash: hash,
      role: 'admin',
      isActive: true,
      avatar: avatar || undefined
    })

    if (!created || !created._id) {
      console.error('[signup] creation returned no _id', created)
      throw createError({ statusCode: 500, statusMessage: 'Failed to create user' })
    }

    // Return sanitized user object (no passwordHash, no raw document)
    return {
      success: true,
      user: {
        id: String(created._id),
        name: created.name,
        email: created.email,
        role: created.role,
        avatar: created.avatar || null
      }
    }
  } catch (rawErr: unknown) {
    const errMsg = (() => {
      if (!rawErr) return 'Unknown error'
      if (typeof rawErr === 'string') return rawErr
      if (typeof rawErr === 'object') {
        try {
          const anyErr = rawErr as any
          if (anyErr.stack) return String(anyErr.stack)
          if (anyErr.message) return String(anyErr.message)
          return JSON.stringify(anyErr)
        } catch {
          return String(rawErr)
        }
      }
      return String(rawErr)
    })()

    console.error('[signup] error:', errMsg)

    const anyErr = rawErr as any
    if (anyErr && typeof anyErr === 'object' && ('statusCode' in anyErr || 'statusMessage' in anyErr)) {
      throw rawErr
    }

    throw createError({ statusCode: 500, statusMessage: 'Server error while signing up' })
  }
})
