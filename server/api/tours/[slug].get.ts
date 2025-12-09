// server/api/tours/[slug].get.ts
import { defineEventHandler } from 'h3'
import { connectDB } from '../../utils/mongoose'  // Changed: TWO levels up
import Tour from '../../models/Tour'              // Changed: TWO levels up

export default defineEventHandler(async (event) => {
  await connectDB()
  const params = (event as any)?.context?.params || {}
  const slug = params.slug || params?.id || null
  if (!slug) {
    return { success: false, message: 'Missing slug param' }
  }
  try {
    const tour = await Tour.findOne({ slug }).lean().exec()
    if (!tour) return { success: false, message: 'Not found' }
    return { success: true, data: tour }
  } catch (err: any) {
    console.error(`[GET /api/tours/${slug}] error:`, err)
    return { success: false, message: err.message || 'Server error' }
  }
})