// server/models/User.ts
import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, default: 'admin' }, // e.g. superadmin, admin, lead-manager
    passwordHash: { type: String }, // optional for now
    meta: { type: mongoose.Schema.Types.Mixed }
  },
  { timestamps: true }
)

export default mongoose.models.User || mongoose.model('User', UserSchema)
