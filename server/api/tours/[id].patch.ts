// server/api/tours/[id].patch.ts
import { defineEventHandler, readBody } from 'h3'
import { connectDB } from '../../utils/mongoose'
import Tour from '../../models/Tour'
import { isValidObjectId } from 'mongoose'

function toStringArray(input: any): string[] {
  if (!input && input !== 0) return []
  if (Array.isArray(input)) return input.map(i => String(i).trim()).filter(Boolean)
  if (typeof input === 'string') return input.split(',').map(s => s.trim()).filter(Boolean)
  return [String(input).trim()].filter(Boolean)
}

function normalizeHighlights(input: any): Array<{ title: string; description?: string }> {
  if (!input) return []
  if (Array.isArray(input)) {
    return input.map((h: any) => {
      if (h && typeof h === 'object') {
        return { title: String(h.title ?? h.text ?? h.name ?? '').trim(), description: String(h.description ?? '').trim() }
      }
      return { title: String(h).trim(), description: '' }
    }).filter(h => h.title)
  }
  if (typeof input === 'string') {
    return input.split(',').map(s => ({ title: s.trim(), description: '' })).filter(h => h.title)
  }
  return []
}

export default defineEventHandler(async (event) => {
  await connectDB()
  const params = (event as any)?.context?.params || {}
  const id = params.id
  if (!id) return { success: false, message: 'Missing id' }
  if (!isValidObjectId(id)) return { success: false, message: 'Invalid id' }

  try {
    const body = await readBody(event)
    const update: any = {}

    // Basic text / scalar fields
    if (body.title !== undefined) update.title = body.title
    if (body.slug !== undefined) update.slug = body.slug
    if (body.overview !== undefined) update.overview = body.overview
    if (body.price !== undefined) update.price = (body.price === '' ? 0 : Number(body.price))
    if (body.route !== undefined) update.route = body.route
    if (body.type !== undefined) update.type = body.type
    if (body.bestTime !== undefined) update.bestTime = body.bestTime
    if (body.difficulty !== undefined) update.difficulty = body.difficulty
    if (body.ageRange !== undefined) update.ageRange = body.ageRange
    if (body.isActive !== undefined) update.isActive = !!body.isActive
    if (body.featuredImage !== undefined) update.featuredImage = body.featuredImage
    if (body.images !== undefined) update.images = Array.isArray(body.images) ? body.images : (body.images ? [body.images].flat().map((i: any) => String(i)) : [])

    // nights/duration
    if (body.nights !== undefined) {
      update.nights = body.nights === null ? null : Number(body.nights)
      if (update.nights != null && (body.duration === undefined)) {
        update.duration = update.nights + 1
      }
    }
    if (body.duration !== undefined) {
      update.duration = body.duration === null ? null : Number(body.duration)
      if (update.duration != null && (body.nights === undefined)) {
        update.nights = Math.max(1, update.duration - 1)
      }
    }

    // arrays: activities, keyLocations
    if (body.activities !== undefined) update.activities = toStringArray(body.activities)
    if (body.keyLocations !== undefined) update.keyLocations = toStringArray(body.keyLocations)

    // highlights (now objects or strings)
    if (body.highlights !== undefined) {
      update.highlights = normalizeHighlights(body.highlights)
    }

    // groupSize
    if (body.groupSize !== undefined) {
      if (typeof body.groupSize === 'object') {
        update.groupSize = { min: Number(body.groupSize.min ?? 0), max: Number(body.groupSize.max ?? 0) }
      } else {
        const min = body.groupMin ?? (body.groupSize?.min)
        const max = body.groupMax ?? (body.groupSize?.max)
        if (min !== undefined || max !== undefined) {
          update.groupSize = { min: Number(min ?? 0), max: Number(max ?? 0) }
        }
      }
    } else if (body.groupMin !== undefined || body.groupMax !== undefined) {
      update.groupSize = { min: Number(body.groupMin ?? 0), max: Number(body.groupMax ?? 0) }
    }

    // bestTime: accept "From - To" or object with from/to or separate fields
    if (body.bestTimeFrom !== undefined || body.bestTimeTo !== undefined) {
      const from = body.bestTimeFrom ?? ''
      const to = body.bestTimeTo ?? ''
      update.bestTime = (from && to) ? `${from} - ${to}` : (from || to || '')
    } else if (body.bestTime !== undefined) {
      update.bestTime = body.bestTime
    }

    // itinerary (array of days)
    if (body.itinerary !== undefined) {
      if (Array.isArray(body.itinerary)) {
        update.itinerary = body.itinerary.map((d: any) => ({
          title: d.title ?? '',
          description: d.description ?? '',
          activities: Array.isArray(d.activities) ? d.activities.map((a:any)=>String(a)) : (d.activities ? String(d.activities).split(',').map((s:string)=>s.trim()).filter(Boolean) : [])
        }))
      } else {
        // ignore invalid shape
      }
    }

    const updated = await Tour.findByIdAndUpdate(id, update, { new: true }).lean().exec()
    if (!updated) return { success: false, message: 'Not found' }
    return { success: true, data: updated }
  } catch (err: any) {
    console.error(`[PATCH /api/tours/${(event as any).context?.params?.id}] error:`, err)
    if (err.code === 11000) return { success: false, message: 'Duplicate key error (slug exists)' }
    return { success: false, message: err?.message || 'Server error' }
  }
})
