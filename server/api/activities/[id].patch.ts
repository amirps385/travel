// server/api/activities/[id].patch.ts
import { defineEventHandler, readBody, createError } from 'h3'
import { connectDB } from '../../utils/mongoose'
import Activity from '../../models/Activity'

export default defineEventHandler(async (event) => {
  await connectDB()

  const id = event.context.params?.id
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Activity id is required'
    })
  }

  const body = await readBody(event)

  // Update activity and return the new document
  const updatedRaw = await Activity.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true
  }).lean()

  if (!updatedRaw) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Activity not found'
    })
  }

  // Tell TypeScript this is a single document, not an array
  const updated = updatedRaw as any

  return {
    id: updated._id.toString(),
    name: updated.name,
    type: updated.type,
    timeOfDay: updated.timeOfDay,
    costUSD: updated.costUSD,
    durationMinutes: updated.durationMinutes,
    location: updated.location,
    priorityPercent: updated.priorityPercent,
    code: updated.code,
    description: updated.description,
    isActive: updated.isActive,
    createdAt: updated.createdAt
  }
})
