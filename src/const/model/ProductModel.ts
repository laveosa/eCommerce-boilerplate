import mongoose, { Schema, Model } from "mongoose";

import { defaultSchemaOptions } from "#src/util/config/mongoose-options.js";
import type { InferSchemaType } from "mongoose";

export const ProductDbSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  defaultSchemaOptions,
);

export type IProduct = InferSchemaType<typeof ProductDbSchema>;

export const Product: Model<IProduct> = mongoose.model<IProduct>(
  "Product",
  ProductDbSchema,
);
