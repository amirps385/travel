// server/api/items/[slug].get.ts
import { defineEventHandler } from 'h3'
import { connectDB } from '../../utils/mongoose'
import Item from '../../models/Item'

export default defineEventHandler(async (event) => {
  await connectDB()
  const slug = event.context?.params?.slug || (() => {
    const reqUrl = event.node?.req?.url || ''
    const parts = reqUrl.split('/')
    return parts[parts.length - 1]
  })()

  if (!slug || typeof slug !== 'string') return { ok: false, error: 'Slug is required' }
  const item = await Item.findOne({ slug, isDeleted: { $ne: true }, isPublic: true }).lean()
  if (!item) return { ok: false, error: 'Item not found' }
  return { ok: true, data: item }
})
