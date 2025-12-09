// server/api/tours/index.post.ts
import { defineEventHandler, readBody } from 'h3'
import { connectDB } from '../../utils/mongoose'
import Tour from '../../models/Tour'

export default defineEventHandler(async (event) => {
  console.log('✅ POST /api/tours handler is being executed')
  await connectDB()
  
  try {
    const body = await readBody(event)
    
    // Basic validation
    if (!body || !body.title || !body.slug) {
      return { 
        success: false, 
        message: 'Missing required fields (title, slug)' 
      }
    }
    
    const created = await Tour.create(body)
    return { 
      success: true, 
      data: created 
    }
  } catch (err: any) {
    console.error('[POST /api/tours] error:', err)
    
    // Handle duplicate slug error
    if (err.code === 11000) {
      return {
        success: false,
        message: 'A tour with this slug already exists'
      }
    }
    
    return {
      success: false,
      message: err.message || 'Server error'
    }
  }
})