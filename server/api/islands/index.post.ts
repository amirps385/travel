// server/api/islands/index.post.ts
import { defineEventHandler, readBody } from 'h3'
import { connectDB } from '../../utils/mongoose'
import Island from '../../models/Island'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { randomUUID } from 'crypto'

const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'islands')

// helper: save a single data URL (data:<mime>;base64,<base64data>) and return public path
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
  const filepath = path.join(uploadsDir, filename)
  const buffer = Buffer.from(base64, 'base64')
  await writeFile(filepath, buffer)
  return `/uploads/islands/${filename}`
}

export default defineEventHandler(async (event) => {
  await connectDB()

  const body = await readBody(event)
  if (!body || !body.name || !body.slug) {
    return { ok: false, error: 'name and slug are required' }
  }

  // Basic uniqueness check for slug
  const existing = await Island.findOne({ slug: body.slug })
  if (existing) return { ok: false, error: 'slug already exists' }

  // images: can be array of data URLs OR array of existing URLs. We'll process base64 ones.
  let gallery: string[] = Array.isArray(body.gallery) ? [...body.gallery] : []
  if (Array.isArray(body.newImages)) {
    for (const maybeDataUrl of body.newImages) {
      if (typeof maybeDataUrl === 'string' && maybeDataUrl.startsWith('data:')) {
        try {
          const saved = await saveBase64DataUrl(maybeDataUrl, body.slug)
          gallery.push(saved)
        } catch (e) {
          // skip or collect errors; here we continue
          console.warn('failed to save image', e)
        }
      } else if (typeof maybeDataUrl === 'string') {
        // assume it's already a URL
        gallery.push(maybeDataUrl)
      }
    }
  }

  const featuredImage = body.featuredImage || gallery[0] || ''

  const island = new Island({
    name: body.name,
    slug: body.slug,
    shortDescription: body.shortDescription || '',
    description: body.description || '',
    region: body.region || '',
    areaKm2: body.areaKm2 || null,
    establishedYear: body.establishedYear || null,
    featuredImage,
    gallery,
    isActive: body.isActive !== false
  })

  await island.save()

  return { ok: true, data: island }
})
