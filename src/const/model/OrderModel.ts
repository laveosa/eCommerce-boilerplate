import mongoose, { Model, Schema } from "mongoose";

import { defaultSchemaOptions } from "#src/util/config/mongoose-options.js";
import type { OrderModel } from "#src/const/scheme/OrderScheme.js";

export const OrderDbSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      trim: true,
    },
    cartId: {
      type: Schema.Types.ObjectId,
      ref: "Cart",
      trim: true,
    },
    registerDate: {
      type: Date,
    },
    address: {
      type: String,
    },
  },
  defaultSchemaOptions,
);

export const Order: Model<OrderModel> = mongoose.model<OrderModel>(
  "Order",
  OrderDbSchema,
);
