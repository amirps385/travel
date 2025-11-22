import mongoose from 'mongoose'

const { Schema, model, models } = mongoose

const DayActivitySchema = new Schema(
  {
    activityId: {
      type: Schema.Types.ObjectId,
      ref: 'Activity',
      required: true
    },
    notes: {
      type: String,
      trim: true
    }
  },
  { _id: false }
)

const DaySchema = new Schema(
  {
    dayNumber: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      trim: true
    },
    notes: {
      type: String,
      trim: true
    },
    activities: {
      type: [DayActivitySchema],
      default: []
    }
  },
  { _id: false }
)

const SelectedHotelSchema = new Schema(
  {
    hotelId: {
      type: Schema.Types.ObjectId,
      ref: 'Hotel',
      required: true
    },
    nights: {
      type: Number,
      default: 1
    },
    notes: {
      type: String,
      trim: true
    }
  },
  { _id: false }
)

const ItinerarySchema = new Schema(
  {
    leadId: {
      type: Schema.Types.ObjectId,
      ref: 'Lead',
      required: true
    },

    title: {
      type: String,
      required: true,
      trim: true
    },

    slug: {
      type: String,
      unique: true,
      index: true
    },

    status: {
  type: String,
  enum: ['draft', 'pending', 'sent', 'confirmed', 'cancelled'],
  default: 'pending'
},


    guestName: String,
    guestEmail: String,
    phone: String,

    travellers: Number,

    travelDate: Date,

    // total number of days
    daysCount: {
      type: Number,
      default: 1
    },

    // array of day objects
    days: {
      type: [DaySchema],
      default: []
    },

    selectedHotels: {
      type: [SelectedHotelSchema],
      default: []
    },

    budgetPerPerson: Number
  },
  {
    timestamps: true
  }
)

const Itinerary =
  models.Itinerary || model('Itinerary', ItinerarySchema)

export default Itinerary
