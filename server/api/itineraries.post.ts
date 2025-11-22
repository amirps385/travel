import { defineEventHandler, readBody, createError } from 'h3'
import { connectDB } from '../utils/mongoose'
import Itinerary from '../models/Itinerary'

export default defineEventHandler(async (event) => {
  await connectDB()

  const body = await readBody(event)

  if (!body.title || !body.days || !body.travellers) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields (title, days, travellers)'
    })
  }

  // Generate slug only if user didn’t send one
  const slug = body.slug || Math.random().toString(36).substring(2, 10)

  const newItinerary = await Itinerary.create({
    leadId: body.leadId,
    guestName: body.guestName,
    guestEmail: body.guestEmail,
    phone: body.phone,

    title: body.title,
    status: 'pending',

    slug,

    startDate: body.startDate,
    days: body.days,
    travellers: body.travellers,
    budgetPerPerson: body.budgetPerPerson,
    currency: body.currency || 'USD',
    totalCost: body.totalCost || 0,

    primaryHotel: body.primaryHotel,
    dayPlans: body.dayPlans || []
  })

  return {
    success: true,
    itinerary: newItinerary
  }
})
