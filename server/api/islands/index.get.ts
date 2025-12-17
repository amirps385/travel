// File: server/api/islands/index.get.ts
import { defineEventHandler } from 'h3'
import { connectDB } from '../../utils/mongoose'
import Island from '../../models/Island'


export default defineEventHandler(async (event) => {
await connectDB()


// Query params: ?q=&region=&tag=&limit=&page=
const url = new URL(event.node.req.url || '', `http://${event.node.req.headers.host || 'localhost'}`)
const q = url.searchParams.get('q') || ''
const region = url.searchParams.get('region') || ''
const tag = url.searchParams.get('tag') || ''
const page = parseInt(url.searchParams.get('page') || '1') || 1
const limit = Math.min(parseInt(url.searchParams.get('limit') || '12') || 12, 100)


const filter: any = { isActive: true }
if (q) filter.$or = [ { name: { $regex: q, $options: 'i' } }, { shortDescription: { $regex: q, $options: 'i' } }, { description: { $regex: q, $options: 'i' } } ]
if (region) filter.region = region
if (tag) filter.tags = tag


const skip = (page - 1) * limit
const total = await Island.countDocuments(filter)
const items = await Island.find(filter).sort({ order: 1, name: 1 }).skip(skip).limit(limit).lean()


return { ok: true, data: items, meta: { total, page, limit } }
})