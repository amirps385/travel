// server/api/zanzibar/index.post.ts
import { defineEventHandler, createError, readBody } from 'h3'
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

  const body = await readBody(event) as any

  if (!body || !body.slug || !body.title) {
    throw createError({ statusCode: 400, statusMessage: 'slug and title are required' })
  }

  // Ensure slug is unique
  const existing = await Zanzibar.findOne({ slug: body.slug })
  if (existing) {
    throw createError({ statusCode: 409, statusMessage: 'Slug already exists' })
  }

  const doc = await Zanzibar.create(body)
  return { success: true, data: doc }
})
