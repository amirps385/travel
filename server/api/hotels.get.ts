import { defineEventHandler } from 'h3';
import { connectDB } from '../utils/mongoose'
import Hotel from '../models/Hotel'


export default defineEventHandler(async () => {
  await connectDB();

  const hotels = await Hotel.find().sort({ createdAt: -1 }).lean();

  // add `id` field for frontend convenience
  return hotels.map((h: any) => ({
    ...h,
    id: h._id.toString()
  }));
});
