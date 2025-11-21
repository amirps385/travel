// server/api/transfers.get.ts
import { defineEventHandler } from 'h3'
import { connectDB } from '../utils/mongoose'
import Transfer from '../models/Transfer'

export default defineEventHandler(async () => {
  await connectDB()

  // return all transfers, newest first
  const transfers = await Transfer.find().sort({ createdAt: -1 }).lean()
  return transfers
})
