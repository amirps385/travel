// server/api/accommodations/upload.post.ts
import { defineEventHandler, readMultipartFormData } from 'h3'
import { mkdir, writeFile } from 'fs/promises'
import path from 'path'
import { randomUUID } from 'crypto'

// Define upload directory
const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'accommodations')

// Common image MIME types mapping
const mimeToExt: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif',
  'image/webp': 'webp',
  'image/svg+xml': 'svg',
  'image/bmp': 'bmp',
  'image/tiff': 'tiff',
  'image/avif': 'avif',
}

export default defineEventHandler(async (event) => {
  try {
    console.log('Upload endpoint called')
    
    // Ensure upload directory exists
    await mkdir(uploadsDir, { recursive: true })
    console.log('Upload directory:', uploadsDir)
    
    // Read multipart form data
    const parts = await readMultipartFormData(event)
    console.log('Parts received:', parts?.length || 0)
    
    if (!parts || parts.length === 0) {
      console.log('No parts found')
      return { 
        ok: false, 
        error: 'No files uploaded. Please select at least one image.' 
      }
    }

    const results: any[] = []
    
    for (const part of parts) {
      console.log('Processing part:', part.name, part.filename, part.type)
      
      if ((part.name === 'image' || part.name === 'file') && part.data && part.filename) {
        // Get file extension
        let extension = 'jpg' // default
        
        // First try to get from MIME type
        if (part.type && mimeToExt[part.type]) {
          extension = mimeToExt[part.type]
        } 
        // Fallback to filename extension
        else if (part.filename) {
          const filenameParts = part.filename.split('.')
          if (filenameParts.length > 1) {
            const ext = filenameParts.pop()?.toLowerCase() || 'jpg'
            // Only use if it's a common image extension
            if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'].includes(ext)) {
              extension = ext === 'jpeg' ? 'jpg' : ext
            }
          }
        }
        
        // Generate unique filename
        const filename = `acc-${Date.now()}-${randomUUID().slice(0, 8)}.${extension}`
        const filepath = path.join(uploadsDir, filename)
        
        console.log('Saving file:', filename, 'to', filepath)
        
        // Save file
        await writeFile(filepath, part.data)
        
        // Return relative URL for web access
        const fileUrl = `/uploads/accommodations/${filename}`
        console.log('File saved successfully:', fileUrl)
        
        results.push({ 
          url: fileUrl, 
          filename,
          size: part.data.length,
          type: part.type || 'image/jpeg',
          caption: '',
          order: results.length,
          isFeatured: results.length === 0 // First image is featured by default
        })
      }
    }

    if (results.length === 0) {
      console.log('No valid image files processed')
      return { 
        ok: false, 
        error: 'No valid image files found. Please upload images only.' 
      }
    }
    
    console.log('Upload successful, files:', results.length)
    return { 
      ok: true, 
      files: results,
      message: `Successfully uploaded ${results.length} image(s)`
    }
  } catch (error: any) {
    console.error('Upload error:', error)
    return { 
      ok: false, 
      error: error.message || 'Failed to upload images',
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }
  }
})