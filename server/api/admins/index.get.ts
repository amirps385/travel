// server/api/admins/index.get.ts
import User from '../../models/User'
import { connectDB } from '../../utils/mongoose'

export default defineEventHandler(async (event) => {
  await connectDB()

  // return all active users - you may filter by role if required
  const users = await User.find({ isActive: true }).select('_id name email role').lean()
  // map to a friendly shape for the UI
  return users.map(u => ({ id: u._id, name: u.name, email: u.email, role: u.role }))
})
