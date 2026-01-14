// server/api/groupclimb/[id].delete.ts
import { defineEventHandler } from 'h3'
import { connectDB } from '../../utils/mongoose'
import GroupClimb from '../../models/GroupClimb'

export default defineEventHandler(async (event) => {
  await connectDB()
  const id = event.context?.params?.id
  if (!id) return { ok: false, error: 'id required' }
  
  const groupClimb = await GroupClimb.findOne({ _id: id, isDeleted: false })
  if (!groupClimb) return { ok: false, error: 'Group climb not found' }

  if (groupClimb.seatsBooked > 0) {
    return { ok: false, error: 'Cannot delete group climb with active bookings' }
  }

  groupClimb.isDeleted = true
  await groupClimb.save()

  return { ok: true }
})