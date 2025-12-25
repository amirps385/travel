// server/api/routes/[id].delete.ts
import Route from '../../models/Route'
import { connectDB } from '../../utils/mongoose'

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
    const deleted = await Route.findByIdAndDelete(id)
    
    if (!deleted) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Route not found',
      })
    }

    return {
      success: true,
      message: 'Route deleted successfully',
    }
  } catch (error: any) {
    console.error('Delete route error:', error)
    
    if (error.statusCode === 404 || error.statusCode === 400) {
      throw error
    }
    
    throw createError({
      statusCode: 500,
      message: 'Failed to delete route',
    })
  }
})