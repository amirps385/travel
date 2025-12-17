// server/api/islands/[slug].get.ts
import { defineEventHandler } from 'h3'
import { connectDB } from '../../utils/mongoose'
import Island from '../../models/Island'

export default defineEventHandler(async (event) => {
  await connectDB()
  // Nitro sometimes exposes params at event.context.params
  const slug = event.context?.params?.slug || (() => {
    const reqUrl = event.node?.req?.url || ''
    const parts = reqUrl.split('/')
    return parts[parts.length - 1]
  })()

  if (!slug || typeof slug !== 'string') return { ok: false, error: 'Slug is required' }

  const island = await Island.findOne({ slug, isActive: true }).lean()
  if (!island) return { ok: false, error: 'Island not found' }
  return { ok: true, data: island }
})
