// server/api/animals/index.get.ts
import { connectDB } from "../../utils/mongoose";
import Animal from "../../models/Animal";

export default defineEventHandler(async () => {
  await connectDB();
  const animals = await Animal.find()
    .sort({ createdAt: -1 })
    .lean();
  
  // Map database 'image' field to frontend 'featuredImage'
  return animals.map(animal => ({
    ...animal,
    featuredImage: animal.image || '',  // Add featuredImage field for frontend
  }));
});