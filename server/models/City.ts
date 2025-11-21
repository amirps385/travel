import mongoose from 'mongoose'

const CitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true
    }
  },
  { timestamps: true }
)

// Important: use default export + mongoose.models to avoid “models not found” errors
const City = mongoose.models.City || mongoose.model('City', CitySchema)

export default City
