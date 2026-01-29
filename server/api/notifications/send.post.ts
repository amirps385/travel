// server/api/notifications/send.post.ts - FIXED VERSION
import User from '../../models/User'
import { connectDB } from '../../utils/mongoose'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  await connectDB()
  
  // Verify the sender is authenticated
  const token = getCookie(event, 'auth_token')
  if (!token) throw createError({ statusCode: 401, message: 'Unauthorized' })
  
  try {
    const secret = process.env.JWT_SECRET || 'dev-secret'
    const payload = jwt.verify(token, secret) as any
    if (!payload || !payload.id) throw createError({ statusCode: 401, message: 'Unauthorized' })
    
    const body = await readBody(event)
    const { userId, type, title, message, data, link, icon } = body
    
    if (!userId) {
      throw createError({ statusCode: 400, message: 'User ID is required' })
    }
    
    // Find the target user
    const targetUser = await User.findById(userId)
    if (!targetUser) {
      throw createError({ statusCode: 404, message: 'User not found' })
    }
    
    console.log('📤 Sending notification to user:', {
      userId,
      userName: targetUser.name,
      type,
      title,
      message
    })
    
    // Create notification object directly (simpler approach)
    const notification = {
      type: type || 'system_alert',
      title: title || 'Notification',
      message: message || 'You have a new notification',
      data: data || {},
      link: link || '/admin/dashboard',
      icon: icon || getNotificationIcon(type),
      read: false,
      createdAt: new Date()
    }
    
    // Add to notifications array
    targetUser.notifications.unshift(notification)
    
    // Keep only last 100 notifications
    if (targetUser.notifications.length > 100) {
      targetUser.notifications = targetUser.notifications.slice(0, 100)
    }
    
    // Save the user with the new notification
    await targetUser.save()
    
    console.log('✅ Notification saved to user:', targetUser.name)
    console.log('📊 Total notifications:', targetUser.notifications.length)
    
    // Generate a temporary ID for response
    const tempId = `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    
    return {
      success: true,
      message: 'Notification sent successfully',
      notification: {
        id: tempId,
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
    
  } catch (err: any) {
    console.error('❌ Send notification error:', err)
    throw createError({ 
      statusCode: err.statusCode || 500, 
      message: err.message || 'Failed to send notification' 
    })
  }
})

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