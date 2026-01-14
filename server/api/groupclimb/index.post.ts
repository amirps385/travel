// server/api/groupclimb/index.post.ts
import { defineEventHandler, readBody } from 'h3'
import { connectDB } from '../../utils/mongoose'
import GroupClimb from '../../models/GroupClimb'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { randomUUID } from 'crypto'

const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'groupclimbs')

async function saveBase64DataUrl(dataUrl: string, prefix = ''): Promise<string> {
  const match = /^data:(.+);base64,(.+)$/.exec(dataUrl)
  if (!match) throw new Error('Invalid data URL')
  const mime = match[1]
  const base64 = match[2]
  let ext = 'bin'
  if (mime === 'image/jpeg' || mime === 'image/jpg') ext = 'jpg'
  else if (mime === 'image/png') ext = 'png'
  else if (mime === 'image/webp') ext = 'webp'
  else if (mime === 'image/gif') ext = 'gif'
  const filename = `${prefix || Date.now()}-${randomUUID()}.${ext}`
  await mkdir(uploadsDir, { recursive: true })
  await writeFile(path.join(uploadsDir, filename), Buffer.from(base64, 'base64'))
  return `/uploads/groupclimbs/${filename}`
}

export default defineEventHandler(async (event) => {
  await connectDB()

  const body = await readBody(event)
  
  if (!body || !body.title || !body.startDate) {
    return { ok: false, error: 'Title and startDate are required' }
  }

  if (!body.slug) {
    body.slug = body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  }

  const existing = await GroupClimb.findOne({ slug: body.slug, isDeleted: false })
  if (existing) {
    return { ok: false, error: 'Slug already exists' }
  }

  let gallery: string[] = Array.isArray(body.gallery) ? [...body.gallery] : []
  if (Array.isArray(body.newImages)) {
    for (const img of body.newImages) {
      if (typeof img === 'string' && img.startsWith('data:')) {
        try {
          const saved = await saveBase64DataUrl(img, body.slug)
          gallery.push(saved)
        } catch (e) {
          console.warn('Failed to save image', e)
        }
      } else if (typeof img === 'string') {
        gallery.push(img)
      }
    }
  }

  let durationDays = body.durationDays || 0
  if (body.endDate && !body.durationDays) {
    const start = new Date(body.startDate)
    const end = new Date(body.endDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    durationDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
  }

  const groupClimb = new GroupClimb({
    title: body.title,
    slug: body.slug,
    categoryIds: Array.isArray(body.categoryIds) ? body.categoryIds : [],
    tags: Array.isArray(body.tags) ? body.tags : [],
    route: body.route || '',
    difficulty: body.difficulty || '',
    itinerary: Array.isArray(body.itinerary) ? body.itinerary : [],
    startDate: new Date(body.startDate),
    endDate: body.endDate ? new Date(body.endDate) : null,
    durationDays,
    maxGroupSize: parseInt(body.maxGroupSize) || 8,
    seatsBooked: parseInt(body.seatsBooked) || 0,
    price: parseFloat(body.price) || 0,
    currency: body.currency || 'USD',
    depositAmount: parseFloat(body.depositAmount) || 0,
    status: body.status || 'upcoming',
    isPublic: body.isPublic !== false,
    shortDescription: body.shortDescription || '',
    description: body.description || '',
    itinerarySummary: body.itinerarySummary || '',
    included: Array.isArray(body.included) ? body.included : [],
    notIncluded: Array.isArray(body.notIncluded) ? body.notIncluded : [],
    gallery,
    meetingPoint: body.meetingPoint || '',
    meetingTime: body.meetingTime || '',
    organizer: body.organizer || {},
    createdBy: body.createdBy || '',
    updatedBy: body.updatedBy || '',
    priority: body.priority || 'medium',
    bookingIds: Array.isArray(body.bookingIds) ? body.bookingIds : [],
    metadata: body.metadata || {},
    isDeleted: false
  })

  await groupClimb.save()

  return { ok: true, data: groupClimb }
})