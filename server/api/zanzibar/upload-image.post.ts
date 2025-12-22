// server/api/zanzibar/upload-image.post.ts
import { defineEventHandler, readMultipartFormData, createError } from 'h3'
import { promises as fs } from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
  try {
    const parts = await readMultipartFormData(event)

    if (!parts || !parts.length) {
      throw createError({ statusCode: 400, statusMessage: 'No file uploaded' })
    }

    // pick first file part that has a filename
    const filePart = parts.find((p: any) => !!p.filename)
    if (!filePart || !filePart.filename) {
      throw createError({ statusCode: 400, statusMessage: 'No file part found' })
    }

    // ensure uploads dir exists
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'zanzibar')
    await fs.mkdir(uploadsDir, { recursive: true })

    // create a safe filename
    const ext = path.extname(filePart.filename as string) || '.jpg'
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`
    const destPath = path.join(uploadsDir, fileName)

    // Normalize different possible data shapes to a Buffer
    let buffer: Buffer
    const raw = filePart.data

    if (raw instanceof Uint8Array) {
      buffer = Buffer.from(raw)
    } else if (Buffer.isBuffer(raw)) {
      buffer = raw
    } else if (typeof raw === 'string') {
      // If string, treat as binary string (rare) — change encoding if needed
      buffer = Buffer.from(raw, 'binary')
    } else if (raw && typeof raw === 'object' && 'length' in raw) {
      // fallback for array-like data
      buffer = Buffer.from(raw as any)
    } else {
      throw createError({ statusCode: 500, statusMessage: 'Unsupported file data type' })
    }

    await fs.writeFile(destPath, buffer)

    // public URL (Nuxt serves /public at /)
    const url = `/uploads/zanzibar/${fileName}`

    return { success: true, url }
  } catch (err: any) {
    console.error('zanzibar upload error', err)
    throw createError({ statusCode: err.statusCode || 500, statusMessage: err.message || 'Upload failed' })
  }
})
