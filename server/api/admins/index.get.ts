// server/api/admins/index.get.ts
import User from '../../models/User'
import { connectDB } from '../../utils/mongoose'

export default defineEventHandler(async (event) => {
  await connectDB()

  // Return users that are active OR where isActive is not set (treat missing as active)
  const users = await User.find({
    $or: [
      { isActive: true },
      { isActive: { $exists: false } } // include docs without isActive field
    ]
  })
    .select('_id name email role')
    .lean()

  return users.map(u => ({ id: String(u._id), name: u.name, email: u.email, role: u.role }))
})
