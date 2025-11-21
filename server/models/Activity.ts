import mongoose from 'mongoose'

const ActivitySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },      // "Morning game drive"
    type: { type: String, default: '' },         // "Safari", "City tour", etc.
    timeOfDay: { type: String, default: '' },    // "Morning", "Full Day", etc.
    costUSD: { type: Number, default: 0 },       // total cost in USD
    durationMinutes: { type: Number, default: 0 },
    location: { type: String, default: '' },     // destination/city
    priorityPercent: { type: Number, default: 50 }, // 0–100
    code: { type: String, default: '' },         // optional internal code
    description: { type: String, default: '' },
    isActive: { type: Boolean, default: true }
  },
  {
    timestamps: true
  }
)

// Re-use model in dev to avoid OverwriteModelError
export default mongoose.models.Activity ||
  mongoose.model('Activity', ActivitySchema)
