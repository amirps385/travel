// server/api/groupclimb/upload.post.ts
import { defineEventHandler, readMultipartFormData } from 'h3'
import { connectDB } from '../../utils/mongoose'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { randomUUID } from 'crypto'

const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'groupclimbs')

export default defineEventHandler(async (event) => {
  await connectDB()

  try {
    // Ensure uploads directory exists
    await mkdir(uploadsDir, { recursive: true })

    // Parse multipart form data
    const parts = await readMultipartFormData(event)
    if (!parts || parts.length === 0) {
      return { ok: false, error: 'No files uploaded' }
    }

    const uploadedFiles = []

    for (const part of parts) {
      // Only process image files
      if (part.name === 'image' && part.data) {
        // Get file extension from mimetype
        let extension = 'jpg'
        if (part.type) {
          if (part.type.includes('jpeg')) extension = 'jpg'
          else if (part.type.includes('png')) extension = 'png'
          else if (part.type.includes('webp')) extension = 'webp'
          else if (part.type.includes('gif')) extension = 'gif'
        }

        // Generate unique filename
        const filename = `${Date.now()}-${randomUUID().slice(0, 8)}.${extension}`
        const filepath = path.join(uploadsDir, filename)

        // Save file
        await writeFile(filepath, part.data)

        // Store file info
        uploadedFiles.push({
          originalName: part.filename || 'image',
          filename,
          filepath: `/uploads/groupclimbs/${filename}`,
          size: part.data.length,
          mimetype: part.type || 'image/jpeg'
        })
      }
    }

    if (uploadedFiles.length === 0) {
      return { ok: false, error: 'No valid image files found' }
    }

    // Return single URL if only one file, array if multiple
    if (uploadedFiles.length === 1) {
      return { 
        ok: true, 
        url: uploadedFiles[0].filepath,
        filename: uploadedFiles[0].filename,
        size: uploadedFiles[0].size
      }
    } else {
      return { 
        ok: true, 
        files: uploadedFiles.map(f => ({
          url: f.filepath,
          filename: f.filename,
          size: f.size
        }))
      }
    }

  } catch (error: any) {
    console.error('Upload error:', error)
    return { 
      ok: false, 
      error: error.message || 'Failed to upload images' 
    }
  }
})