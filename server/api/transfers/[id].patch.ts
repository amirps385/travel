import { defineEventHandler, readBody } from 'h3'
import { connectDB } from '../../utils/mongoose'
import Transfer from '../../models/Transfer'

export default defineEventHandler(async (event) => {
  await connectDB()

  const id = event.context.params?.id
  const body = await readBody(event)

  const transfer = await Transfer.findByIdAndUpdate(id, body, {
    new: true
  }).lean()

  if (!transfer) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Transfer not found'
    })
  }

  return transfer
})
