// server/api/leads.post.ts
import Lead from '../models/Lead'
import { connectDB } from '../utils/mongoose'

export default defineEventHandler(async (event) => {
  const body: any = await readBody(event)

  await connectDB()

  // Basic validation
  if (!body.name || !body.email || !body.date) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields (name, email, date)',
    })
  }

  // Normalize preferredTime (convert to Date or null)
  let preferredTime: Date | null = null
  if (body.preferredTime) {
    try {
      preferredTime = new Date(body.preferredTime)
      if (isNaN(preferredTime.getTime())) preferredTime = null
    } catch {
      preferredTime = null
    }
  }

  // Minimal country -> timezone map (typed as Record so TS accepts indexing)
  const countryToTimezone: Record<string, string> = {
    'United Kingdom': 'Europe/London',
    India: 'Asia/Kolkata',
    Kenya: 'Africa/Nairobi',
    Tanzania: 'Africa/Dar_es_Salaam',
    Uganda: 'Africa/Kampala',
    'South Africa': 'Africa/Johannesburg',
    'United States': 'America/New_York',
    Canada: 'America/Toronto',
    Australia: 'Australia/Sydney',
  }

  // infer timezone from provided timezone or contact country (fallback '')
  const countryKey = String(body.country || '')
  const inferredTimezone =
    body.timezone && typeof body.timezone === 'string' && body.timezone.length > 0
      ? body.timezone
      : (countryToTimezone[countryKey] || '')

  // Assemble lead data
  const leadData: any = {
    // Contact info
    name: body.name,
    email: body.email,
    phone: (body.phone || '').toString(),
    countryCode: body.countryCode || '',
    country: body.country || '',
    originCity: body.originCity || '',
    message: body.message || '',
    timezone: inferredTimezone || '',

    // Preferred contact & scheduling
    preferredTime: preferredTime, // Date or null
    preferredContactMethod: body.preferredContactMethod || '',
    scheduleCall: !!body.scheduleCall,

    // Trip details
    activities: Array.isArray(body.activities) ? body.activities : (body.activities ? [body.activities] : []),
    kilimanjaroRoute: body.kilimanjaroRoute || '',
    countries: Array.isArray(body.countries) ? body.countries : (body.countries ? [body.countries] : []),
    days: Number(body.days) || 5,
    who: body.who || '',
    date: body.date || '',
    dateIsMonthOnly: !!body.dateIsMonthOnly,

    // Travellers & ages
    adults: Number(body.adults) || 0,
    children: Number(body.children) || 0,
    travellers: Number(body.travellers) || (Number(body.adults || 0) + Number(body.children || 0) || 1),
    adultAges: Array.isArray(body.adultAges) ? body.adultAges.map((a: any) => Number(a)) : [],
    childAges: Array.isArray(body.childAges) ? body.childAges.map((a: any) => Number(a)) : [],
    ages: Array.isArray(body.ages) ? body.ages.map((a: any) => Number(a)) : [],
    genders: Array.isArray(body.genders) ? body.genders : [],

    // Budget
    budget: Number(body.budget) || 0,

    // Lead source and tracking
    source: body.source || 'custom_itinerary',
    leadSourceDetail: body.leadSourceDetail || 'Filled custom itinerary form on website',

    utm: body.utm || {},
    status: 'new',
    priority: 'medium',
    
    // NEW FIELDS:
    closedDate: null,
    closedReason: null,
    closedLostDetails: null,

    events: [],
    tasks: [],
    documents: [],
  }

  // Basic server-side consistency: ensure ages length equals travellers if possible
  try {
    const totTrav = Number(leadData.travellers) || 0
    if (!Array.isArray(leadData.ages) || leadData.ages.length === 0) {
      // If adultAges/childAges are present, combine them
      if ((leadData.adultAges && leadData.adultAges.length) || (leadData.childAges && leadData.childAges.length)) {
        leadData.ages = [].concat(leadData.adultAges || [], leadData.childAges || [])
      } else {
        // pad with sensible default if travellers present
        if (totTrav > 0) {
          leadData.ages = new Array(totTrav).fill(30)
        } else {
          leadData.ages = []
        }
      }
    } else if (leadData.ages.length !== totTrav && totTrav > 0) {
      // trim or pad ages to match travellers
      if (leadData.ages.length > totTrav) leadData.ages = leadData.ages.slice(0, totTrav)
      else while (leadData.ages.length < totTrav) leadData.ages.push(30)
    }
  } catch (err) {
    console.warn('Age normalization failed', err)
  }

  // Create lead
  const lead = await Lead.create(leadData)

  return {
    success: true,
    lead,
  }
})