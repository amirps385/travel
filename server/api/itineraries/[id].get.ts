import { defineEventHandler, createError } from 'h3'
import { connectDB } from '../../utils/mongoose'
import Itinerary from '../../models/Itinerary'

export default defineEventHandler(async (event) => {
  await connectDB()

  const id = event.context.params?.id
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Missing itinerary ID' })
  }

  const itinerary = await Itinerary.findById(id)
  if (!itinerary) {
    throw createError({ statusCode: 404, statusMessage: 'Itinerary not found' })
  }

  return itinerary
})
