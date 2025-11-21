import { defineEventHandler } from 'h3'
import { connectDB } from '../../utils/mongoose'
import City from '../../models/City'

export default defineEventHandler(async (event) => {
  await connectDB()

  const id = event.context.params?.id
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'City id is required'
    })
  }

  await City.findByIdAndDelete(id)
  return { success: true }
})
