// server/api/islands/[id].delete.ts
import { defineEventHandler } from 'h3'
import { connectDB } from '../../utils/mongoose'
import Island from '../../models/Island'

export default defineEventHandler(async (event) => {
  await connectDB()
  const id = event.context?.params?.id
  if (!id) return { ok: false, error: 'id required' }
  const deleted = await Island.findByIdAndDelete(id)
  if (!deleted) return { ok: false, error: 'Island not found' }
  // optionally: delete files from disk (left as exercise)
  return { ok: true }
})
