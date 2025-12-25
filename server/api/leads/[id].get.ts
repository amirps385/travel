// server/api/leads/[id].get.ts
import Lead from '../../models/Lead'
import User from '../../models/User'
import { connectDB } from '../../utils/mongoose'

export default defineEventHandler(async (event) => {
  await connectDB()

  const params = event.context.params || {}
  const id = params.id

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Missing lead id' })
  }

  try {
    // findById().lean() returns a plain object (or null).
    // Cast to any so TypeScript won't complain when we check assignedToId.
    const lead = (await Lead.findById(id).lean()) as any

    if (!lead) {
      throw createError({ statusCode: 404, statusMessage: 'Lead not found' })
    }

    let assignedTo = null
    if (lead.assignedToId) {
      // safe attempt to resolve assigned user (may return null)
      assignedTo = await User.findById(lead.assignedToId)
        .select('_id name email role')
        .lean()
        .catch(() => null)
    }

    return {
      ...lead,
      assignedTo: assignedTo || null
    }
  } catch (err: any) {
    console.error('Get lead error:', err)
    if (err.statusCode) throw err
    throw createError({ statusCode: 500, statusMessage: 'Failed to fetch lead' })
  }
})
