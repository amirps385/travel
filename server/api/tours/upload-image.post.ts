// server/api/tours/upload-image.post.ts
import { defineEventHandler, readMultipartFormData } from 'h3'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  const parts = await readMultipartFormData(event)
  if (!parts || !parts.length) return { success: false, message: 'No files received' }

  const filePart = parts.find(p => p.name === 'image' || p.name === 'file')
  if (!filePart) return { success: false, message: 'No image file sent (field "image")' }

  const uploadsDir = join(process.cwd(), 'public', 'uploads')
  await mkdir(uploadsDir, { recursive: true })

  const originalName = filePart.filename || `upload-${Date.now()}.jpg`
  const ext = (originalName.split('.').pop() || 'jpg').replace(/[^a-z0-9]/gi, '')
  const filename = `${Date.now()}-${Math.floor(Math.random()*9000)+1000}.${ext}`
  const dest = join(uploadsDir, filename)

  await writeFile(dest, filePart.data)
  const url = `/uploads/${filename}`

  return { success: true, url }
})
