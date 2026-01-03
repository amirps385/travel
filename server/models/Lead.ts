// server\models\Lead.ts

import mongoose from 'mongoose'

const EventSchema = new mongoose.Schema(
  {
    type: { type: String, required: true }, // note, call, followup_set, followup_cleared, status_change, task_created, etc.
    at: { type: Date, required: true, default: () => new Date() },
    by: { type: mongoose.Schema.Types.Mixed }, // { name: 'User name' } or string
    note: { type: String },
    status: { type: String },
    reason: { type: String },
    metadata: { type: mongoose.Schema.Types.Mixed },
    updatedBy: String,
    updatedAt: Date,
  },
  { _id: false }
)

const TaskSchema = new mongoose.Schema(
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

const LeadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: '' },
    countryCode: { type: String, default: '' },
    // ADDED COUNTRY FIELD HERE:
    country: { type: String, default: '' },

    // older fields from your schema
    originCity: { type: String, default: '' },
    activities: [{ type: String }],
    days: { type: Number },
    who: { type: String },
    date: { type: String }, // keep form date as string if needed
    travellers: { type: Number },

    // new contact fields
    age: { type: Number }, // single age (if UI uses single)
    ages: [{ type: Number }], // keep array for group ages
    genders: [{ type: String }],

    budget: { type: Number },

    // assignment & users
    assignedToId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    // events/timeline/tasks
    events: [EventSchema],
    tasks: [TaskSchema],

    // follow-up
    nextFollowUpAt: { type: Date },

    // additional meta fields
    status: { type: String, default: 'new' }, // new | working | qualified | unqualified | converted | closed
    priority: { type: String, default: 'medium' }, // low|medium|high|very-high
    priorityUpdatedAt: { type: Date },
    priorityUpdatedBy: { type: String },
    

    // source details
    source: { type: String },
    leadSourceDetail: { type: String },
    utm: { type: mongoose.Schema.Types.Mixed },

    documents: [{ name: String, url: String, uploadedAt: Date, uploadedBy: String }],

    // who last updated
    updatedBy: { type: String },

  },
  {
    timestamps: true // createdAt, updatedAt
  }
)

export default mongoose.models.Lead || mongoose.model('Lead', LeadSchema)