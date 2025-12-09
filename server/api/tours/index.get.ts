// server/api/tours/index.get.ts
import { defineEventHandler } from 'h3'
import { connectDB } from '../../utils/mongoose'
import Tour from '../../models/Tour'

export default defineEventHandler(async (event) => {
  await connectDB()
  
  try {
    const tours = await Tour.find({}).lean().exec()
    return { 
      success: true, 
      data: tours 
    }
  } catch (err: any) {
    console.error('[GET /api/tours] error:', err)
    return { 
      success: false, 
      message: 'Failed to fetch tours', 
      error: err?.message || String(err) 
    }
  }
})