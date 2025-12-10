// server/api/tours/suggestions.get.ts
import { defineEventHandler } from 'h3'
import { connectDB } from '../../utils/mongoose'
import Tour from '../../models/Tour'

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

export default defineEventHandler(async () => {
  await connectDB()
  try {
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
