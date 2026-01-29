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
      .select('_id name email role isActive avatar notifications notificationSettings')
      .lean<any>()
      .catch(() => null)

    if (!user) return { user: null }
    if (user.isActive === false) return { user: null }

    // Process notifications - sort by createdAt desc, limit to 5 for dropdown
    const notifications: any[] = Array.isArray(user.notifications) 
      ? user.notifications
          .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 5)
      : []

    const unreadCount = notifications.reduce((s: number, n: any) => s + (n.read ? 0 : 1), 0)

    return {
      user: {
        id: String(user._id),
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar || null,
        notifications: notifications.map((n: any) => ({
          id: n._id.toString(),
          type: n.type,
          title: n.title,
          message: n.message,
          data: n.data,
          link: n.link,
          icon: n.icon,
          read: n.read,
          createdAt: n.createdAt
        })),
        notificationCount: user.notifications.length,
        unreadNotificationCount: user.notifications.filter((n: any) => !n.read).length,
        notificationSettings: user.notificationSettings || {
          email: true,
          push: true,
          leadAssignments: true,
          followUpReminders: true,
          systemAlerts: true
        }
      }
    }
  } catch (err) {
    console.error('Auth me error:', err)
    return { user: null }
  }
})