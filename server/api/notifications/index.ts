// server/api/notifications/index.ts
import User from '../../models/User'
import { connectDB } from '../../utils/mongoose'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  await connectDB()
  
  // Get user from token
  const token = getCookie(event, 'auth_token')
  if (!token) throw createError({ statusCode: 401, message: 'Unauthorized' })
  
  try {
    const secret = process.env.JWT_SECRET || 'dev-secret'
    const payload = jwt.verify(token, secret) as any
    if (!payload || !payload.id) throw createError({ statusCode: 401, message: 'Unauthorized' })
    
    const user = await User.findById(payload.id)
    if (!user) throw createError({ statusCode: 404, message: 'User not found' })
    
    const method = event.node.req.method
    
    switch (method) {
      case 'GET':
        return handleGet(event, user)
      case 'POST':
        return handlePost(event, user)
      case 'DELETE':
        return handleDelete(event, user)
      default:
        throw createError({ statusCode: 405, message: 'Method not allowed' })
    }
  } catch (err: any) {
    console.error('Notifications API error:', err)
    throw createError({ 
      statusCode: err.statusCode || 500, 
      message: err.message || 'Server error' 
    })
  }
})

// GET: Fetch notifications with pagination
async function handleGet(event: any, user: any) {
  const query = getQuery(event)
  const limit = query.limit ? Math.min(parseInt(query.limit as string), 50) : 20
  const offset = query.offset ? parseInt(query.offset as string) : 0
  
  // Get sorted notifications
  const sorted = [...user.notifications].sort((a: any, b: any) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
  
  const paginated = sorted.slice(offset, offset + limit)
  
  return {
    notifications: paginated.map((n: any) => ({
      id: n._id?.toString() || Math.random().toString(),
      type: n.type,
      title: n.title,
      message: n.message,
      data: n.data,
      link: n.link,
      icon: n.icon,
      read: n.read,
      createdAt: n.createdAt
    })),
    total: user.notifications.length,
    unread: user.notifications.filter((n: any) => !n.read).length
  }
}

// POST: Mark as read, update settings, OR send notification to another user
async function handlePost(event: any, user: any) {
  const body = await readBody(event)
  
  // 1. Update notification settings
  if (body.settings) {
    await User.updateOne(
      { _id: user._id },
      { $set: { notificationSettings: { ...user.notificationSettings, ...body.settings } } }
    )
    return { success: true, message: 'Settings updated' }
  }
  
  // 2. Mark all as read
  if (body.markAll) {
    user.notifications.forEach((n: any) => {
      n.read = true
    })
    await user.save()
    return { success: true, message: 'All notifications marked as read' }
  }
  
  // 3. Mark single notification as read
  if (body.notificationId) {
    const notification = user.notifications.find((n: any) => 
      n._id?.toString() === body.notificationId || n.id === body.notificationId
    )
    if (notification) {
      notification.read = true
      await user.save()
      return { success: true, message: 'Notification marked as read' }
    }
    return { success: false, message: 'Notification not found' }
  }
  
  // 4. SEND NOTIFICATION TO ANOTHER USER (This is what we need!)
  if (body.userId && body.userId !== user._id.toString()) {
    // Find the target user
    const targetUser = await User.findById(body.userId)
    if (!targetUser) {
      throw createError({ statusCode: 404, message: 'Target user not found' })
    }
    
    // Use the addNotification method from User model if it exists
    let notification
    if (targetUser.addNotification) {
      // Use the model method
      notification = await targetUser.addNotification({
        type: body.type || 'system_alert',
        title: body.title || 'Notification',
        message: body.message || 'You have a new notification',
        data: body.data || {},
        link: body.link || '/admin/dashboard',
        icon: body.icon
      })
    } else {
      // Create notification manually
      const notificationData = {
        type: body.type || 'system_alert',
        title: body.title || 'Notification',
        message: body.message || 'You have a new notification',
        data: body.data || {},
        link: body.link || '/admin/dashboard',
        icon: body.icon || getNotificationIcon(body.type),
        read: false,
        createdAt: new Date()
      }
      
      // Add to target user's notifications array
      targetUser.notifications.unshift(notificationData)
      
      // Keep only last 100 notifications
      if (targetUser.notifications.length > 100) {
        targetUser.notifications = targetUser.notifications.slice(0, 100)
      }
      
      await targetUser.save()
      notification = notificationData
    }
    
    return {
      success: true,
      message: 'Notification sent successfully',
      notification: {
        id: notification._id?.toString() || Math.random().toString(),
        type: notification.type,
        title: notification.title,
        message: notification.message,
        data: notification.data,
        link: notification.link,
        icon: notification.icon,
        read: notification.read,
        createdAt: notification.createdAt
      },
      user: {
        id: targetUser._id.toString(),
        name: targetUser.name,
        email: targetUser.email
      }
    }
  }
  
  // 5. Send notification to self (current user)
  if (body.userId && body.userId === user._id.toString()) {
    let notification
    if (user.addNotification) {
      // Use the model method
      notification = await user.addNotification({
        type: body.type || 'system_alert',
        title: body.title || 'Notification',
        message: body.message || 'You have a new notification',
        data: body.data || {},
        link: body.link || '/admin/dashboard',
        icon: body.icon
      })
    } else {
      // Create notification manually
      const notificationData = {
        type: body.type || 'system_alert',
        title: body.title || 'Notification',
        message: body.message || 'You have a new notification',
        data: body.data || {},
        link: body.link || '/admin/dashboard',
        icon: body.icon || getNotificationIcon(body.type),
        read: false,
        createdAt: new Date()
      }
      
      user.notifications.unshift(notificationData)
      
      // Keep only last 100 notifications
      if (user.notifications.length > 100) {
        user.notifications = user.notifications.slice(0, 100)
      }
      
      await user.save()
      notification = notificationData
    }
    
    return {
      success: true,
      message: 'Notification sent to yourself',
      notification: {
        id: notification._id?.toString() || Math.random().toString(),
        type: notification.type,
        title: notification.title,
        message: notification.message,
        data: notification.data,
        link: notification.link,
        icon: notification.icon,
        read: notification.read,
        createdAt: notification.createdAt
      }
    }
  }
  
  throw createError({ statusCode: 400, message: 'Invalid request' })
}

// DELETE: Clear all notifications
async function handleDelete(event: any, user: any) {
  const body = await readBody(event)
  
  if (body.clearAll) {
    user.notifications = []
    await user.save()
    return { success: true, message: 'All notifications cleared' }
  }
  
  throw createError({ statusCode: 400, message: 'Invalid request' })
}

// Helper function to get notification icon
function getNotificationIcon(type: string): string {
  const icons: Record<string, string> = {
    'lead_assigned': '👥',
    'follow_up_reminder': '⏰',
    'new_message': '💬',
    'system_alert': '⚠️',
    'task_due': '📝',
    'itinerary_updated': '📄',
    'lead_status_changed': '🔄'
  }
  return icons[type] || '🔔'
}