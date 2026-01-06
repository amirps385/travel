import Lead from '../models/Lead'
import { connectDB } from '../utils/mongoose'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  await connectDB()

  // Basic validation
  if (!body.name || !body.email || !body.date) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields (name, email, date)',
    })
  }

  // Convert preferredTime to Date object if provided
  let preferredTime = null
  if (body.preferredTime) {
    try {
      preferredTime = new Date(body.preferredTime)
      // Validate it's a proper date
      if (isNaN(preferredTime.getTime())) {
        preferredTime = null
      }
    } catch (err) {
      preferredTime = null
    }
  }

  // Create lead with ALL fields from the frontend
  const lead = await Lead.create({
    // Contact info
    name: body.name,
    email: body.email,
    phone: body.phone || '',
    countryCode: body.countryCode || '',
    country: body.country || '',
    originCity: body.originCity || '',
    message: body.message || '',
    timezone: body.timezone || '',

    // Preferred time at top level (not in metadata)
    preferredTime: preferredTime,

    // Trip details
    activities: body.activities || [],
    days: body.days || 5,
    who: body.who || 'single',
    date: body.date,
    travellers: body.travellers || 1,
    ages: body.ages || [],
    genders: body.genders || [],

    // Budget
    budget: body.budget || 0,

    // Lead source and tracking
    source: body.source || 'custom_itinerary', // Will be overridden by 'book_call' from frontend
    leadSourceDetail: body.leadSourceDetail || '',
    
    // UTM parameters if available
    utm: body.utm || {},

    // Status
    status: 'new',
    
    // Priority
    priority: 'medium',

    // Arrays
    events: [],
    tasks: [],
    documents: [],

    // Timestamps will be added automatically by mongoose timestamps
  })

  return {
    success: true,
    lead,
  }
})