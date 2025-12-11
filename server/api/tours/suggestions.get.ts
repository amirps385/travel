// server/api/tours/suggestions.get.ts
import { defineEventHandler } from 'h3'
import { connectDB } from '../../utils/mongoose'
import Tour from '../../models/Tour'
import Activity from '../../models/Activity' // <- pull names from activities collection when available

function normalizeStringArrayField(field: any): string[] {
  if (!field && field !== 0) return []
  if (Array.isArray(field)) {
    return field.map(s => typeof s === 'string' ? s.trim() : String(s).trim()).filter(Boolean)
  }
  if (typeof field === 'string') {
    return field.split(',').map(s => s.trim()).filter(Boolean)
  }
  return [String(field).trim()].filter(Boolean)
}

function addIfString(set: Set<string>, value: any) {
  if (!value && value !== 0) return
  if (typeof value === 'string') {
    const v = value.trim()
    if (v) set.add(v)
  } else {
    // coerce other primitives
    set.add(String(value).trim())
  }
}

export default defineEventHandler(async () => {
  await connectDB()
  try {
    // get all tours (existing behavior)
    const tours = await Tour.find({}).lean().exec() as any[]

    const highlightsSet = new Set<string>()
    const activitiesSet = new Set<string>()
    const keyLocationsSet = new Set<string>()
    const typesSet = new Set<string>()
    const difficultiesSet = new Set<string>()
    const ageRangesSet = new Set<string>()

    for (const t of tours) {
      normalizeStringArrayField(t?.highlights).forEach(h => highlightsSet.add(h))
      normalizeStringArrayField(t?.activities).forEach(a => activitiesSet.add(a))
      normalizeStringArrayField(t?.keyLocations || t?.locations || t?.route).forEach(k => keyLocationsSet.add(k))
      if (typeof t?.type === 'string' && t.type.trim()) typesSet.add(t.type.trim())
      if (typeof t?.difficulty === 'string' && t.difficulty.trim()) difficultiesSet.add(t.difficulty.trim())
      if (typeof t?.ageRange === 'string' && t.ageRange.trim()) ageRangesSet.add(t.ageRange.trim())

      if (Array.isArray(t?.itinerary)) {
        for (const d of t.itinerary) {
          normalizeStringArrayField(d?.activities).forEach(a => activitiesSet.add(a))
        }
      }

      // simple extraction from title (optional)
      if (typeof t?.title === 'string') {
        const low = t.title.toLowerCase()
        if (low.includes('serengeti')) keyLocationsSet.add('Serengeti')
        if (low.includes('ngorongoro')) keyLocationsSet.add('Ngorongoro')
        if (low.includes('tarangire')) keyLocationsSet.add('Tarangire')
        if (low.includes('kilimanjaro') || low.includes('kili')) keyLocationsSet.add('Kilimanjaro')
        if (low.includes('zanzibar')) keyLocationsSet.add('Zanzibar')
      }
    }

    // --- NEW: also fetch standalone activities collection and add their names ---
    try {
      const activityDocs = await Activity.find({}).lean().exec()
      if (Array.isArray(activityDocs)) {
        for (const a of activityDocs) {
          // try common fields that might contain the activity name:
          if (a.name && typeof a.name === 'string') {
            activitiesSet.add(a.name.trim())
          } else if (a.title && typeof a.title === 'string') {
            activitiesSet.add(a.title.trim())
          } else if (a.activity && typeof a.activity === 'string') {
            activitiesSet.add(a.activity.trim())
          } else if (a.activityName && typeof a.activityName === 'string') {
            activitiesSet.add(a.activityName.trim())
          } else if (a._id && !a.name) {
            // fallback: if activity doc is just a string or has code, include that
            addIfString(activitiesSet, a._id)
          }
          // If activity documents include array fields (tags), add them too:
          if (Array.isArray(a.tags)) {
            a.tags.forEach((t: any) => { if (typeof t === 'string' && t.trim()) activitiesSet.add(t.trim()) })
          }
        }
      }
    } catch (actErr) {
      // Non-fatal: log but continue using tour-based suggestions
      console.warn('[GET /api/tours/suggestions] failed to load activities collection:', actErr)
    }

    const suggestions = {
      highlights: Array.from(highlightsSet).slice(0, 500),
      activities: Array.from(activitiesSet).slice(0, 500),
      keyLocations: Array.from(keyLocationsSet).slice(0, 500),
      types: Array.from(typesSet).slice(0, 200),
      difficulties: Array.from(difficultiesSet).slice(0, 50),
      ageRanges: Array.from(ageRangesSet).slice(0, 200)
    }

    return { success: true, data: suggestions }
  } catch (err: any) {
    console.error('[GET /api/tours/suggestions] error:', err)
    return { success: false, message: err?.message || 'Server error' }
  }
})
