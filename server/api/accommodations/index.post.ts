// server/api/accommodations/index.post.ts
import { defineEventHandler, readBody } from 'h3'
import { connectDB } from '../../utils/mongoose'
import Accommodation from '../../models/Accommodation'

export default defineEventHandler(async (event) => {
  const db = await connectDB()
  if (!db) return { ok: false, error: 'Database connection failed' }
  
  try {
    const body = await readBody(event)
    
    // Validation
    if (!body || !body.name) {
      return { ok: false, error: 'Name is required' }
    }

    // Generate slug if not provided
    if (!body.slug) {
      body.slug = generateSlug(body.name)
    } else {
      body.slug = generateSlug(body.slug)
    }

    // Check for duplicate slug
    const existing = await Accommodation.findOne({ 
      slug: body.slug, 
      isDeleted: false 
    })
    
    if (existing) {
      return { 
        ok: false, 
        error: 'Slug already exists. Please choose a different one.' 
      }
    }

    // Prepare data
    const accommodationData = {
      name: body.name,
      slug: body.slug,
      city: body.city || '',
      park: body.park || '',
      country: body.country || '',
      type: body.type || '',
      category: body.category || '',
      starRating: body.starRating || undefined,
      description: body.description || { en: '' },
      highlights: Array.isArray(body.highlights) ? body.highlights : [],
      amenities: Array.isArray(body.amenities) ? body.amenities : [],
      images: Array.isArray(body.images) ? body.images : [],
      videos: Array.isArray(body.videos) ? body.videos : [],
      address: body.address || '',
      geo: body.geo || {},
      contact: body.contact || {},
      rooms: body.rooms || 0,
      minPrice: body.minPrice || undefined,
      maxPrice: body.maxPrice || undefined,
      policies: body.policies || {},
      seo: body.seo || {},
      isPublic: body.isPublic !== false
    }

    const accommodation = new Accommodation(accommodationData)
    await accommodation.save()

    return { 
      ok: true, 
      data: accommodation,
      message: 'Accommodation created successfully'
    }
  } catch (error: any) {
    console.error('Create accommodation error:', error)
    return { 
      ok: false, 
      error: error.message || 'Failed to create accommodation' 
    }
  }
})

// Helper function to generate slug
function generateSlug(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}