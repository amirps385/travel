// server/api/routes/upload-image.post.ts
import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import { join } from 'path'
import { randomUUID } from 'crypto'

export default defineEventHandler(async (event) => {
  try {
    const formData = await readMultipartFormData(event)
    
    if (!formData || !formData.length) {
      throw createError({
        statusCode: 400,
        message: 'No file uploaded'
      })
    }

    const file = formData[0]
    
    if (!file.filename || !file.type || !file.data) {
      throw createError({
        statusCode: 400,
        message: 'Invalid file data'
      })
    }

    // Check if it's an image
    if (!file.type.startsWith('image/')) {
      throw createError({
        statusCode: 400,
        message: 'Only image files are allowed'
      })
    }

    // Generate unique filename
    const ext = file.filename.split('.').pop() || 'jpg'
    const fileName = `${randomUUID()}.${ext}`

    // Define upload directory
    const uploadDir = join(process.cwd(), 'public', 'uploads', 'routes')

    // Create directory if it doesn't exist
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    const filePath = join(uploadDir, fileName)

    // Save file
    await writeFile(filePath, file.data)

    // Return accessible URL
    const fileUrl = `/uploads/routes/${fileName}`

    return {
      url: fileUrl
    }
  } catch (error: any) {
    console.error('Upload error:', error)
    throw createError({
      statusCode: 500,
      message: `Failed to upload file: ${error.message}`,
    })
  }
})