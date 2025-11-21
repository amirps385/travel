import { defineEventHandler, readBody, createError } from 'h3';
import { connectDB } from '../utils/mongoose';
import Hotel from '../models/Hotel';

export default defineEventHandler(async (event) => {
  await connectDB();

  const body = await readBody(event);

  if (!body.name) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Hotel name is required'
    });
  }

  const hotel = await Hotel.create({
    name: body.name,
    destination: body.destination || '',
    activityTypes: body.activityTypes || [],
    range: body.range || '',
    pricingYear: body.pricingYear || new Date().getFullYear(),
    highSeason: body.highSeason || [],
    lowSeason: body.lowSeason || [],
    childPolicies: body.childPolicies || [],
    specialDates: body.specialDates || []
  });

  const obj: any = hotel.toObject();
  obj.id = obj._id.toString();

  return obj;
});
