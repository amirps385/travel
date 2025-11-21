import Lead from '../models/Lead'
import { connectDB } from '../utils/mongoose'


export default defineEventHandler(async () => {
  await connectDB()
  const leads = await Lead.find().sort({ createdAt: -1 }).lean()
  return leads
})
