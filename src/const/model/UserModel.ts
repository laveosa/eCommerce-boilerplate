import mongoose, { type Model, Schema } from "mongoose";

import { defaultSchemaOptions } from "#src/util/config/mongoose-options.js";
import type { UserModel } from "#src/const/scheme/UserScheme.js";

export const UserDbSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  defaultSchemaOptions,
);

export const User: Model<UserModel> = mongoose.model<UserModel>(
  "User",
  UserDbSchema,
);
