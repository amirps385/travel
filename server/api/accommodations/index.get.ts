// server/api/accommodations/index.get.ts
import { defineEventHandler, getQuery } from 'h3'
import { connectDB } from '../../utils/mongoose'
import Accommodation from '../../models/Accommodation'

export default defineEventHandler(async (event) => {
  const db = await connectDB()
  if (!db) return { ok: false, error: 'Database connection failed' }
  
  const query = getQuery(event)
  const { 
    page = 1, 
    limit = 20, 
    city, 
    park, 
    type, 
    category,
    search,
    status
  } = query
  
  const filter: any = { isDeleted: false }
  
  // Apply filters
  if (city) filter.city = city
  if (park) filter.park = park
  if (type) filter.type = type
  if (category) filter.category = category
  
  // Apply status filter
  if (status === 'published') {
    filter.isPublic = true
  } else if (status === 'unpublished') {
    filter.isPublic = false
  } else if (status === 'deleted') {
    filter.isDeleted = true
  }
  
  // Apply search
  if (search) {
    const searchRegex = new RegExp(search as string, 'i')
    filter.$or = [
      { name: searchRegex },
      { slug: searchRegex },
      { city: searchRegex },
      { park: searchRegex },
      { country: searchRegex },
      { 'description.en': searchRegex }
    ]
  }
  
  const pageNum = parseInt(page as string)
  const limitNum = parseInt(limit as string)
  const skip = (pageNum - 1) * limitNum
  
  try {
    const [accommodations, total] = await Promise.all([
      Accommodation.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .select('name slug city park country type category starRating images isPublic isDeleted createdAt updatedAt _id minPrice maxPrice rooms'),
      Accommodation.countDocuments(filter)
    ])
    
    return {
      ok: true,
      data: accommodations,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum)
      }
    }
  } catch (error: any) {
    console.error('Get accommodations error:', error)
    return { ok: false, error: error.message || 'Failed to fetch accommodations' }
  }
})