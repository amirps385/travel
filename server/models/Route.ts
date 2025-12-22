import mongoose from 'mongoose'

/* -----------------------------
   Sub Schemas
----------------------------- */

// Day-by-day itinerary
const ItineraryDaySchema = new mongoose.Schema(
  {
    day: { type: Number, required: true },          // Day 1, Day 2...
    title: { type: String, required: true },
    description: { type: String, required: true },
    altitude: { type: String },                     // "2,100m → 2,650m"
    image: { type: String },                        // optional
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

// Stats cards
const RouteStatsSchema = new mongoose.Schema(
  {
    startingAltitude: { value: String, detail: String },
    maxAltitude: { value: String, detail: String },
    totalDistance: { value: String, detail: String },
    bestSeason: { value: String, detail: String },
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
    shortDescription: { type: String },  // Added this
    description: { type: String, required: true },

    /* IMAGES */
    featuredImage: { type: String },  // Added this
    heroImage: { type: String },      // Changed from required to optional

    /* KEY INFO */
    duration: { type: String },                     // "7–8 Days"
    durationMin: { type: Number },                  // Added this
    durationMax: { type: Number },                  // Added this
    startingPrice: { type: Number },                // Added this
    difficulty: {
      type: String,
      enum: ['Easy', 'Moderate', 'Challenging', 'Very Challenging'],
      required: true,
    },
    successRate: { type: String },                   // "95%"

    /* HIGHLIGHTS */
    highlights: [{ type: String }],

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
    timestamps: true, // createdAt, updatedAt
  }
)

export default mongoose.models.Route ||
  mongoose.model('Route', RouteSchema)