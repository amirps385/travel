import Route from '../../models/Route'
import { connectDB } from '../../utils/mongoose'

export default defineEventHandler(async (event) => {
  await connectDB()

  const id = event.context.params?.id
  const body = await readBody(event)

  // Remove _id from body if present (can't update _id)
  if (body._id) {
    delete body._id
  }

  const updatedRoute = await Route.findByIdAndUpdate(
    id, 
    { ...body, updatedAt: new Date() },
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
})