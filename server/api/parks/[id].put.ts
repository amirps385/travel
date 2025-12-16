// server/api/parks/[id].put.ts
import { defineEventHandler, readBody } from 'h3'
import { connectDB } from '../../utils/mongoose'
import Park from '../../models/Park'

export default defineEventHandler(async (event) => {
  await connectDB()
  try {
    const id = event.context.params?.id
    if (!id) return { ok: false, error: 'id is required' }

    const body = await readBody(event) as Record<string, any>

    // If slug is being updated, ensure it's not used by another doc
    if (body.slug) {
      const other = await Park.findOne({ slug: body.slug, _id: { $ne: id } })
      if (other) return { ok: false, error: 'slug already used by another park' }
    }

    const updated = await Park.findByIdAndUpdate(id, body, { new: true, runValidators: true })
    if (!updated) return { ok: false, error: 'Park not found' }

    return { ok: true, data: updated }
  } catch (err: any) {
    console.error('PUT /api/parks/:id error', err)
    return { ok: false, error: err?.message || 'Failed to update park' }
  }
})
