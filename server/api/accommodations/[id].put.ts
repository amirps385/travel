// server/api/accommodations/[id].put.ts
import { defineEventHandler, readBody } from 'h3'
import { connectDB } from '../../utils/mongoose'
import Accommodation from '../../models/Accommodation'

export default defineEventHandler(async (event) => {
  const db = await connectDB()
  if (!db) return { ok: false, error: 'Database connection failed' }
  
  try {
    const id = event.context?.params?.id
    if (!id) {
      return { ok: false, error: 'Accommodation ID is required' }
    }

    const body = await readBody(event)
    
    // Find accommodation
    const accommodation = await Accommodation.findById(id)
    if (!accommodation) {
      return { ok: false, error: 'Accommodation not found' }
    }

    // Check slug uniqueness if being updated
    if (body.slug && body.slug !== accommodation.slug) {
      const slugExists = await Accommodation.findOne({
        slug: generateSlug(body.slug),
        _id: { $ne: id },
        isDeleted: false
      })
      
      if (slugExists) {
        return { ok: false, error: 'Slug already exists' }
      }
      body.slug = generateSlug(body.slug)
    }

    // Update fields
    const updatableFields = [
      'name', 'slug', 'city', 'park', 'country', 'type', 'category',
      'starRating', 'description', 'highlights', 'amenities', 'images',
      'videos', 'address', 'geo', 'contact', 'rooms', 'minPrice',
      'maxPrice', 'policies', 'seo', 'isPublic', 'isDeleted'
    ]

    updatableFields.forEach(field => {
      if (body[field] !== undefined) {
        (accommodation as any)[field] = body[field]
      }
    })

    await accommodation.save()

    return { 
      ok: true, 
      data: accommodation,
      message: 'Accommodation updated successfully'
    }
  } catch (error: any) {
    console.error('Update accommodation error:', error)
    return { 
      ok: false, 
      error: error.message || 'Failed to update accommodation' 
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