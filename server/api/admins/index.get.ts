// server/api/admins/index.get.ts
import User from '../../models/User'
import { connectDB } from '../../utils/mongoose'

export default defineEventHandler(async (event) => {
  await connectDB()

  // Only return ACTIVE users (isActive: true or undefined)
  const users = await User.find({
    $or: [
      { isActive: true },
      { isActive: { $exists: false } }
    ]
  })
  .select('_id name email role isActive avatar createdAt updatedAt')
  .lean()

  return users.map(u => ({
    id: String(u._id),
    _id: String(u._id),
    name: u.name,
    email: u.email,
    role: u.role,
    isActive: u.isActive === undefined ? true : Boolean(u.isActive),
    avatar: u.avatar || null,
    createdAt: u.createdAt,
    updatedAt: u.updatedAt
  }))
})