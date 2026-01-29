// server/models/User.ts
import mongoose from 'mongoose'

const NotificationSchema = new mongoose.Schema(
  {
    type: { 
      type: String, 
      required: true,
      enum: [
        'lead_assigned',
        'follow_up_reminder',
        'new_message',
        'system_alert',
        'task_due',
        'itinerary_updated',
        'lead_status_changed'
      ]
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    data: { type: mongoose.Schema.Types.Mixed },
    read: { type: Boolean, default: false },
    link: { type: String },
    icon: { type: String },
    createdAt: { type: Date, default: Date.now }
  },
  { _id: true }
)

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { 
      type: String, 
      default: 'content-manager',
      enum: [
        'superadmin',
        'admin', 
        'content-manager',
        'lead-manager',
        'itinerary-planner',
        'marketing-manager'
      ],
      required: true 
    }, 
    passwordHash: { type: String },
    isActive: { type: Boolean, default: true },
    avatar: { type: String },
    notifications: { type: [NotificationSchema], default: [] },
    notificationSettings: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
      leadAssignments: { type: Boolean, default: true },
      followUpReminders: { type: Boolean, default: true },
      systemAlerts: { type: Boolean, default: true }
    },
    meta: { type: mongoose.Schema.Types.Mixed }
  },
  { timestamps: true }
)

// Notification methods on the User model
UserSchema.methods.addNotification = async function(notificationData: any) {
  const getNotificationIcon = (type: string): string => {
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

  const notification = {
    type: notificationData.type,
    title: notificationData.title,
    message: notificationData.message,
    data: notificationData.data || {},
    link: notificationData.link || '',
    icon: notificationData.icon || getNotificationIcon(notificationData.type),
    read: false,
    createdAt: new Date()
  }

  this.notifications.unshift(notification)
  
  // Keep only last 100 notifications
  if (this.notifications.length > 100) {
    this.notifications = this.notifications.slice(0, 100)
  }

  await this.save()
  return notification
}

UserSchema.methods.getNotifications = function(limit = 20, offset = 0) {
  const sorted = [...this.notifications].sort((a: any, b: any) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
  return sorted.slice(offset, offset + limit)
}

UserSchema.methods.markNotificationAsRead = async function(notificationId: string) {
  const notification = this.notifications.id(notificationId)
  if (notification) {
    notification.read = true
    await this.save()
    return true
  }
  return false
}

UserSchema.methods.markAllNotificationsAsRead = async function() {
  this.notifications.forEach((n: any) => {
    n.read = true
  })
  await this.save()
  return true
}

UserSchema.methods.clearAllNotifications = async function() {
  this.notifications = []
  await this.save()
  return true
}

// Static methods
UserSchema.statics.notifyLeadAssigned = async function(
  leadId: string, 
  leadTitle: string, 
  assignedTo: string, 
  assignedBy: string
) {
  const user = await this.findById(assignedTo)
  if (!user) return null
  
  return user.addNotification({
    type: 'lead_assigned',
    title: 'New Lead Assigned',
    message: `Lead "${leadTitle}" has been assigned to you by ${assignedBy}`,
    data: { leadId, assignedBy },
    link: `/admin/dashboard/leads/${leadId}`
  })
}

export default mongoose.models.User || mongoose.model('User', UserSchema)