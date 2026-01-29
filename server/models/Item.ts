// server/models/Item.ts
import mongoose, { Schema, Document, Model } from 'mongoose'

export type PriceType = 'per_person' | 'per_booking' | 'per_room' | 'per_day'

export interface ISeasonPrice {
  startDate?: Date
  endDate?: Date
  price: number
  currency?: string
  priceType?: PriceType
  minQty?: number
  maxQty?: number
  note?: string
}

export interface IVariant {
  code?: string
  title: string
  description?: string
  price?: number
  currency?: string
  priceType?: PriceType
  minQty?: number
  maxQty?: number
  metadata?: any
}

export interface IItem extends Document {
  title: string
  slug: string
  code?: string
  type?: string
  category?: string
  shortDescription?: string
  description?: string
  images?: string[]
  featuredImage?: string 
  includedByDefault?: boolean
  isOptional?: boolean
  price?: number
  currency?: string
  priceType?: PriceType
  free?: boolean
  seasonal?: ISeasonPrice[]
  variants?: IVariant[]
  supplier?: { id?: string; name?: string; contact?: string }
  availability?: { capacity?: number; trackStock?: boolean }
  costPrice?: number
  commissionPercent?: number
  taxPercent?: number
  refundable?: boolean
  cancellationPolicy?: string
  attachTo?: string[]             // e.g. ['Tour','Route','GroupClimb','Zanzibar','Itinerary']
  attachIds?: mongoose.Types.ObjectId[]
  metadata?: any
  isPublic?: boolean
  isDeleted?: boolean
  createdBy?: string
  updatedBy?: string
}

const SeasonPriceSchema = new Schema<ISeasonPrice>(
  {
    startDate: Date,
    endDate: Date,
    price: { type: Number, required: true, default: 0 },
    currency: { type: String, default: 'USD' },
    priceType: { type: String, default: 'per_person' },
    minQty: Number,
    maxQty: Number,
    note: String
  },
  { _id: false }
)

const VariantSchema = new Schema<IVariant>(
  {
    code: { type: String },
    title: { type: String, required: true },
    description: String,
    price: { type: Number, default: 0 },
    currency: { type: String, default: 'USD' },
    priceType: { type: String, default: 'per_person' },
    minQty: Number,
    maxQty: Number,
    metadata: Schema.Types.Mixed
  },
  { _id: false }
)

const ItemSchema = new Schema<IItem>(
  {
    title: { type: String, required: true, index: true },
    slug: { type: String, required: true, unique: true, index: true },
    code: { type: String, unique: true, sparse: true },
    type: { type: String, default: 'misc' },
    category: { type: String, index: true },
    shortDescription: String,
    description: String,
    images: [String],
    featuredImage: { type: String, default: '' }, 
    includedByDefault: { type: Boolean, default: false },
    isOptional: { type: Boolean, default: true },
    price: { type: Number, default: 0 },
    currency: { type: String, default: 'USD' },
    priceType: { type: String, default: 'per_person' },
    free: { type: Boolean, default: false },
    seasonal: [SeasonPriceSchema],
    variants: [VariantSchema],
    supplier: {
      id: { type: String },
      name: String,
      contact: String
    },
    availability: {
      capacity: Number,
      trackStock: { type: Boolean, default: false }
    },
    costPrice: Number,
    commissionPercent: Number,
    taxPercent: Number,
    refundable: { type: Boolean, default: true },
    cancellationPolicy: String,
    attachTo: [String],
    attachIds: [{ type: Schema.Types.ObjectId }],
    metadata: Schema.Types.Mixed,
    isPublic: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    createdBy: String,
    updatedBy: String
  },
  {
    timestamps: true,
    collection: 'items'
  }
)

// Text index for admin search
ItemSchema.index({ title: 'text', shortDescription: 'text', description: 'text' })

// Reuse model if already compiled (prevents duplicate model errors)
const Item: Model<IItem> = (mongoose.models && (mongoose.models as any).Item) || mongoose.model<IItem>('Item', ItemSchema)

export default Item