// server/api/routes/index.get.ts - Updated select query
import Route from '../../models/Route'
import { connectDB } from '../../utils/mongoose'

export default defineEventHandler(async (event) => {
  await connectDB()
  
  const query = getQuery(event)
  const search = query.search as string
  const page = parseInt(query.page as string) || 1
  const limit = parseInt(query.limit as string) || 20
  const skip = (page - 1) * limit
  const id = query.id as string // For single route fetch
  const admin = query.admin as string // Check if admin request

  // ========== SINGLE ROUTE BY ID (FOR EDITING) ==========
  if (id) {
    try {
      console.log('Fetching single route by ID for editing:', id)
      
      const route = await Route.findById(id)
      
      if (!route) {
        throw createError({
          statusCode: 404,
          message: 'Route not found',
        })
      }
      
      // Return complete route data for admin/edit
      return {
        success: true,
        data: route.toObject(), // Returns ALL fields
      }
    } catch (error: any) {
      console.error('Fetch single route error:', error)
      
      if (error.statusCode === 404) {
        throw error
      }
      
      throw createError({
        statusCode: 500,
        message: 'Failed to fetch route',
      })
    }
  }

  // ========== LIST ROUTES (FOR TABLE) ==========
  // Build filter
  const filter: any = {}
  
  if (search && search.trim()) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { slug: { $regex: search, $options: 'i' } },
      { tagline: { $regex: search, $options: 'i' } },
      { shortDescription: { $regex: search, $options: 'i' } },
      { region: { $regex: search, $options: 'i' } }, // ADDED: Search by region too
    ]
  }

  // For admin panel, show all routes
  // For public API, you could filter by isActive here
  if (admin !== 'true') {
    // Public API - only show active routes
    // filter.isActive = true
  }

  const [routes, total] = await Promise.all([
    Route.find(filter)
      // ADDED 'region' to the select fields
      .select('_id name slug tagline shortDescription featuredImage heroImage duration durationMin durationMax startingPrice difficulty isActive isFeatured createdAt region')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Route.countDocuments(filter),
  ])

  return {
    success: true,
    data: routes,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  }
})