import Lead from '../../models/Lead'
import { connectDB } from '../../utils/mongoose'

export default defineEventHandler(async (event) => {
  const params = event.context.params || {}
  const id = params.id
  const body = await readBody(event)

  await connectDB()

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing lead id'
    })
  }

  const allowedStatuses = ['new', 'in-progress', 'closed']
  const status = body.status

  if (!allowedStatuses.includes(status)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid status value'
    })
  }

  const lead = await Lead.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  ).lean()

  if (!lead) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Lead not found'
    })
  }

  return lead
})
