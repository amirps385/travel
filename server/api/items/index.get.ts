// server/api/items/index.get.ts
import { defineEventHandler } from 'h3'
import { connectDB } from '../../utils/mongoose'
import Item from '../../models/Item'

export default defineEventHandler(async (event) => {
  await connectDB()

  // Query params: ?q=&type=&category=&attachTo=&free=&isPublic=&limit=&page=
  const url = new URL(event.node.req.url || '', `http://${event.node.req.headers.host || 'localhost'}`)
  const q = url.searchParams.get('q') || ''
  const type = url.searchParams.get('type') || ''
  const category = url.searchParams.get('category') || ''
  const attachTo = url.searchParams.get('attachTo') || ''
  const free = url.searchParams.get('free')
  const isPublic = url.searchParams.get('isPublic')

  const page = Math.max(1, parseInt(url.searchParams.get('page') || '1') || 1)
  const limit = Math.min(parseInt(url.searchParams.get('limit') || '12') || 12, 200)
  const skip = (page - 1) * limit

  const filter: any = { isDeleted: { $ne: true } }

  if (q) {
    const re = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')
    filter.$or = [
      { title: re },
      { shortDescription: re },
      { description: re },
      { code: re }
    ]
  }
  if (type) filter.type = type
  if (category) filter.category = category
  if (attachTo) filter.attachTo = attachTo
  if (free !== null && free !== undefined && free !== '') filter.free = free === 'true'
  if (isPublic !== null && isPublic !== undefined && isPublic !== '') filter.isPublic = isPublic === 'true'

  const total = await Item.countDocuments(filter)
  const items = await Item.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean()

  return { ok: true, data: items, meta: { total, page, limit } }
})
