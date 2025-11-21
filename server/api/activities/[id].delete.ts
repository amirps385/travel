import Activity from '../../models/Activity'
import { connectDB } from '../../utils/mongoose'

export default defineEventHandler(async (event) => {
  await connectDB()

  const id = event.context.params?.id

  const result = await Activity.deleteOne({ _id: id })
  if (result.deletedCount === 0) {
    throw createError({ statusCode: 404, statusMessage: 'Activity not found' })
  }

  return { success: true }
})
