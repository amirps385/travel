import mongoose from 'mongoose'

const { Schema, models, model } = mongoose

const ActivitySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    type: {
      type: String,
      default: ''
    },
    timeOfDay: {
      type: String,
      default: ''
    },
    costUSD: {
      type: Number,
      default: 0
    },
    durationMinutes: {
      type: Number,
      default: 60
    },
    location: {
      type: String,
      default: ''
    },
    priorityPercent: {
      type: Number,
      default: 50
    },
    code: {
  type: String,
  trim: true,
  unique: true,
  sparse: true,   // <– important
  default: undefined
},

    description: {
      type: String,
      default: ''
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
)

export default models.Activity || model('Activity', ActivitySchema)
