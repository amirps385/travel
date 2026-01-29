// server/api/items/upload.post.ts
import { defineEventHandler, readBody } from 'h3'
import { connectDB } from '../../utils/mongoose'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { randomUUID } from 'crypto'

const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'items')

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
  await writeFile(filepath, Buffer.from(base64, 'base64'))
  return `/uploads/items/${filename}`
}

export default defineEventHandler(async (event) => {
  await connectDB()
  const body = await readBody(event)
  if (!body || !body.data) return { ok: false, error: 'data (base64) required' }
  try {
    const url = await saveBase64DataUrl(body.data, body.prefix || 'item')
    return { ok: true, url }
  } catch (err: any) {
    return { ok: false, error: err.message || 'upload failed' }
  }
})
