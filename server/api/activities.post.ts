import { defineEventHandler, readBody, createError } from 'h3'
import { connectDB } from '../utils/mongoose'
import Activity from '../models/Activity'

export default defineEventHandler(async (event) => {
  await connectDB()

  const body = await readBody(event)

  // Very basic validation – only name is required
  if (!body.name || typeof body.name !== 'string' || !body.name.trim()) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Activity name is required'
    })
  }

  try {
    // normalise code first
const code =
  typeof body.code === 'string' ? body.code.trim() : ''

const created = await Activity.create({
  name: body.name.trim(),
  type: body.type || '',
  timeOfDay: body.timeOfDay || '',
  costUSD: typeof body.costUSD === 'number' ? body.costUSD : 0,
  durationMinutes:
    typeof body.durationMinutes === 'number' ? body.durationMinutes : 60,
  location: body.location || '',
  priorityPercent:
    typeof body.priorityPercent === 'number' ? body.priorityPercent : 50,
  // only save code if user actually entered something
  code: code || undefined,
  description: body.description || '',
  isActive:
    typeof body.isActive === 'boolean' ? body.isActive : true
})


    // Shape it to match what your frontend uses (id, not _id)
    return {
      id: created._id.toString(),
      name: created.name,
      type: created.type,
      timeOfDay: created.timeOfDay,
      costUSD: created.costUSD,
      durationMinutes: created.durationMinutes,
      location: created.location,
      priorityPercent: created.priorityPercent,
      code: created.code,
      description: created.description,
      isActive: created.isActive,
      createdAt: created.createdAt,
      updatedAt: created.updatedAt
    }
  } catch (err) {
    console.error('Failed to create activity', err)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create activity'
    })
  }
})
