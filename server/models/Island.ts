// server/models/Island.ts
import mongoose from 'mongoose'

const IslandSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true, index: true },
  shortDescription: { type: String },
  description: { type: String },
  region: { type: String },
  areaKm2: { type: Number },
  establishedYear: { type: Number },
  featuredImage: { type: String },        // url (e.g. /uploads/islands/xxx.jpg)
  gallery: { type: [String], default: [] }, // array of urls
  isActive: { type: Boolean, default: true },
  metadata: { type: Object, default: {} }
}, { timestamps: true })

export default (mongoose.models?.Island as mongoose.Model<any>) ||
  mongoose.model('Island', IslandSchema)
