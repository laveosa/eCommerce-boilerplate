import type { SchemaOptions } from "mongoose";

type TransformOptions = SchemaOptions["toObject"] & SchemaOptions["toJSON"];

export const defaultTransformOptions: TransformOptions = {
  virtuals: true,
  versionKey: false,
  aliases: true,
  getters: true,
  transform: (doc, ret, options) => {
    delete ret._id;
    return ret;
  },
};

export const defaultSchemaOptions: SchemaOptions = {
  timestamps: true,
  toObject: defaultTransformOptions,
  toJSON: defaultTransformOptions,
};
