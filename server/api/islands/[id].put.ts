// server/api/islands/[id].put.ts
import { defineEventHandler, readBody } from 'h3'
import { connectDB } from '../../utils/mongoose'
import Island from '../../models/Island'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { randomUUID } from 'crypto'

const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'islands')

async function saveBase64DataUrl(dataUrl: string, prefix = '') {
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
  return `/uploads/islands/${filename}`
}

export default defineEventHandler(async (event) => {
  await connectDB()
  const id = event.context?.params?.id
  if (!id) return { ok: false, error: 'id required' }
  const body = await readBody(event)

  const island = await Island.findById(id)
  if (!island) return { ok: false, error: 'Island not found' }

  // update simple fields
  const updatable = ['name','slug','shortDescription','description','region','areaKm2','establishedYear','isActive']
  updatable.forEach(k => { if (body[k] !== undefined) island.set(k, body[k]) })

  // handle newImages
  if (Array.isArray(body.newImages)) {
    for (const img of body.newImages) {
      if (typeof img === 'string' && img.startsWith('data:')) {
        try {
          const url = await saveBase64DataUrl(img, island.slug || 'island')
          island.gallery = island.gallery || []
          island.gallery.push(url)
        } catch (e) { console.warn('failed save', e) }
      } else if (typeof img === 'string') {
        island.gallery = island.gallery || []
        island.gallery.push(img)
      }
    }
  }

  if (body.featuredImage) island.featuredImage = body.featuredImage
  else if (!island.featuredImage && island.gallery?.length) island.featuredImage = island.gallery[0]

  await island.save()
  return { ok: true, data: island }
})
