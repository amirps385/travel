import mongoose from 'mongoose'

let cached: typeof mongoose | null = null

export async function connectDB() {
  if (cached) return cached

  const config = useRuntimeConfig()
  const uri = config.mongodbUri

  if (!uri) {
    throw new Error('MONGODB_URI is not defined in runtimeConfig')
  }

  if (mongoose.connection.readyState === 1) {
    cached = mongoose
    return mongoose
  }

  await mongoose.connect(uri)
  cached = mongoose
  return mongoose
}
