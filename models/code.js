import mongoose, { model, models, Schema } from "mongoose";

const CodeSchema = new Schema({
  username: { type: String },
  name: { type: String, unique: true },
  code: { type: String }
}, {
  timestamps: true,
  expires: '24h'
});

export const Code = models?.Code || model('Code', CodeSchema);
