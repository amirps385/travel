import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IImage {
  url: string
  caption?: string
  order?: number
  isFeatured?: boolean
}

export interface IVideo {
  url: string
  title?: string
  provider?: string // youtube/vimeo
}

export interface IGeo {
  lat?: number
  lng?: number
}

export interface IAccommodation extends Document {
  name: string
  slug: string
  city?: string
  park?: string
  country?: string
  type?: string // e.g. "Lodge", "Hotel", "Camp"
  category?: string // e.g. "Luxury", "Mid-range", "Budget"
  starRating?: number
  description?: Record<string, string> // multi-language keyed by locale
  highlights?: string[]
  amenities?: string[]
  images: IImage[]
  videos: IVideo[]
  address?: string
  geo?: IGeo
  contact?: {
    phone?: string
    website?: string
    email?: string
  }
  rooms?: number
  minPrice?: number
  maxPrice?: number
  policies?: {
    cancelation?: string
    checkIn?: string
    checkOut?: string
  }
  seo?: {
    title?: string
    description?: string
    keywords?: string[]
  }
  isPublic: boolean
  isDeleted: boolean
  createdAt: Date
  updatedAt: Date
}

const ImageSchema = new Schema<IImage>({
  url: { type: String, required: true },
  caption: String,
  order: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false }
})

const VideoSchema = new Schema<IVideo>({
  url: { type: String, required: true },
  title: String,
  provider: String
})

const GeoSchema = new Schema<IGeo>({
  lat: Number,
  lng: Number
}, { _id: false })

const AccommodationSchema = new Schema<IAccommodation>({
  name: { type: String, required: true, index: true },
  slug: { type: String, required: true, unique: true, index: true },
  city: { type: String, index: true },
  park: { type: String, index: true },
  country: String,
  type: String,
  category: String,
  starRating: { type: Number, min: 1, max: 5 },
  description: { type: Schema.Types.Mixed },
  highlights: [String],
  amenities: [String],
  images: [ImageSchema],
  videos: [VideoSchema],
  address: String,
  geo: GeoSchema,
  contact: {
    phone: String,
    website: String,
    email: String
  },
  rooms: Number,
  minPrice: Number,
  maxPrice: Number,
  policies: {
    cancelation: String,
    checkIn: String,
    checkOut: String
  },
  seo: {
    title: String,
    description: String,
    keywords: [String]
  },
  isPublic: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false }
}, { 
  timestamps: true,
  collection: 'accommodations' // Explicitly set collection name
})

let Accommodation: Model<IAccommodation>
try {
  Accommodation = mongoose.model<IAccommodation>('Accommodation')
} catch (e) {
  Accommodation = mongoose.model<IAccommodation>('Accommodation', AccommodationSchema)
}

export default Accommodation