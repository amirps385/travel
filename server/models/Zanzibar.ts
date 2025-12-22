// server/models/Zanzibar.ts
import mongoose, { Schema } from 'mongoose'

const ItineraryStepSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, default: '' }
  },
  { _id: false }
)

const FAQSchema = new Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true }
  },
  { _id: false }
)

const ZanzibarSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    type: { type: String, required: true }, // e.g. Excursion / Stay / Combo
    region: { type: String, required: true },
    durationLabel: { type: String },
    priceFrom: { type: Number },
    tagline: { type: String },
    description: { type: String },
    highlights: { type: [String], default: [] },
    itinerary: { type: [ItineraryStepSchema], default: [] },
    included: { type: [String], default: [] },
    excluded: { type: [String], default: [] },
    faqs: { type: [FAQSchema], default: [] },
    heroImage: { type: String },
    gallery: { type: [String], default: [] },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
)

const modelName = 'Zanzibar'
export default (mongoose.models[modelName] ||
  mongoose.model(modelName, ZanzibarSchema))
