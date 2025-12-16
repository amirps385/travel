// server/models/Park.ts
import mongoose from 'mongoose'

const ParkSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Park name is required'], trim: true },
    slug: { type: String, required: [true, 'Slug is required'], unique: true, lowercase: true, trim: true },
    shortDescription: { type: String, required: [true, 'Short description is required'], trim: true },
    description: { type: String, required: [true, 'Description is required'], trim: true },

    featuredImage: { type: String, default: '' },
    gallery: [{ type: String }],

    region: { type: String, required: [true, 'Region is required'], trim: true },
    location: { type: String, required: [true, 'Location is required'], trim: true },
    category: { type: String, required: [true, 'Category is required'], trim: true },

    areaKm2: { type: Number, min: 0 },
    establishedYear: { type: Number, min: 1800, max: new Date().getFullYear() },

    wildlifeHighlights: [{ type: String, trim: true }],
    activities: [{ type: String, trim: true }],

    bestTimeToVisit: {
      from: { type: String, trim: true },
      to: { type: String, trim: true },
      notes: { type: String, trim: true }
    },

    climate: { type: String, trim: true },
    landscape: { type: String, trim: true },

    seo: {
      title: { type: String, trim: true },
      description: { type: String, trim: true },
      keywords: [{ type: String, trim: true }]
    },

    isFeatured: { type: Boolean, default: false },
    order: { type: Number, default: 0, min: 0 },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
)

ParkSchema.index({ isActive: 1, order: 1 })
ParkSchema.index({ region: 1 })
ParkSchema.index({ category: 1 })

const Park = (mongoose.models.Park as mongoose.Model<any>) || mongoose.model('Park', ParkSchema)

export default Park
