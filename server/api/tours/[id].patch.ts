// server/api/tours/[id].patch.ts
import { defineEventHandler, readBody } from 'h3'
import { connectDB } from '../../utils/mongoose'  // Changed: TWO levels up
import Tour from '../../models/Tour'              // Changed: TWO levels up

export default defineEventHandler(async (event) => {
  await connectDB()
  const params = (event as any)?.context?.params || {}
  const id = params.id
  if (!id) return { success: false, message: 'Missing id' }

  try {
    const body = await readBody(event)
    const updated = await Tour.findByIdAndUpdate(id, body, { new: true }).lean().exec()
    return { success: true, data: updated }
  } catch (err: any) {
    console.error(`[PATCH /api/tours/${id}] error:`, err)
    return { success: false, message: err.message || 'Server error' }
  }
})