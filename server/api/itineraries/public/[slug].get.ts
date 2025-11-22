import { defineEventHandler, createError } from 'h3'
import { connectDB } from '../../../utils/mongoose'
import Itinerary from '../../../models/Itinerary'

export default defineEventHandler(async (event) => {
  await connectDB()

  const slug = event.context.params?.slug

  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Missing slug' })
  }

  const itinerary = await Itinerary.findOne({ slug })

  if (!itinerary) {
    throw createError({ statusCode: 404, statusMessage: 'Not found' })
  }

  // Update analytics
  itinerary.viewCount = (itinerary.viewCount || 0) + 1
  itinerary.lastViewedAt = new Date()
  await itinerary.save()

  return itinerary
})
