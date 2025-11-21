import mongoose from 'mongoose'

const LeadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    originCity: String,

    activities: [String],
    days: Number,
    who: String,
    date: String, // keep as string from form for now
    travellers: Number,
    ages: [Number],
    genders: [String],

    budget: Number, // per person (USD)

    status: { type: String, default: 'new' } // new | in-progress | closed
  },
  {
    timestamps: true // createdAt, updatedAt
  }
)

// Important: use mongoose.models to avoid recompiling model in dev/HMR
export default mongoose.models.Lead || mongoose.model('Lead', LeadSchema)
