// server/models/Animal.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAnimal extends Document {
  name: string;
  slug: string;
  category?: string;
  scientificName?: string;

  // Support both field names for compatibility
  image?: string;
  featuredImage?: string;
  gallery?: string[];

  shortDescription?: string;
  description?: string;

  habitat?: string;
  behavior?: string;
  diet?: string;
  conservationStatus?: string;

  size?: {
    height?: string;
    weight?: string;
  };

  lifespan?: string;
  range?: string;

  tags?: string[];
}

const AnimalSchema = new Schema<IAnimal>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },

    category: { type: String },

    scientificName: { type: String },

    // Store both for compatibility
    image: { type: String },
    featuredImage: { type: String },
    gallery: [{ type: String }],

    shortDescription: { type: String },
    description: { type: String },

    habitat: { type: String },
    behavior: { type: String },
    diet: { type: String },
    conservationStatus: { type: String },

    size: {
      height: { type: String },
      weight: { type: String },
    },

    lifespan: { type: String },
    range: { type: String },

    tags: [{ type: String }],
  },
  { timestamps: true }
);

// Auto-generate slug only when missing
AnimalSchema.pre("validate", function (next) {
  if (this.name && !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }
  next();
});

// Middleware to sync image and featuredImage fields
AnimalSchema.pre("save", function (next) {
  // If featuredImage is provided but image is not, copy it
  if (this.featuredImage && !this.image) {
    this.image = this.featuredImage;
  }
  // If image is provided but featuredImage is not, copy it
  if (this.image && !this.featuredImage) {
    this.featuredImage = this.image;
  }
  next();
});

export default (mongoose.models.Animal as Model<IAnimal>) ||
  mongoose.model<IAnimal>("Animal", AnimalSchema);