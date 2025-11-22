import { defineEventHandler } from 'h3'
import { connectDB } from '../utils/mongoose'
import Activity from '../models/Activity'

export default defineEventHandler(async () => {
  await connectDB()

  const docs = await Activity.find().sort({ createdAt: -1 }).lean()

  return docs.map((a: any) => ({
    id: a._id.toString(),
    name: a.name,
    type: a.type,
    timeOfDay: a.timeOfDay,
    costUSD: a.costUSD,
    durationMinutes: a.durationMinutes,
    location: a.location,
    priorityPercent: a.priorityPercent,
    code: a.code,
    description: a.description,
    isActive: a.isActive,
    createdAt: a.createdAt,
    updatedAt: a.updatedAt
  }))
})
