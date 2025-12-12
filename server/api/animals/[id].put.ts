// server/api/animals/[id].put.ts
import { connectDB } from "../../utils/mongoose";
import Animal from "../../models/Animal";

export default defineEventHandler(async (event) => {
  await connectDB();

  const params = event.context?.params as Record<string, string> | undefined;
  const id = params?.id;
  if (!id) {
    throw createError({ statusCode: 400, message: "Missing animal id in route" });
  }

  const body = await readBody(event);
  if (!body || Object.keys(body).length === 0) {
    throw createError({ statusCode: 400, message: "Request body is empty" });
  }

  // Create update object, mapping featuredImage to image
  const updateData: any = { ...body };
  
  if (body.featuredImage !== undefined) {
    updateData.image = body.featuredImage; // Map to database field
    // Remove featuredImage from update as it doesn't exist in schema
    delete updateData.featuredImage;
  }

  const updated = await Animal.findByIdAndUpdate(id, updateData, { 
    new: true,
    runValidators: true 
  }).lean();
  
  if (!updated) {
    throw createError({ statusCode: 404, message: "Animal not found" });
  }

  // Return with featuredImage for frontend
  return {
    ...updated,
    featuredImage: updated.image || "",  // Map back to frontend field name
  };
});