import { defineEventHandler } from 'h3'
import { connectDB } from '../utils/mongoose'
import Itinerary from '../models/Itinerary'

export default defineEventHandler(async () => {
  await connectDB()

  const itineraries = await Itinerary.find().sort({ createdAt: -1 })

  return itineraries
})
