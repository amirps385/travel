// server/models/User.ts
import mongoose from 'mongoose'

const NotificationSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    data: { type: mongoose.Schema.Types.Mixed }, // optional payload
    read: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
  },
  { _id: true }
)

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
   role: { 
  type: String, 
  default: 'content-manager',
  enum: [
    'superadmin',
    'admin', 
    'content-manager',
    'lead-manager',
    'itinerary-planner'
  ],
  required: true 
}, 
    passwordHash: { type: String }, // optional for now
    isActive: { type: Boolean, default: true },
    avatar: { type: String }, // data URL or remote URL (optional)
    notifications: { type: [NotificationSchema], default: [] },
    meta: { type: mongoose.Schema.Types.Mixed }
  },
  { timestamps: true }
)

export default mongoose.models.User || mongoose.model('User', UserSchema)
