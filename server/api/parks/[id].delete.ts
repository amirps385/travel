// server/api/parks/[id].delete.ts
import { defineEventHandler } from 'h3'
import { connectDB } from '../../utils/mongoose'
import Park from '../../models/Park'

export default defineEventHandler(async (event) => {
  await connectDB()
  try {
    const id = event.context.params?.id
    if (!id) return { ok: false, error: 'id is required' }

    const removed = await Park.findByIdAndDelete(id)
    if (!removed) return { ok: false, error: 'Park not found' }

    return { ok: true, data: removed }
  } catch (err: any) {
    console.error('DELETE /api/parks/:id error', err)
    return { ok: false, error: err?.message || 'Failed to delete park' }
  }
})
