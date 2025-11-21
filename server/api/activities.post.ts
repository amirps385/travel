import Activity from '../models/Activity'
import { connectDB } from '../utils/mongoose'

export default defineEventHandler(async (event) => {
  await connectDB()

  const body = await readBody(event)
  const {
    name,
    type,
    timeOfDay,
    costUSD,
    durationMinutes,
    location,
    priorityPercent,
    code,
    description
  } = body || {}

  if (!name) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Name is required'
    })
  }

  const activity = await Activity.create({
    name,
    type,
    timeOfDay,
    costUSD: Number(costUSD) || 0,
    durationMinutes: Number(durationMinutes) || 0,
    location,
    priorityPercent: Number(priorityPercent) || 50,
    code,
    description
  })

  return {
    id: activity._id.toString(),
    name: activity.name,
    type: activity.type,
    timeOfDay: activity.timeOfDay,
    costUSD: activity.costUSD,
    durationMinutes: activity.durationMinutes,
    location: activity.location,
    priorityPercent: activity.priorityPercent,
    code: activity.code,
    description: activity.description,
    isActive: activity.isActive,
    createdAt: activity.createdAt
  }
})
