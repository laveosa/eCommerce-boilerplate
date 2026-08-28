import mongoose, { type Model, Schema } from "mongoose";

import { defaultSchemaOptions } from "#src/util/config/mongoose-options.js";
import type { AuthModel } from "#src/const/scheme/AuthScheme.js";

export const AuthDbSchema = new Schema(
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

export const Auth: Model<AuthModel> = mongoose.model<AuthModel>(
  "Auth",
  AuthDbSchema,
);
