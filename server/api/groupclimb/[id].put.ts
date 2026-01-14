// server/api/groupclimb/[id].put.ts
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
  const id = event.context?.params?.id
  if (!id) return { ok: false, error: 'id required' }
  
  const body = await readBody(event)
  const groupClimb = await GroupClimb.findById(id)
  if (!groupClimb) return { ok: false, error: 'Group climb not found' }

  const updatable = [
    'title', 'slug', 'categoryIds', 'tags', 'route', 'difficulty',
    'itinerary', 'startDate', 'endDate', 'durationDays', 'maxGroupSize', 
    'seatsBooked', 'price', 'currency', 'depositAmount', 'status', 'isPublic', 
    'shortDescription', 'description', 'itinerarySummary', 'included', 'notIncluded', 
    'meetingPoint', 'meetingTime', 'organizer', 'createdBy', 'updatedBy',
    'priority', 'bookingIds', 'metadata'
  ]

  updatable.forEach(k => {
    if (body[k] !== undefined) groupClimb.set(k, body[k])
  })

  if (Array.isArray(body.newImages)) {
    for (const img of body.newImages) {
      if (typeof img === 'string' && img.startsWith('data:')) {
        try {
          const url = await saveBase64DataUrl(img, groupClimb.slug || 'groupclimb')
          groupClimb.gallery = groupClimb.gallery || []
          groupClimb.gallery.push(url)
        } catch (e) {
          console.warn('failed save', e)
        }
      } else if (typeof img === 'string') {
        groupClimb.gallery = groupClimb.gallery || []
        groupClimb.gallery.push(img)
      }
    }
  }

  if (Array.isArray(body.gallery)) {
    groupClimb.gallery = body.gallery
  }

  await groupClimb.save()
  return { ok: true, data: groupClimb }
})