import { defineEventHandler } from 'h3'
import { connectDB } from '../../utils/mongoose'
import Park from '../../models/Park'

export default defineEventHandler(async (event) => {
  await connectDB()

  // 🔥 ABSOLUTE RELIABLE WAY (no Nitro magic)
  const url = event.node.req.url || ''
  const parts = url.split('/')
  const slug = parts[parts.length - 1]

  if (!slug || slug === 'parks') {
    return { ok: false, error: 'Slug is required' }
  }

  const park = await Park.findOne({
    slug,
    isActive: true,
  }).lean()

  if (!park) {
    return { ok: false, error: 'Park not found' }
  }

  return { ok: true, data: park }
})
