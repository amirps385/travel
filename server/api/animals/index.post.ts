// server/api/animals/index.post.ts
import { connectDB } from "../../utils/mongoose";
import Animal from "../../models/Animal";

function makeSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default defineEventHandler(async (event) => {
  await connectDB();
  const body = await readBody(event);

  if (!body?.name) {
    throw createError({ statusCode: 400, message: "Name is required" });
  }

  // Map featuredImage from frontend to image field in database
  const animal = await Animal.create({
    name: body.name.trim(),
    slug: body.slug?.trim() || makeSlug(body.name),
    category: body.category || "",
    scientificName: body.scientificName || "",
    image: body.featuredImage || "",  // Store frontend's featuredImage as image
    gallery: Array.isArray(body.gallery) ? body.gallery : [],
    shortDescription: body.shortDescription || "",
    description: body.description || "",
    habitat: body.habitat || "",
    behavior: body.behavior || "",
    diet: body.diet || "",
    conservationStatus: body.conservationStatus || "",
    size: body.size || {},
    lifespan: body.lifespan || "",
    range: body.range || "",
    tags: Array.isArray(body.tags) ? body.tags : [],
  });

  // Return with featuredImage mapped back for frontend
  const result = animal.toObject();
  return {
    ...result,
    featuredImage: result.image || "",  // Map database image back to featuredImage
  };
});