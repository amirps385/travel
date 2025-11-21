import { defineEventHandler, readBody } from 'h3'
import { connectDB } from '../utils/mongoose'
import City from '../models/City'

export default defineEventHandler(async (event) => {
  await connectDB()

  const body = await readBody<{ name?: string }>(event)
  const name = (body.name || '').trim()

  if (!name) {
    throw createError({
      statusCode: 400,
      statusMessage: 'City name is required'
    })
  }

  // prevent exact duplicates
  const existing = await City.findOne({ name })
  if (existing) {
    return existing
  }

  const city = await City.create({ name })
  return city
})
