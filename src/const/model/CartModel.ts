import mongoose, { type Model, Schema } from "mongoose";

import { defaultSchemaOptions } from "#src/util/config/mongoose-options.js";
import { ProductDbSchema } from "#src/const/model/ProductModel.js";
import type { CartModel } from "#src/const/scheme/CartScheme.js";

export const CartDbSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    registerDate: {
      type: Date,
    },
    products: [ProductDbSchema],
    totalItems: {
      type: Number,
    },
    totalPrice: {
      type: Number,
    },
  },
  defaultSchemaOptions,
);

export const Cart: Model<CartModel> = mongoose.model<CartModel>(
  "Cart",
  CartDbSchema,
);
