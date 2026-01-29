// server/utils/notifications.ts
import User from '../models/User'

export class NotificationService {
  // Send lead assignment notification
  static async sendLeadAssignedNotification(
    leadId: string,
    leadTitle: string,
    assignedToUserId: string,
    assignedByName: string
  ) {
    try {
      const user = await User.findById(assignedToUserId)
      if (!user) {
        console.warn(`User ${assignedToUserId} not found for lead assignment notification`)
        return null
      }
      
      const notification = await user.addNotification({
        type: 'lead_assigned',
        title: 'New Lead Assigned',
        message: `Lead "${leadTitle}" has been assigned to you by ${assignedByName}`,
        data: {
          leadId,
          leadTitle,
          assignedBy: assignedByName,
          assignedAt: new Date().toISOString()
        },
        link: `/admin/dashboard/leads/${leadId}`
      })
      
      return notification
    } catch (error) {
      console.error('Failed to send lead assignment notification:', error)
      return null
    }
  }

  // Send follow-up creation notification
  static async sendFollowUpNotification(
    userId: string,
    leadId: string,
    leadName: string,
    followUpDate: Date,
    note?: string
  ) {
    try {
      const user = await User.findById(userId)
      if (!user) return null
      
      const formattedDate = followUpDate.toLocaleString()
      const notification = await user.addNotification({
        type: 'follow_up_reminder',
        title: 'Follow-up Created',
        message: `You set a follow-up for lead "${leadName}" on ${formattedDate}`,
        data: {
          leadId,
          leadName,
          followUpDate: followUpDate.toISOString(),
          note,
          reminderDays: 3 // Default reminder 3 days before
        },
        link: `/admin/dashboard/leads/${leadId}`
      })
      
      return notification
    } catch (error) {
      console.error('Failed to send follow-up notification:', error)
      return null
    }
  }

  // Send follow-up reminder notification (2-3 days before)
  static async sendFollowUpReminder(
    userId: string,
    leadId: string,
    leadName: string,
    followUpDate: Date,
    daysUntil: number
  ) {
    try {
      const user = await User.findById(userId)
      if (!user) return null
      
      const formattedDate = followUpDate.toLocaleDateString()
      const notification = await user.addNotification({
        type: 'follow_up_reminder',
        title: 'Upcoming Follow-up',
        message: `Follow-up for lead "${leadName}" is in ${daysUntil} day${daysUntil !== 1 ? 's' : ''} (${formattedDate})`,
        data: {
          leadId,
          leadName,
          followUpDate: followUpDate.toISOString(),
          daysUntil,
          isReminder: true
        },
        link: `/admin/dashboard/leads/${leadId}`
      })
      
      return notification
    } catch (error) {
      console.error('Failed to send follow-up reminder:', error)
      return null
    }
  }
}