// server/models/Tour.ts - SIMPLIFIED VERSION
import mongoose from 'mongoose'

const { Schema, model, models } = mongoose

const TourSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  duration: { type: Number },
  price: { type: Number },
  overview: { type: String },
  highlights: { type: [String], default: [] },
  route: { type: String },
  images: { type: [String], default: [] },
}, {
  timestamps: true,
})

// Simple export - no complex type casting
const Tour = models.Tour || model('Tour', TourSchema)
export default Tour