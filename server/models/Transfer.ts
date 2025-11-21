// server/models/Transfer.ts
import mongoose from 'mongoose'

// destructure from the default mongoose export
const { Schema, model, models } = mongoose

export interface ITransfer {
  fromCity: string
  toCity: string
  durationHours: number
  costUSD: number
  vehicleType?: string
}

const TransferSchema = new Schema<ITransfer>(
  {
    fromCity: { type: String, required: true, trim: true },
    toCity: { type: String, required: true, trim: true },
    durationHours: { type: Number, default: 1 },
    costUSD: { type: Number, default: 0 },
    vehicleType: { type: String, default: '' }
  },
  { timestamps: true }
)

const Transfer =
  models.Transfer || model<ITransfer>('Transfer', TransferSchema)

export default Transfer
