import { defineEventHandler } from 'h3'
import { connectDB } from '../../utils/mongoose'
import Transfer from '../../models/Transfer'

export default defineEventHandler(async (event) => {
  await connectDB()

  const id = event.context.params?.id
  await Transfer.findByIdAndDelete(id)

  return { success: true }
})
