// server/api/leads/[id]/emails/stats.get.ts
import { defineEventHandler, createError } from 'h3'
import mongoose from 'mongoose'

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  if (!id) {
    throw createError({ 
      statusCode: 400, 
      message: 'Lead ID is required' 
    })
  }

  try {
    // Use require instead of import
    const { connectDB } = require('../../../utils/mongoose')
    await connectDB()
    
    // Use require for models
    const Lead = require('../../../models/Lead').default
    const EmailLog = require('../../../models/EmailLog').default

    // Find lead
    const lead = await Lead.findById(id).lean()
    if (!lead) {
      throw createError({ 
        statusCode: 404, 
        message: 'Lead not found' 
      })
    }

    const objectId = new mongoose.Types.ObjectId(id)

    // Get total count
    const total = await EmailLog.countDocuments({ leadId: objectId })

    // Get most recent email
    const lastEmail = await EmailLog.findOne({ leadId: objectId })
      .sort({ sentAt: -1 })
      .lean()

    // Aggregate by template
    const byTemplate = await EmailLog.aggregate([
      { $match: { leadId: objectId } },
      { $group: {
          _id: '$templateId',
          count: { $sum: 1 },
          lastSent: { $max: '$sentAt' }
        }
      },
      { $sort: { count: -1 } }
    ])

    // Aggregate by status
    const byStatus = await EmailLog.aggregate([
      { $match: { leadId: objectId } },
      { $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ])

    return {
      total,
      lastSent: lastEmail ? {
        at: lastEmail.sentAt ? new Date(lastEmail.sentAt).toISOString() : null,
        subject: lastEmail.subject || null,
        templateId: lastEmail.templateId || null,
        status: lastEmail.status || null
      } : null,
      byTemplate: byTemplate.map((item: any) => ({
        templateId: item._id,
        count: item.count || 0,
        lastSent: item.lastSent ? new Date(item.lastSent).toISOString() : null
      })),
      byStatus: byStatus.map((item: any) => ({
        status: item._id,
        count: item.count || 0
      })),
      summary: {
        sent: byStatus.find((s: any) => s._id === 'sent')?.count || 0,
        failed: byStatus.find((s: any) => s._id === 'failed')?.count || 0,
        scheduled: byStatus.find((s: any) => s._id === 'scheduled')?.count || 0
      }
    }
  } catch (error: any) {
    console.error('Failed to compute email stats:', error)
    throw createError({ 
      statusCode: 500, 
      message: 'Failed to compute email statistics' 
    })
  }
})