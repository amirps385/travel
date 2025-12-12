// server/api/animals/[slug].get.ts
import { connectDB } from "../../utils/mongoose";
import Animal from "../../models/Animal";

export default defineEventHandler(async (event) => {
  await connectDB();

  const params = event.context?.params as Record<string, string> | undefined;
  const slug = params?.slug;
  if (!slug) {
    throw createError({ statusCode: 400, message: "Missing slug in route" });
  }

  const animal = await Animal.findOne({ slug }).lean();
  if (!animal) {
    throw createError({ statusCode: 404, message: "Animal not found" });
  }

  // Add featuredImage field for frontend
  return {
    ...animal,
    featuredImage: animal.image || '',
  };
});