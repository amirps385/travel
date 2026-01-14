import { defineEventHandler, getHeader } from 'h3'
import { connectDB } from '../../utils/mongoose'
import Accommodation from '../../models/Accommodation'
import mongoose from 'mongoose'

export default defineEventHandler(async (event) => {
  // Diagnostic logging to help trace what's arriving at the server
  try {
    console.log('--- /api/accommodations/[slug].get called ---')
    console.log('event.node.req.url:', event.node?.req?.url)
    console.log('event.context.params:', event.context?.params)
    console.log('request headers (partial):', {
      host: event.node?.req?.headers?.host,
      origin: event.node?.req?.headers?.origin,
      admin: event.node?.req?.headers?.admin
    })
  } catch (logErr) {
    console.warn('Logging failed in [slug].get.ts', logErr)
  }

  const db = await connectDB()
  if (!db) return { ok: false, error: 'Database connection failed' }

  try {
    // Prefer route param, but fallback to taking the last path segment from the raw URL
    let slugOrId = event.context?.params?.slug
    if (!slugOrId) {
      // Fallback: parse from request url (e.g. /api/accommodations/<slug-or-id>)
      const rawUrl = (event.node && event.node.req && event.node.req.url) ? String(event.node.req.url) : ''
      const parts = rawUrl.split('/').filter(Boolean)
      // last segment should be the id/slug — but guard against query strings
      if (parts.length > 0) {
        const last = parts[parts.length - 1]
        slugOrId = last ? last.split('?')[0] : ''
      }
      console.log('Fallback extraction of slugOrId from URL ->', slugOrId)
    }

    if (!slugOrId) {
      console.warn('No slugOrId found after fallback')
      return { ok: false, error: 'Slug or ID is required' }
    }

    console.log('Resolved slugOrId:', slugOrId)

    let accommodation = null

    // Check if the parameter looks like a MongoDB ObjectId (24 hex chars)
    const looksLikeObjectId = /^[0-9a-fA-F]{24}$/.test(slugOrId)
    console.log('Looks like ObjectId?', looksLikeObjectId)

    if (looksLikeObjectId && mongoose.Types.ObjectId.isValid(slugOrId)) {
      console.log('Searching by ID:', slugOrId)
      accommodation = await Accommodation.findById(slugOrId).lean()
    } else {
      console.log('Searching by slug:', slugOrId)
      // Check for admin header (case-insensitive)
      const isAdminRequest = getHeader(event, 'admin') === 'true' || (event.node?.req?.headers?.admin === 'true')
      console.log('Is admin request?', isAdminRequest)

      if (isAdminRequest) {
        // Admin can see all accommodations regardless of published state
        accommodation = await Accommodation.findOne({ slug: slugOrId }).lean()
      } else {
        // Public access - only published, non-deleted accommodations
        accommodation = await Accommodation.findOne({
          slug: slugOrId,
          isDeleted: false,
          isPublic: true
        }).lean()
      }
    }

    console.log('Found accommodation?', !!accommodation)

    if (!accommodation) {
      return { ok: false, error: 'Accommodation not found' }
    }

    // Format response data the same as before
    const {
      _id, name, slug: accommodationSlug, city, park, country,
      type, category, starRating, description, highlights, amenities,
      images, videos, address, geo, contact, rooms, minPrice, maxPrice,
      policies, seo, isPublic, isDeleted, createdAt, updatedAt
    } = accommodation

    const responseData = {
      _id,
      name,
      slug: accommodationSlug,
      city,
      park,
      country,
      type,
      category,
      starRating,
      description,
      highlights,
      amenities,
      images,
      videos,
      address,
      geo,
      contact,
      rooms,
      minPrice,
      maxPrice,
      policies,
      seo,
      isPublic,
      isDeleted,
      createdAt,
      updatedAt
    }

    return {
      ok: true,
      data: responseData
    }
  } catch (error: any) {
    console.error('Get accommodation error:', error)
    return {
      ok: false,
      error: error.message || 'Failed to fetch accommodation'
    }
  }
})
