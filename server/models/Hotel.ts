import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IHighSeasonRow {
  startDate: string;
  endDate: string;
  roomType: string;
  mealPlan: string;
  priceUSD: number;
}

export interface ILowSeasonRow {
  roomType: string;
  mealPlan: string;
  priceUSD: number;
}

export interface IChildPolicyRow {
  minAge: number;
  maxAge: number;
  discountPercent: number;
  description?: string;
}

export interface ISpecialDateRow {
  date: string;
  extraPerPersonUSD: number;
  note?: string;
}

export interface IHotel extends Document {
  name: string;
  destination?: string;
  activityTypes: string[];
  range?: string;

  pricingYear: number;
  highSeason: IHighSeasonRow[];
  lowSeason: ILowSeasonRow[];

  childPolicies: IChildPolicyRow[];
  specialDates: ISpecialDateRow[];

  createdAt: Date;
  updatedAt: Date;
}

const HighSeasonSchema = new Schema<IHighSeasonRow>(
  {
    startDate: { type: String, required: false },
    endDate: { type: String, required: false },
    roomType: { type: String, required: false },
    mealPlan: { type: String, required: false },
    priceUSD: { type: Number, required: false, default: 0 }
  },
  { _id: false }
);

const LowSeasonSchema = new Schema<ILowSeasonRow>(
  {
    roomType: { type: String, required: false },
    mealPlan: { type: String, required: false },
    priceUSD: { type: Number, required: false, default: 0 }
  },
  { _id: false }
);

const ChildPolicySchema = new Schema<IChildPolicyRow>(
  {
    minAge: { type: Number, required: false, default: 0 },
    maxAge: { type: Number, required: false, default: 0 },
    discountPercent: { type: Number, required: false, default: 0 },
    description: { type: String }
  },
  { _id: false }
);

const SpecialDateSchema = new Schema<ISpecialDateRow>(
  {
    date: { type: String, required: false },
    extraPerPersonUSD: { type: Number, required: false, default: 0 },
    note: { type: String }
  },
  { _id: false }
);

const HotelSchema = new Schema<IHotel>(
  {
    name: { type: String, required: true },
    destination: { type: String },
    activityTypes: [{ type: String }],
    range: { type: String },

    pricingYear: { type: Number, default: new Date().getFullYear() },
    highSeason: [HighSeasonSchema],
    lowSeason: [LowSeasonSchema],

    childPolicies: [ChildPolicySchema],
    specialDates: [SpecialDateSchema]
  },
  { timestamps: true }
);

const Hotel: Model<IHotel> =
  (mongoose.models.Hotel as Model<IHotel>) || mongoose.model<IHotel>('Hotel', HotelSchema);

export default Hotel;
