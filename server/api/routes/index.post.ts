import Route from '../../models/Route'
import { connectDB } from '../../utils/mongoose'

export default defineEventHandler(async (event) => {
  await connectDB()

  try {
    const body = await readBody(event)

    // Validate required fields
    if (!body.name || !body.slug || !body.description) {
      throw createError({
        statusCode: 400,
        message: 'Missing required fields: name, slug, description',
      })
    }

    // Create new route
    const newRoute = await Route.create({
      name: body.name,
      slug: body.slug,
      tagline: body.tagline || '',
      shortDescription: body.shortDescription || '',
      description: body.description,
      featuredImage: body.featuredImage || '',
      heroImage: body.heroImage || '',
      duration: body.duration || '',
      durationMin: body.durationMin || null,
      durationMax: body.durationMax || null,
      startingPrice: body.startingPrice || null,
      difficulty: body.difficulty || '',
      successRate: body.successRate || '',
      highlights: body.highlights || [],
      stats: body.stats || {
        startingAltitude: { value: '', detail: '' },
        maxAltitude: { value: '', detail: '' },
        totalDistance: { value: '', detail: '' },
        bestSeason: { value: '', detail: '' },
        acclimatization: { value: '', detail: '' }
      },
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