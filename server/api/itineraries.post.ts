// server/api/itineraries.post.ts

import { defineEventHandler, readBody, createError } from 'h3'
import { connectDB } from '../utils/mongoose'
import Itinerary from '../models/Itinerary'

export default defineEventHandler(async (event) => {
  await connectDB()

  const body = await readBody(event)

  if (!body.leadId || !body.title) {
    throw createError({
      statusCode: 400,
      statusMessage: 'leadId and title are required'
    })
  }

  const slug = body.slug || Math.random().toString(36).substring(2, 10)

  const newItinerary = await Itinerary.create({
    leadId: body.leadId,
    title: body.title,
    status: body.status ?? 'draft',
    guestName: body.guestName,
    guestEmail: body.guestEmail,
    travellers: body.travellers ?? null,
    days: body.days || [],
    selectedHotels: body.selectedHotels || [],

    // 🔥 THIS WAS MISSING
    travelDate: body.travelDate ? new Date(body.travelDate) : null,

    // optional but supported by schema
    budgetPerPerson: body.budgetPerPerson ?? null,

    slug
  })

  return newItinerary
})
