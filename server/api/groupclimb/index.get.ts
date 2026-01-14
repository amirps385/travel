// server/api/groupclimb/index.get.ts
import { defineEventHandler } from 'h3'
import { connectDB } from '../../utils/mongoose'
import GroupClimb from '../../models/GroupClimb'

export default defineEventHandler(async (event) => {
  await connectDB()

  try {
    const url = new URL(event.node.req.url || '', `http://${event.node.req.headers.host || 'localhost'}`)
    const q = url.searchParams.get('q') || ''
    
    // Build query
    const query: any = { isDeleted: false }
    
    if (q) {
      query.$or = [
        { title: { $regex: q, $options: 'i' } },
        { shortDescription: { $regex: q, $options: 'i' } },
        { 'organizer.name': { $regex: q, $options: 'i' } }
      ]
    }
    
    // Get all group climbs
    const climbs = await GroupClimb.find(query)
      .sort({ startDate: 1 })
      .lean()
    
    return {
      ok: true,
      data: climbs
    }
    
  } catch (error: any) {
    console.error('Error fetching group climbs:', error)
    return {
      ok: false,
      error: error.message || 'Failed to fetch group climbs'
    }
  }
})