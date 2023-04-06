import mongoose from "mongoose";
const { Schema, model } = mongoose;

const linkSchema = new Schema({
  longLink: {
    type: String,
    require: true,
    trim: true,
  },
  nanoLink: {
    type: String,
    require: true,
    trim: true,
    unique: true,
  },
  uid: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: "User",
  },
});

export const Link = model("Link", linkSchema);
