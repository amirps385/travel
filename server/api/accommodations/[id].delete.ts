// server/api/accommodations/[id].delete.ts
import { defineEventHandler } from 'h3'
import { connectDB } from '../../utils/mongoose'
import Accommodation from '../../models/Accommodation'

export default defineEventHandler(async (event) => {
  const db = await connectDB()
  if (!db) return { ok: false, error: 'Database connection failed' }
  
  try {
    const id = event.context?.params?.id
    if (!id) {
      return { ok: false, error: 'Accommodation ID is required' }
    }

    const accommodation = await Accommodation.findById(id)
    if (!accommodation) {
      return { ok: false, error: 'Accommodation not found' }
    }

    // Soft delete
    accommodation.isDeleted = true
    await accommodation.save()

    return { 
      ok: true, 
      message: 'Accommodation deleted successfully' 
    }
  } catch (error: any) {
    console.error('Delete accommodation error:', error)
    return { 
      ok: false, 
      error: error.message || 'Failed to delete accommodation' 
    }
  }
})