// server/api/items/[id].put.ts
import { defineEventHandler, readBody } from 'h3'
import { connectDB } from '../../utils/mongoose'
import Item from '../../models/Item'
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
  const id = event.context?.params?.id
  if (!id) return { ok: false, error: 'id required' }
  const body = await readBody(event)

  const item = await Item.findById(id)
  if (!item) return { ok: false, error: 'Item not found' }

  // Handle image processing for PUT request
  const currentImages = (item as any).images || []
  let newImages: string[] = [...currentImages]
  
  // Process new images from the images array
  if (Array.isArray(body.images)) {
    const processedImages: string[] = []
    
    for (const img of body.images) {
      if (typeof img === 'string') {
        if (img.startsWith('data:')) {
          // New base64 image - upload it
          try {
            const saved = await saveBase64DataUrl(img, (item as any).slug || 'item')
            processedImages.push(saved)
          } catch (e) {
            console.warn('Failed to save image', e)
          }
        } else if (img.startsWith('/uploads/') || img.startsWith('http')) {
          // Already uploaded URL
          processedImages.push(img)
        }
      }
    }
    
    newImages = processedImages
  }
  
  // Process featured image
  let featuredImage = (item as any).featuredImage || ''
  if (body.featuredImage) {
    if (body.featuredImage.startsWith('data:')) {
      // New base64 featured image - upload it
      try {
        featuredImage = await saveBase64DataUrl(body.featuredImage, (item as any).slug || 'item')
      } catch (e) {
        console.warn('Failed to save featured image', e)
      }
    } else {
      featuredImage = body.featuredImage
    }
  } else if (newImages.length > 0) {
    // If no featured image specified but we have images, use the first one
    featuredImage = newImages[0]
  }

  // Update item with processed images
  item.set('images', newImages)
  item.set('featuredImage', featuredImage)

  // Update other fields
  const updatable = [
    'title', 'slug', 'code', 'type', 'category', 'shortDescription', 
    'description', 'includedByDefault', 'isOptional', 'price', 'currency', 
    'priceType', 'free', 'seasonal', 'variants', 'supplier', 'availability', 
    'costPrice', 'commissionPercent', 'taxPercent', 'refundable', 
    'cancellationPolicy', 'attachTo', 'attachIds', 'metadata', 'isPublic'
  ]
  
  updatable.forEach(k => {
    if (body[k] !== undefined) item.set(k, body[k])
  })

  await item.save()
  
  // Return the updated document with all fields
  const updatedItem = await Item.findById(id).lean()
  return { ok: true, data: updatedItem }
})