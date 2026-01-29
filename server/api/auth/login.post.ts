// server/api/auth/login.post.ts
import User from '../../models/User'
import { connectDB } from '../../utils/mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  await connectDB()
  const body = await readBody(event) as any
  const { email, password } = body || {}

  const user = await User.findOne({ email }).lean<any>().catch(() => null)
  if (!user || !user.passwordHash) throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })

  const ok = await bcrypt.compare(password, user.passwordHash)
  if (!ok) throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })

  if (user.isActive === false) throw createError({ statusCode: 403, statusMessage: 'Account disabled' })

  const payload = { 
    id: String(user._id), 
    role: user.role, 
    email: user.email, 
    name: user.name 
  }
  const token = jwt.sign(payload, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '7d' })

  setCookie(event, 'auth_token', token, { 
    httpOnly: true, 
    sameSite: 'lax', 
    path: '/', 
    maxAge: 60*60*24*7,
    // secure: process.env.NODE_ENV === 'production'
  })
  
  return { 
    user: payload,
    hasAvatar: !!user.avatar
  }
})