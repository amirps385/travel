import Route from '../../models/Route'
import { connectDB } from '../../utils/mongoose'

function normalizeBestSeason(input: any) {
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
  
  const id = event.context.params?.id
  
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Route ID is required',
    })
  }

  try {
    const body = await readBody(event)

    // Remove _id from body if present (can't update _id)
    if (body._id) {
      delete body._id
    }

    // Normalize stats.bestSeason if present, and ensure stats exists
    if (body.stats) {
      body.stats = body.stats || {}
      body.stats.startingAltitude = body.stats.startingAltitude || { value: '', detail: '' }
      body.stats.maxAltitude = body.stats.maxAltitude || { value: '', detail: '' }
      body.stats.totalDistance = body.stats.totalDistance || { value: '', detail: '' }
      body.stats.acclimatization = body.stats.acclimatization || { value: '', detail: '' }
      body.stats.bestSeason = normalizeBestSeason(body.stats.bestSeason)
    }

    // Update route
    const updatedRoute = await Route.findByIdAndUpdate(
      id,
      {
        ...body,
        updatedAt: new Date(),
      },
      {
        new: true,
        runValidators: true,
      }
    )

    if (!updatedRoute) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Route not found',
      })
    }

    return {
      success: true,
      message: 'Route updated successfully',
      data: updatedRoute,
    }
  } catch (error: any) {
    console.error('Update route error:', error)
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err: any) => err.message)
      throw createError({
        statusCode: 400,
        message: `Validation failed: ${messages.join(', ')}`,
      })
    }
    
    // Handle duplicate slug error
    if (error.code === 11000) {
      throw createError({
        statusCode: 400,
        message: 'A route with this slug already exists',
      })
    }
    
    // If error already has statusCode, rethrow it
    if (error.statusCode) {
      throw error
    }
    
    throw createError({
      statusCode: 500,
      message: 'Failed to update route',
    })
  }
})
