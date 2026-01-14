import mongoose from 'mongoose'
const { Schema } = mongoose

// Small slug helper to avoid adding an external dependency.
// Produces a lower-case, ascii-ish, hyphen-separated slug, max length 140.
function makeSlug(input: string): string {
  if (!input) return ''
  // Normalize to NFKD to split accents, remove non-word, replace spaces with dashes
  const s = input
    .toString()
    .normalize('NFKD')                // decompose accented characters
    .replace(/[\u0300-\u036f]/g, '')  // remove diacritics
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')     // remove invalid chars
    .trim()
    .replace(/\s+/g, '-')             // collapse whitespace to single dash
    .replace(/-+/g, '-')              // collapse multiple dashes
  return s.slice(0, 140)
}

/***************************
 * Organizer subdocument
 ***************************/
const OrganizerSchema = new Schema(
  {
    id: { type: Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, default: '' },
    contact: { type: String, default: '' },
    email: { type: String, default: '' }
  },
  { _id: false }
)

/***************************
 * Itinerary Day Schema (NEW)
 ***************************/
const ItineraryDaySchema = new Schema(
  {
    day: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    activities: [{ type: String }],
    dayType: { 
      type: String, 
      enum: ['arrival', 'acclimatization', 'trekking', 'summit', 'descent', 'departure', 'rest', 'cultural', ''], 
      default: '' 
    },
    startElevation: { type: Number, default: null },
    endElevation: { type: Number, default: null },
    distance: { type: Number, default: null },
    hikingTime: { type: Number, default: null },
    // CHANGE THESE FROM STRINGS TO ARRAYS:
    accommodations: [{ type: String }], // Changed from 'accommodation' string
    meals: [{ type: String }] // Changed from 'meals' string
  },
  { _id: false }
)

/***************************
 * Main GroupClimb schema
 ***************************/
const GroupClimbSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, unique: true },

    // optional refs
    routeId: { type: Schema.Types.ObjectId, ref: 'Route', default: null },
    tourId: { type: Schema.Types.ObjectId, ref: 'Tour', default: null },

    // categories & tags - CHANGED TO STRINGS
    categoryIds: [{ type: String }], // Changed from ObjectId to String
    tags: [{ type: String }],

    // NEW: Route and Difficulty as strings
    route: { type: String, default: '' },
    difficulty: { type: String, default: '' },

    // schedule
    startDate: { type: Date, required: true }, // stored as UTC
    endDate: { type: Date },
    durationDays: { type: Number, default: 0 },

    // capacity & price
    maxGroupSize: { type: Number, default: 8, min: 1 },
    seatsBooked: { type: Number, default: 0, min: 0 },
    price: { type: Number, default: 0, min: 0 },
    currency: { type: String, default: 'USD' },
    depositAmount: { type: Number, default: 0, min: 0 },

    // availability / status
    status: {
      type: String,
      enum: ['upcoming', 'open', 'ongoing', 'completed', 'cancelled'],
      default: 'upcoming'
    },
    isPublic: { type: Boolean, default: true },

    // content
    shortDescription: { type: String, default: '' },
    description: { type: String, default: '' },
    // CHANGED: itinerarySummary replaced with structured itinerary
    itinerary: [ItineraryDaySchema], // New structured itinerary
    itinerarySummary: { type: String, default: '' }, // KEEPING THIS FOR BACKWARD COMPATIBILITY
    included: [{ type: String }],
    notIncluded: [{ type: String }],
    gallery: [{ type: String }],

    // meeting / logistics
    meetingPoint: { type: String, default: '' },
    meetingTime: { type: String, default: '' },

    // organizer info
    organizer: OrganizerSchema,

    // admin bookkeeping
    createdBy: { type: String },
    updatedBy: { type: String },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },

    // bookings (optional relation)
    bookingIds: [{ type: Schema.Types.ObjectId, ref: 'Booking' }],

    // misc
    metadata: { type: Schema.Types.Mixed },
    isDeleted: { type: Boolean, default: false }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

/***************************
 * Virtuals & indexes
 ***************************/
// spotsLeft virtual
GroupClimbSchema.virtual('spotsLeft').get(function (this: any) {
  const max = typeof this.maxGroupSize === 'number' ? this.maxGroupSize : 0
  const booked = typeof this.seatsBooked === 'number' ? this.seatsBooked : 0
  const left = max - booked
  return left >= 0 ? left : 0
})

// Indexes
GroupClimbSchema.index({ title: 'text', shortDescription: 'text', description: 'text' })
GroupClimbSchema.index({ startDate: 1 })
GroupClimbSchema.index({ routeId: 1 })
GroupClimbSchema.index({ categoryIds: 1 })
GroupClimbSchema.index({ route: 1 }) // New index
GroupClimbSchema.index({ difficulty: 1 }) // New index

/***************************
 * Pre-validate slug generation
 ***************************/
GroupClimbSchema.pre('validate', function (next) {
  try {
    // only create slug when not provided
    // prefer title + date to make slug more unique
    if ((!this.slug || String(this.slug).trim() === '') && this.title) {
      const datePart = this.startDate ? new Date(this.startDate).toISOString().slice(0, 10) : ''
      this.slug = makeSlug(`${this.title} ${datePart}`)
    } else if (this.slug && typeof this.slug === 'string') {
      // sanitize provided slug
      this.slug = makeSlug(this.slug)
    }
  } catch (err) {
    // swallow - mongoose will raise validation errors if slug is still invalid
  }
  next()
})

/***************************
 * Static helpers
 ***************************/
interface FetchOpts {
  routeId?: any
  categoryId?: any
  from?: Date
}
;(GroupClimbSchema.statics as any).fetchUpcoming = function (opts: FetchOpts = {}) {
  const now = new Date()
  const q: any = { isDeleted: false }
  if (opts.routeId) q.routeId = opts.routeId
  if (opts.categoryId) q.categoryIds = opts.categoryId
  q.startDate = { $gte: opts.from || now }
  return this.find(q).sort({ startDate: 1 }).lean()
}

/***************************
 * Export model (single file)
 ***************************/
const GroupClimb =
  (mongoose.models && (mongoose.models as any).GroupClimb) ||
  mongoose.model('GroupClimb', GroupClimbSchema)

export default GroupClimb