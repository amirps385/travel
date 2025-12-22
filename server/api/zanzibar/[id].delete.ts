// server/api/zanzibar/[id].delete.ts
import { defineEventHandler, createError } from 'h3'
import Zanzibar from '../../models/Zanzibar'
import { connectDB } from '../../utils/mongoose'

async function requireApiKeyIfSet(event: any) {
  const config = useRuntimeConfig()
  const required = config.adminApiKey
  if (required) {
    const provided = event.node.req.headers['x-api-key'] || event.node.req.headers['X-API-KEY']
    if (!provided || provided !== required) {
      throw createError({ statusCode: 401, statusMessage: 'Unauthorized: invalid API key' })
    }
  }
}

export default defineEventHandler(async (event) => {
  await requireApiKeyIfSet(event)
  await connectDB()

  const id = event.context?.params?.id as string | undefined
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'ID parameter is required' })
  }

  const doc = await Zanzibar.findByIdAndDelete(id).lean()
  if (!doc) {
    throw createError({ statusCode: 404, statusMessage: 'Experience not found' })
  }

  return { success: true, data: doc }
})
