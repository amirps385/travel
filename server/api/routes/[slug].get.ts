// server/api/routes/[slug].get.ts - FIXED VERSION
import Route from '../../models/Route'
import { connectDB } from '../../utils/mongoose'
import mongoose from 'mongoose'
import { getQuery } from 'h3'

export default defineEventHandler(async (event) => {
  await connectDB()
  
  try {
    // Get the parameter from the URL - FIXED: Check both slug and id
    let param = event.context?.params?.slug || event.context?.params?.id
    
    console.log('🔍 Route handler called with params:', event.context.params)
    console.log('🔍 Using param:', param)
    
    // Get query parameters
    const query = getQuery(event)
    
    // If no param in URL path, check query
    if (!param) {
      if (query?.id) {
        param = Array.isArray(query.id) ? query.id[0] : query.id
      } else if (query?.slug) {
        param = Array.isArray(query.slug) ? query.slug[0] : query.slug
      }
    }
    
    if (!param) {
      throw createError({
        statusCode: 400,
        message: 'Route identifier is required',
      })
    }
    
    param = String(param).trim()
    
    // Check if this is an admin request
    const isAdminRequest = 
      query?.admin === 'true' || 
      query?.mode === 'edit' ||
      event.node.req.headers.referer?.includes('/admin')
    
    let route
    
    // Check if param is a valid MongoDB ObjectId
    if (mongoose.Types.ObjectId.isValid(param)) {
      console.log('🔍 Parameter is ObjectId, fetching by ID')
      // For admin, show all routes regardless of status
      if (isAdminRequest) {
        route = await Route.findById(param)
      } else {
        // For public, only show active routes
        route = await Route.findOne({ 
          _id: param,
          isActive: true 
        })
      }
    } else {
      console.log('🔍 Parameter is slug, fetching by slug')
      // It's a slug
      if (isAdminRequest) {
        route = await Route.findOne({ slug: param })
      } else {
        route = await Route.findOne({ 
          slug: param, 
          isActive: true 
        })
      }
    }
    
    if (!route) {
      throw createError({
        statusCode: 404,
        message: `Route "${param}" not found`,
      })
    }
    
    // Convert to plain object to include all virtuals and remove mongoose metadata
    const routeData = route.toObject()
    
    // Log for debugging
    console.log('✅ Returning route data:', {
      id: routeData._id,
      name: routeData.name,
      highlights: routeData.highlights?.length,
      itinerary: routeData.itinerary?.length,
      gallery: routeData.gallery?.length,
      faqs: routeData.faqs?.length
    })
    
    // Return complete route data
    return {
      success: true,
      data: routeData,
    }
    
  } catch (error: any) {
    console.error('❌ Error fetching route:', {
      error: error.message,
      params: event.context.params,
      query: getQuery(event)
    })
    
    if (error.statusCode === 404 || error.statusCode === 400) {
      throw error
    }
    
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch route: ' + (error?.message || 'Unknown error'),
    })
  }
})