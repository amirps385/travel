import Lead from '../models/Lead'
import { connectDB } from '../utils/mongoose'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  await connectDB()

  // Basic validation (you can add more later)
  if (!body.name || !body.email || !body.date) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields (name, email, date)',
    })
  }

  const lead = await Lead.create({
    name: body.name,
    email: body.email,
    phone: body.phone,
    originCity: body.originCity,

    activities: body.activities || [],
    days: body.days,
    who: body.who,
    date: body.date,
    travellers: body.travellers,
    ages: body.ages || [],
    genders: body.genders || [],

    budget: body.budget,
    status: 'new',
  })

  return {
    success: true,
    lead,
  }
})
