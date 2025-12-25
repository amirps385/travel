import Route from '../../models/Route'
import { connectDB } from '../../utils/mongoose'

function normalizeBestSeason(input: any) {
  // Expect either:
  // - { from, to, detail }
  // - { value: 'Jan–Mar', detail: '' }
  // - 'Jan–Mar' string
  if (!input) return { from: '', to: '', detail: '' }

  if (typeof input === 'object') {
    if (input.from !== undefined || input.to !== undefined) {
      return {
        from: input.from || '',
        to: input.to || '',
        detail: input.detail || ''
      }
    }
    if (input.value !== undefined) {
      const val = String(input.value || '').trim()
      if (!val) return { from: '', to: '', detail: input.detail || '' }
      if (/year[-\s]*round/i.test(val)) {
        return { from: 'Year-round', to: 'Year-round', detail: input.detail || '' }
      }
      const parts = val.split(/–|—|-/).map(s => s.trim()).filter(Boolean)
      if (parts.length === 2) return { from: parts[0], to: parts[1], detail: input.detail || '' }
      return { from: val, to: val, detail: input.detail || '' }
    }
  }

  if (typeof input === 'string') {
    const s = input.trim()
    if (!s) return { from: '', to: '', detail: '' }
    if (/year[-\s]*round/i.test(s)) return { from: 'Year-round', to: 'Year-round', detail: '' }
    const parts = s.split(/–|—|-/).map(ss => ss.trim()).filter(Boolean)
    if (parts.length === 2) return { from: parts[0], to: parts[1], detail: '' }
    return { from: s, to: s, detail: '' }
  }

  return { from: '', to: '', detail: '' }
}

export default defineEventHandler(async (event) => {
  await connectDB()
  
  try {
    const body = await readBody(event)

    // Validate required fields - ADD region to validation
    if (!body.name || !body.slug || !body.description || !body.difficulty || !body.region) {
      throw createError({
        statusCode: 400,
        message: 'Missing required fields: name, slug, description, difficulty, region',
      })
    }

    // Normalize stats.bestSeason for backwards compatibility
    const stats = body.stats || {}
    stats.startingAltitude = stats.startingAltitude || { value: '', detail: '' }
    stats.maxAltitude = stats.maxAltitude || { value: '', detail: '' }
    stats.totalDistance = stats.totalDistance || { value: '', detail: '' }
    stats.acclimatization = stats.acclimatization || { value: '', detail: '' }

    stats.bestSeason = normalizeBestSeason(stats.bestSeason)

    // Create new route
    const newRoute = await Route.create({
      name: body.name,
      slug: body.slug,
      tagline: body.tagline || '',
      shortDescription: body.shortDescription || '',
      region: body.region, // ADDED: Region field
      description: body.description,
      featuredImage: body.featuredImage || '',
      heroImage: body.heroImage || '',
      duration: body.duration || '',
      durationMin: body.durationMin || null,
      durationMax: body.durationMax || null,
      startingPrice: body.startingPrice || null,
      difficulty: body.difficulty,
      successRate: body.successRate || '',
      highlights: body.highlights || [],
      whatsIncluded: body.whatsIncluded || {
        included: [],
        notIncluded: [],
        note: ''
      },
      stats: stats,
      itinerary: body.itinerary || [],
      groupClimbs: body.groupClimbs || [],
      gallery: body.gallery || [],
      faqs: body.faqs || [],
      seo: body.seo || { title: '', description: '', keywords: [] },
      isActive: body.isActive !== undefined ? body.isActive : true,
      isFeatured: body.isFeatured || false,
    })

    return {
      success: true,
      message: 'Route created successfully',
      data: newRoute,
    }
  } catch (error: any) {
    console.error('Create route error:', error)
    
    // Handle duplicate slug error
    if (error.code === 11000) {
      throw createError({
        statusCode: 400,
        message: 'A route with this slug already exists',
      })
    }
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err: any) => err.message)
      throw createError({
        statusCode: 400,
        message: `Validation failed: ${messages.join(', ')}`,
      })
    }
    
    throw createError({
      statusCode: 500,
      message: 'Failed to create route',
    })
  }
})
