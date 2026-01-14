// server/api/cities.get.ts
import { defineEventHandler } from 'h3'
import { connectDB } from '../utils/mongoose'
import City from '../models/City'

export default defineEventHandler(async () => {
  await connectDB()

  const cities = await City.find().sort({ name: 1 })
  return cities
})
