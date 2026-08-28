import mongoose, { Schema, Model } from "mongoose";

import { defaultSchemaOptions } from "#src/util/config/mongoose-options.js";
import type { ProductModel } from "#src/const/scheme/ProductScheme.js";

export const ProductDbSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, auto: false },
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
    quantity: {
      type: Number,
      default: 1,
    },
    inCart: {
      type: Boolean,
      default: false,
    },
  },
  defaultSchemaOptions,
);

/*export type IProduct = InferSchemaType<typeof ProductDbSchema>;*/

export const Product: Model<ProductModel> = mongoose.model<ProductModel>(
  "Product",
  ProductDbSchema,
);
