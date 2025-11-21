import { defineEventHandler, createError } from 'h3';
import { connectDB } from '../../utils/mongoose';
import Hotel from '../../models/Hotel';

export default defineEventHandler(async (event) => {
  await connectDB();

  const id = event.context.params?.id;
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Missing hotel id' });
  }

  const deleted = await Hotel.findByIdAndDelete(id);
  if (!deleted) {
    throw createError({ statusCode: 404, statusMessage: 'Hotel not found' });
  }

  return { success: true };
});
