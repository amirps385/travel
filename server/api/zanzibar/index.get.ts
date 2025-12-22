// server/api/zanzibar/index.get.ts
import { defineEventHandler } from 'h3'
import Zanzibar from '../../models/Zanzibar'
import { connectDB } from '../../utils/mongoose'

export default defineEventHandler(async (event) => {
  await connectDB()

  // simple query parsing
  const url = new URL(event.node.req.url || '', 'http://localhost')
  const q = url.searchParams

  const filter: any = { isActive: true }

  if (q.get('region')) filter.region = q.get('region')
  if (q.get('type')) filter.type = q.get('type')

  const search = q.get('q') || q.get('search')
  if (search) {
    const re = new RegExp(search, 'i')
    filter.$or = [
      { title: re },
      { description: re },
      { highlights: { $elemMatch: re } }
    ]
  }

  const limit = Math.min(Number(q.get('limit') || 0) || 0, 100) || undefined
  const skip = Number(q.get('skip') || 0) || 0

  const query = Zanzibar.find(filter).sort({ title: 1 })
  if (skip) query.skip(skip)
  if (limit) query.limit(limit)

  const data = await query.lean()
  return { success: true, data }
})
