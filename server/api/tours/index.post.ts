// server/api/tours/index.post.ts
import { defineEventHandler, readBody } from 'h3'
import { connectDB } from '../../utils/mongoose'
import Tour from '../../models/Tour'

function toStringArray(input: any): string[] {
  if (!input && input !== 0) return []
  if (Array.isArray(input)) return input.map(i => String(i).trim()).filter(Boolean)
  if (typeof input === 'string') return input.split(',').map(s => s.trim()).filter(Boolean)
  return [String(input).trim()].filter(Boolean)
}

export default defineEventHandler(async (event) => {
  await connectDB()
  try {
    const body = await readBody(event)

    // Required
    if (!body || !body.title || !body.slug) {
      return { success: false, message: 'Missing required fields (title, slug)' }
    }

    // Prepare payload (defensive)
    const payload: any = {
      title: String(body.title),
      slug: String(body.slug),
      overview: body.overview ?? '',
      price: typeof body.price === 'number' ? body.price : Number(body.price ?? 0),
      nights: body.nights != null ? Number(body.nights) : (body.duration != null ? Math.max(0, Number(body.duration) - 1) : null),
      duration: body.duration != null ? Number(body.duration) : (body.nights != null ? Number(body.nights) + 1 : null),
      highlights: toStringArray(body.highlights),
      featuredImage: body.featuredImage ?? '',
      images: Array.isArray(body.images) ? body.images.map((i: any) => String(i)) : (body.images ? toStringArray(body.images) : []),
      isActive: body.isActive === undefined ? true : !!body.isActive,
      route: body.route ?? '',
      type: body.type ?? '',
      bestTime: body.bestTime ?? '',
      difficulty: body.difficulty ?? '',
      keyLocations: toStringArray(body.keyLocations),
      activities: toStringArray(body.activities),
      ageRange: body.ageRange ?? '',
      groupSize: (body.groupSize && typeof body.groupSize === 'object') ? {
        min: Number(body.groupSize.min ?? 0),
        max: Number(body.groupSize.max ?? 0)
      } : (body.groupSize ? {
        min: Number(body.groupSize.min ?? 0),
        max: Number(body.groupSize.max ?? 0)
      } : { min: 0, max: 0 }),
      itinerary: Array.isArray(body.itinerary) ? body.itinerary.map((d: any) => ({
        title: d.title ?? '',
        description: d.description ?? '',
        activities: toStringArray(d.activities)
      })) : []
    }

    const created = await Tour.create(payload)
    return { success: true, data: created }
  } catch (err: any) {
    console.error('[POST /api/tours] error:', err)
    if (err.code === 11000) {
      return { success: false, message: 'A tour with this slug already exists' }
    }
    return { success: false, message: err?.message || 'Server error' }
  }
})
