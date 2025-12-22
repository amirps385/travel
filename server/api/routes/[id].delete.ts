import Route from '../../models/Route'
import { connectDB } from '../../utils/mongoose'

export default defineEventHandler(async (event) => {
  await connectDB()

  const id = event.context.params?.id

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
})
