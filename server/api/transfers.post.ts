// server/api/transfers.post.ts
import { defineEventHandler, readBody, createError } from 'h3'
import { connectDB } from '../utils/mongoose'
import Transfer from '../models/Transfer'

export default defineEventHandler(async (event) => {
  await connectDB()

  const body = await readBody(event)

  if (!body.fromCity || !body.toCity) {
    throw createError({
      statusCode: 400,
      statusMessage: 'fromCity and toCity are required'
    })
  }

  const transfer = await Transfer.create({
    fromCity: body.fromCity,
    toCity: body.toCity,
    durationHours: body.durationHours ?? 1,
    costUSD: body.costUSD ?? 0,
    vehicleType: body.vehicleType ?? ''
  })

  return transfer
})
