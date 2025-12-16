// server/api/parks/index.get.ts
import { defineEventHandler, getQuery } from 'h3'
import { connectDB } from '../../utils/mongoose'
import Park from '../../models/Park'

export default defineEventHandler(async (event) => {
  await connectDB()
  try {
    const q = getQuery(event) as Record<string, string|undefined>
    const status = q.status?.toString()

    const filter: Record<string, unknown> = {}
    if (status === 'active') filter.isActive = true
    if (status === 'inactive') filter.isActive = false

    const parks = await Park
      .find(filter)
      .sort({ order: 1, createdAt: -1 })
      .lean()

    return { ok: true, data: parks }
  } catch (err: any) {
    console.error('GET /api/parks error', err)
    return { ok: false, error: err?.message || 'Failed to list parks' }
  }
})
