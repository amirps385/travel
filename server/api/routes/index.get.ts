import Route from '../../models/Route'
import { connectDB } from '../../utils/mongoose'

export default defineEventHandler(async (event) => {
  await connectDB()

  const query = getQuery(event)
  const search = query.search as string
  const page = parseInt(query.page as string) || 1
  const limit = parseInt(query.limit as string) || 20
  const skip = (page - 1) * limit

  // Build filter for admin panel (show all routes)
  const filter: any = {}
  
  if (search && search.trim()) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { slug: { $regex: search, $options: 'i' } },
      { tagline: { $regex: search, $options: 'i' } },
      { shortDescription: { $regex: search, $options: 'i' } },
    ]
  }

  const [routes, total] = await Promise.all([
    Route.find(filter)
      .select('name slug tagline shortDescription featuredImage heroImage duration difficulty startingPrice isActive isFeatured createdAt')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Route.countDocuments(filter)
  ])

  return {
    success: true,
    data: routes,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    }
  }
})