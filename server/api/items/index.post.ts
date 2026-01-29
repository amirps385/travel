// server/api/items/index.post.ts
import { defineEventHandler, readBody } from 'h3'
import { connectDB } from '../../utils/mongoose'
import Item from '../../models/Item'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { randomUUID } from 'crypto'

const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'items')

function slugify(s: string) {
  return (s || '').toString().toLowerCase().trim()
    .normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 140)
}

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

  if (!body || !body.title) return { ok: false, error: 'title is required' }

  // prepare slug and ensure uniqueness
  let baseSlug = body.slug ? slugify(body.slug) : slugify(body.title)
  let finalSlug = baseSlug
  let i = 1
  while (await Item.findOne({ slug: finalSlug })) {
    finalSlug = `${baseSlug}-${i++}`
  }

  // Process images
  let images: string[] = []
  
  // If images are provided in the form
  if (Array.isArray(body.images)) {
    for (const img of body.images) {
      if (typeof img === 'string' && img.trim() !== '') {
        if (img.startsWith('data:')) {
          // New base64 image - upload it
          try {
            const saved = await saveBase64DataUrl(img, finalSlug)
            images.push(saved)
            console.log('Uploaded new image:', saved)
          } catch (e) {
            console.warn('Failed to save image', e)
          }
        } else if (img.startsWith('/uploads/')) {
          // Already uploaded image
          images.push(img)
          console.log('Using existing image:', img)
        }
      }
    }
  }

  // Determine featured image
  let featuredImage = ''
  if (body.featuredImage && typeof body.featuredImage === 'string' && body.featuredImage.trim() !== '') {
    if (body.featuredImage.startsWith('data:')) {
      // New base64 featured image - upload it
      try {
        featuredImage = await saveBase64DataUrl(body.featuredImage, finalSlug)
        console.log('Uploaded featured image:', featuredImage)
        
        // Also add to images array if not already there
        if (!images.includes(featuredImage)) {
          images.push(featuredImage)
          console.log('Added featured image to images array')
        }
      } catch (e) {
        console.warn('Failed to save featured image', e)
        // Fallback to first image
        if (images.length > 0) {
          featuredImage = images[0]
        }
      }
    } else if (body.featuredImage.startsWith('/uploads/')) {
      // Already uploaded URL
      featuredImage = body.featuredImage
      console.log('Using existing featured image:', featuredImage)
      
      // Ensure it's in the images array
      if (!images.includes(featuredImage)) {
        images.push(featuredImage)
      }
    }
  } else if (images.length > 0) {
    // Use first image as featured if none specified
    featuredImage = images[0]
    console.log('Using first image as featured:', featuredImage)
  }

  console.log('Final images array:', images)
  console.log('Final featuredImage:', featuredImage)

  const item = new Item({
    title: body.title,
    slug: finalSlug,
    code: body.code || '',
    type: body.type || 'misc',
    category: body.category || '',
    shortDescription: body.shortDescription || '',
    description: body.description || '',
    images: images,
    featuredImage: featuredImage,
    includedByDefault: !!body.includedByDefault,
    isOptional: body.isOptional !== undefined ? !!body.isOptional : true,
    price: typeof body.price === 'number' ? body.price : (body.price ? Number(body.price) : 0),
    currency: body.currency || 'USD',
    priceType: body.priceType || 'per_person',
    free: body.free === true || body.price === 0,
    seasonal: Array.isArray(body.seasonal) ? body.seasonal : [],
    variants: Array.isArray(body.variants) ? body.variants : [],
    supplier: body.supplier || {},
    availability: body.availability || {},
    costPrice: body.costPrice,
    commissionPercent: body.commissionPercent,
    taxPercent: body.taxPercent,
    refundable: body.refundable !== undefined ? !!body.refundable : true,
    cancellationPolicy: body.cancellationPolicy || '',
    attachTo: Array.isArray(body.attachTo) ? body.attachTo : [],
    attachIds: Array.isArray(body.attachIds) ? body.attachIds : [],
    metadata: body.metadata || {},
    isPublic: body.isPublic !== false,
    isDeleted: false,
    createdBy: body.createdBy || ''
  })

  await item.save()
  console.log('Item saved with ID:', item._id)
  
  // Get the full saved document
  const savedItem = await Item.findById(item._id).lean()
  console.log('Saved item data:', savedItem)
  
  return { ok: true, data: savedItem }
})