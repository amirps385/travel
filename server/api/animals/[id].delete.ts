// server/api/animals/[id].delete.ts
// Delete an animal by id

import { connectDB } from "../../utils/mongoose";
import Animal from "../../models/Animal";

export default defineEventHandler(async (event) => {
  await connectDB();

  // safe read of params (params can be undefined in types)
  const params = event.context?.params as Record<string, string> | undefined;
  const id = params?.id;
  if (!id) {
    throw createError({ statusCode: 400, message: "Missing animal id in route" });
  }

  const deleted = await Animal.findByIdAndDelete(id).lean();
  if (!deleted) {
    throw createError({ statusCode: 404, message: "Animal not found" });
  }

  return { message: "Animal removed", id: deleted._id };
});
