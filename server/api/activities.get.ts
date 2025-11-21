import Activity from '../models/Activity'
import { connectDB } from '../utils/mongoose'

export default defineEventHandler(async (event) => {
  await connectDB()

  const query = getQuery(event)
  const q = (query.q as string | undefined)?.toLowerCase() || ''

  const filter: any = {}

  if (q) {
    filter.$or = [
      { name: { $regex: q, $options: 'i' } },
      { type: { $regex: q, $options: 'i' } },
      { location: { $regex: q, $options: 'i' } },
      { code: { $regex: q, $options: 'i' } }
    ]
  }

  const docs = await Activity.find(filter).sort({ createdAt: -1 }).lean()

  return docs.map((doc: any) => ({
    id: doc._id.toString(),
    name: doc.name,
    type: doc.type,
    timeOfDay: doc.timeOfDay,
    costUSD: doc.costUSD ?? 0,
    durationMinutes: doc.durationMinutes ?? 0,
    location: doc.location,
    priorityPercent: doc.priorityPercent ?? 50,
    code: doc.code,
    description: doc.description,
    isActive: doc.isActive,
    createdAt: doc.createdAt
  }))
})
