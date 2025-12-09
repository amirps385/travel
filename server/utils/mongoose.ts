// server/utils/mongoose.ts
import mongoose from 'mongoose'

let isConnected = false

export async function connectDB() {
  if (isConnected) {
    return mongoose
  }

  const config = useRuntimeConfig()
  const uri = config.mongodbUri
  
  if (!uri) {
    throw new Error('MONGODB_URI is not defined in runtimeConfig')
  }

  try {
    await mongoose.connect(uri)
    isConnected = true
    console.log('✅ MongoDB connected')
    return mongoose
  } catch (err: any) {
    console.error('❌ MongoDB connection error:', err)
    throw err
  }
}