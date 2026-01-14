// server/api/groupclimb/[slug].get.ts
import { defineEventHandler } from 'h3'
import { connectDB } from '../../utils/mongoose'
import GroupClimb from '../../models/GroupClimb'

export default defineEventHandler(async (event) => {
  await connectDB()
  
  const slug = event.context?.params?.slug || (() => {
    const reqUrl = event.node?.req?.url || ''
    const parts = reqUrl.split('/')
    return parts[parts.length - 1]
  })()

  if (!slug || typeof slug !== 'string') {
    return { ok: false, error: 'Slug is required' }
  }

  const groupClimb = await GroupClimb.findOne({ 
    slug, 
    isDeleted: false,
    isPublic: true 
  }).lean()

  if (!groupClimb) {
    return { ok: false, error: 'Group climb not found' }
  }

  const relatedClimbs = await GroupClimb.find({
    _id: { $ne: groupClimb._id },
    categoryIds: { $in: groupClimb.categoryIds || [] },
    startDate: { $gte: new Date() },
    isDeleted: false,
    isPublic: true
  })
  .sort({ startDate: 1 })
  .limit(3)
  .lean()

  return { 
    ok: true, 
    data: groupClimb,
    relatedClimbs 
  }
})