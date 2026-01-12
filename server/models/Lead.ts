// server/models/Lead.ts
import mongoose from 'mongoose'

const { Schema } = mongoose

const EventSchema = new Schema(
  {
    type: { type: String, required: true },
    at: { type: Date, required: true, default: () => new Date() },
    by: { type: Schema.Types.Mixed },
    note: { type: String },
    status: { type: String },
    reason: { type: String },
    metadata: { type: Schema.Types.Mixed },
    updatedBy: String,
    updatedAt: Date,
  },
  { _id: false }
)

const TaskSchema = new Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    due: { type: Date },
    note: { type: String },
    status: { type: String, default: 'open' },
    createdAt: { type: Date, default: () => new Date() },
    createdBy: { type: String },
    updatedBy: String,
    updatedAt: Date,
  },
  { _id: false }
)

const LeadSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: '' },
    countryCode: { type: String, default: '' },

    // Contact country (single) — from contact details
    country: { type: String, default: '' },

    // Destination countries (array) — selected destinations like Kenya/Tanzania
    countries: [{ type: String }],

    originCity: { type: String, default: '' },

    // Trip fields
    activities: [{ type: String }],
    days: { type: Number },
    who: { type: String },
    date: { type: String }, // keep as string (ISO or yyyy-mm-dd)
    dateIsMonthOnly: { type: Boolean, default: false },

    // Kilimanjaro route (explicit)
    kilimanjaroRoute: { type: String, default: '' },

    // Traveller counts & ages
    travellers: { type: Number },
    adults: { type: Number, default: 0 },
    children: { type: Number, default: 0 },
    ages: [{ type: Number }], // flattened ages array if needed
    adultAges: [{ type: Number }],
    childAges: [{ type: Number }],
    genders: [{ type: String }],

    // Budget
    budget: { type: Number },

    // Contact preferences
    preferredContactMethod: { type: String, default: '' },
    scheduleCall: { type: Boolean, default: false },
    preferredTime: { type: Date }, // stored as Date when provided
    timezone: { type: String, default: '' },

    // Misc
    message: { type: String, default: '' },

    // Explicit consent field (important for compliance)
    consent: { type: Boolean, default: false },

    // Arbitrary metadata (createdFrom, utm hints, etc)
    metadata: { type: Schema.Types.Mixed, default: {} },

    // assignment & users
    assignedToId: { type: Schema.Types.ObjectId, ref: 'User' },

    // events/timeline/tasks
    events: [EventSchema],
    tasks: [TaskSchema],

    nextFollowUpAt: { type: Date },

    // Status and priority fields
    status: { type: String, default: 'new' },
    priority: { type: String, default: 'medium' },
    priorityUpdatedAt: { type: Date },
    priorityUpdatedBy: { type: String },

    // NEW: Closed date and reason fields
    closedDate: { type: Date },
    closedReason: { type: String },
    closedLostDetails: {
      reasonKey: { type: String },
      reasonLabel: { type: String },
      customReason: { type: String }
    },

    source: { type: String },
    leadSourceDetail: { type: String },

    utm: { type: Schema.Types.Mixed },

    documents: [{ name: String, url: String, uploadedAt: Date, uploadedBy: String }],

    updatedBy: { type: String },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.Lead || mongoose.model('Lead', LeadSchema)
