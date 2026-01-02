// server/api/auth/me.get.ts
import User from '../../models/User'
import { connectDB } from '../../utils/mongoose'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  await connectDB()

  const token = getCookie(event, 'auth_token')
  if (!token) return { user: null }

  try {
    const secret = process.env.JWT_SECRET || 'dev-secret'
    const payload = jwt.verify(token, secret) as any
    if (!payload || !payload.id) return { user: null }

    const user = await User.findById(payload.id)
      .select('_id name email role isActive avatar notifications')
      .lean<any>()
      .catch(() => null)

    if (!user) return { user: null }
    if (user.isActive === false) return { user: null }

    // notifications summary
    const notifications: any[] = Array.isArray(user.notifications) ? user.notifications : []
    const unreadCount = notifications.reduce((s: number, n: any) => s + (n.read ? 0 : 1), 0)

    return {
      user: {
        id: String(user._id),
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar || null,
        notifications: notifications.slice(-5).map((n: any) => ({ id: n._id, message: n.message, read: n.read, createdAt: n.createdAt })),
        notificationCount: notifications.length,
        unreadNotificationCount: unreadCount
      }
    }
  } catch (err) {
    return { user: null }
  }
})
