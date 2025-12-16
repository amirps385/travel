// server/api/parks/index.post.ts
import { defineEventHandler, readBody } from 'h3'
import { connectDB } from '../../utils/mongoose'
import Park from '../../models/Park'

export default defineEventHandler(async (event) => {
  await connectDB()
  try {
    const body = await readBody(event) as Record<string, any>

    // Basic validation (server-side)
    const required = ['name', 'slug', 'shortDescription', 'description', 'region', 'location', 'category']
    for (const f of required) {
      const v = body[f]
      if (!v || (typeof v === 'string' && !v.trim())) {
        return { ok: false, error: `${f} is required` }
      }
    }

    // prevent duplicate slug
    const existing = await Park.findOne({ slug: body.slug })
    if (existing) {
      return { ok: false, error: 'slug already exists' }
    }

    const toSave = {
      ...body,
      gallery: Array.isArray(body.gallery) ? body.gallery : (body.gallery ? [body.gallery] : [])
    }

    const park = new Park(toSave)
    const saved = await park.save()
    return { ok: true, data: saved }
  } catch (err: any) {
    console.error('POST /api/parks error', err)
    // return validation error messages if present
    const msg = err?.message || 'Failed to create park'
    return { ok: false, error: msg }
  }
})
