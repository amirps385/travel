import mongoose from 'mongoose'

/* -----------------------------
   Sub Schemas (Keep these the same)
----------------------------- */

// Day-by-day itinerary
const ItineraryDaySchema = new mongoose.Schema(
  {
    day: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    altitude: { type: String },
    image: { type: String },
  },
  { _id: false }
)

// Group climb dates
const GroupClimbSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    days: { type: Number, required: true },
    price: { type: Number, required: true },
    groupSize: { type: Number, required: true },
    spotsLeft: { type: Number, required: true },
  },
  { _id: false }
)

// FAQ
const FaqSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
  },
  { _id: false }
)

// Stats cards - UPDATED: bestSeason is an object { from, to, detail }
const RouteStatsSchema = new mongoose.Schema(
  {
    startingAltitude: { value: String, detail: String },
    maxAltitude: { value: String, detail: String },
    totalDistance: { value: String, detail: String },
    bestSeason: {
      from: { type: String }, // e.g. "January"
      to: { type: String },   // e.g. "March"
      detail: { type: String } // optional note
    },
    acclimatization: { value: String, detail: String },
  },
  { _id: false }
)

/* -----------------------------
   Main Route Schema
----------------------------- */

const RouteSchema = new mongoose.Schema(
  {
    /* BASIC INFO */
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    tagline: { type: String },
    shortDescription: { type: String },
    description: { type: String, required: true },

    /* LOCATION */
    region: {
      type: String,
      enum: [
        'Kilimanjaro',
        'Serengeti',
        'Ngorongoro',
        'Tarangire',
        'Lake Manyara',
        'Mount Meru',
        'Zanzibar',
        'Selous',
        'Ruaha',
        'Mafia Island',
        'Other'
      ],
      default: 'Kilimanjaro'
    },

    /* IMAGES */
    featuredImage: { type: String },
    heroImage: { type: String },

    /* KEY INFO */
    duration: { type: String },
    durationMin: { type: Number },
    durationMax: { type: Number },
    startingPrice: { type: Number },
    difficulty: {
      type: String,
      enum: ['Easy', 'Moderate', 'Challenging', 'Very Challenging'],
      required: true,
    },
    successRate: { type: String },

    /* HIGHLIGHTS */
    highlights: [{ type: String }],

    /* WHAT'S INCLUDED */
    whatsIncluded: {
      included: [{ type: String }],
      notIncluded: [{ type: String }],
      note: { type: String }
    },

    /* STATS */
    stats: RouteStatsSchema,

    /* ITINERARY */
    itinerary: [ItineraryDaySchema],

    /* GROUP CLIMBS */
    groupClimbs: [GroupClimbSchema],

    /* GALLERY */
    gallery: [{ type: String }],

    /* FAQ */
    faqs: [FaqSchema],

    /* SEO */
    seo: {
      title: String,
      description: String,
      keywords: [String],
    },

    /* ADMIN CONTROLS */
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },

  },
  {
    timestamps: true,
  }
)

export default mongoose.models.Route ||
  mongoose.model('Route', RouteSchema)
