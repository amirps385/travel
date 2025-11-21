import { defineEventHandler, readBody, createError } from 'h3';
import { connectDB } from '../../utils/mongoose';
import Hotel from '../../models/Hotel';

export default defineEventHandler(async (event) => {
  await connectDB();

  const id = event.context.params?.id;
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Missing hotel id' });
  }

  const body = await readBody(event);

  const hotel = await Hotel.findByIdAndUpdate(
    id,
    {
      $set: {
        name: body.name,
        destination: body.destination,
        activityTypes: body.activityTypes,
        range: body.range,
        pricingYear: body.pricingYear,
        highSeason: body.highSeason,
        lowSeason: body.lowSeason,
        childPolicies: body.childPolicies,
        specialDates: body.specialDates
      }
    },
    { new: true }
  ).lean();

  if (!hotel) {
    throw createError({ statusCode: 404, statusMessage: 'Hotel not found' });
  }

  return { ...hotel, id: hotel._id.toString() };
});
