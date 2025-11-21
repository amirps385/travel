import Lead from '../../models/Lead'
import { connectDB } from '../../utils/mongoose'

export default defineEventHandler(async (event) => {
  const params = event.context.params || {}
  const id = params.id

  await connectDB()

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing lead id'
    })
  }

  const lead = await Lead.findById(id).lean()

  if (!lead) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Lead not found'
    })
  }

  return lead
})
