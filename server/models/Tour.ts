// server/models/Tour.ts
import mongoose, { Document, Model } from 'mongoose'

/**
 * ITour - Tour document interface
 */
export interface ITour extends Document {
  title: string
  slug: string
  overview?: string
  price?: number
  nights?: number
  duration?: number
  highlights: string[]
  activities: string[]
  keyLocations: string[]
  featuredImage?: string
  images: string[]
  isActive: boolean
  route?: string
  type?: string
  bestTime?: string
  difficulty?: string
  groupSize?: { min?: number; max?: number }
  ageRange?: string
  itinerary: Array<{
    day?: number
    title?: string
    description?: string
    activities?: string[]
  }>
  createdAt: Date
  updatedAt: Date
}

const ItineraryDaySchema = new mongoose.Schema({
  day: { type: Number },
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  activities: { type: [String], default: [] }
}, { _id: false })

const TourSchema = new mongoose.Schema<ITour>({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, trim: true, lowercase: true },

  overview: { type: String, default: '' },
  price: { type: Number, default: 0 },

  // nights and duration
  nights: { type: Number, default: null },
  duration: { type: Number, default: null },

  // simple arrays
  highlights: { type: [String], default: [] },
  activities: { type: [String], default: [] },
  keyLocations: { type: [String], default: [] },

  // images
  featuredImage: { type: String, default: '' },
  images: { type: [String], default: [] },

  // display/meta fields
  isActive: { type: Boolean, default: true },
  route: { type: String, default: '' },
  type: { type: String, default: '' },
  difficulty: { type: String, default: '' },
  bestTime: { type: String, default: '' },   // e.g. "June - October"
  ageRange: { type: String, default: '' },

  // group size object
  groupSize: {
    min: { type: Number, default: 2 },
    max: { type: Number, default: 12 }
  },

  // structured itinerary
  itinerary: { type: [ItineraryDaySchema], default: [] }

}, {
  timestamps: true,
  // keep strict = true (default) so only defined fields persist
})

// NOTE: do NOT re-declare index if `unique: true` is set on slug above.

const Tour: Model<ITour> = mongoose.models.Tour || mongoose.model<ITour>('Tour', TourSchema)
export default Tour
