// server/api/routes/[slug].get.ts
import Route from '../../models/Route'
import { connectDB } from '../../utils/mongoose'
import { getQuery } from 'h3' // if not available, getQuery from Nitro/Nuxt helper

export default defineEventHandler(async (event) => {
  await connectDB()

  try {
    // Primary: route params (expected)
    let slug = event.context?.params?.slug

    // Secondary: ?slug= in query (possible if someone called API like /api/routes?slug=foo)
    if (!slug) {
      const q = getQuery(event)
      if (q && q.slug) {
        slug = Array.isArray(q.slug) ? q.slug[0] : q.slug
        console.warn('⚠️ [slug].get.ts - slug found in query:', slug)
      }
    }

    // Tertiary fallback: try to extract last path segment from request URL (dev/internal calls sometimes lack params)
    if (!slug) {
      const rawUrl =
        // H3 / Nitro
        event.node?.req?.url ||
        // older shapes
        event.req?.url ||
        ''
      if (rawUrl) {
        // strip query string and trailing slash
        const pathOnly = rawUrl.split('?')[0].replace(/\/+$/, '')
        const parts = pathOnly.split('/')
        const last = parts[parts.length - 1] || ''
        if (last) {
          // decode in case the slug was encoded
          try {
            slug = decodeURIComponent(last)
            console.warn('⚠️ [slug].get.ts - slug extracted from URL fallback:', slug, ' (rawUrl:', rawUrl, ')')
          } catch (e) {
            slug = last
            console.warn('⚠️ [slug].get.ts - slug fallback (no decode):', slug)
          }
        }
      }
    }

    // Final guard
    if (!slug) {
      throw createError({
        statusCode: 400,
        message: 'Slug parameter is required',
      })
    }

    // normalize
    slug = String(slug).trim()

    console.log('🔍 API called with slug:', slug)

    // Try to find the route (only active routes for public)
    const route = await Route.findOne({
      slug: slug,
      isActive: true,
    })

    if (!route) {
      // Additional debug: check if route exists but is inactive
      const anyRoute = await Route.findOne({ slug: slug })
      if (anyRoute) {
        console.log('⚠️ Route exists but isActive is:', anyRoute.isActive)
      }

      throw createError({
        statusCode: 404,
        message: `Route "${slug}" not found or is inactive`,
      })
    }

    return {
      success: true,
      data: route,
    }
  } catch (error: any) {
    // preserve 4xx/5xx from thrown createError
    console.error('❌ Error in [slug].get.ts:', error)
    if (error.statusCode === 404 || error.statusCode === 400) {
      throw error
    }
    throw createError({
      statusCode: 500,
      message: 'Server error: ' + (error?.message || 'unknown'),
    })
  }
})
