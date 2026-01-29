// server/api/items/[id].delete.ts
import { defineEventHandler } from 'h3'
import { connectDB } from '../../utils/mongoose'
import Item from '../../models/Item'

export default defineEventHandler(async (event) => {
  await connectDB()
  const id = event.context?.params?.id
  if (!id) return { ok: false, error: 'id required' }
  const deleted = await Item.findByIdAndDelete(id)
  if (!deleted) return { ok: false, error: 'Item not found' }
  return { ok: true }
})
