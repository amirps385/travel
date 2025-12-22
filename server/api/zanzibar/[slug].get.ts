// server/api/zanzibar/[slug].get.ts
import { defineEventHandler, createError } from 'h3'
import Zanzibar from '../../models/Zanzibar'
import { connectDB } from '../../utils/mongoose'

export default defineEventHandler(async (event) => {
  const slug = event.context?.params?.slug as string | undefined
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Slug parameter is required' })
  }

  await connectDB()

  const doc = await Zanzibar.findOne({ slug, isActive: true }).lean()
  if (!doc) {
    throw createError({ statusCode: 404, statusMessage: `Experience "${slug}" not found` })
  }

  return { success: true, data: doc }
})
