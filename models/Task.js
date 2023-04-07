import mongoose from "mongoose";
import mongooseSoftdelete from "mongoose-softdelete";
const { Schema, model } = mongoose;

const taskSchema = new Schema(
  {
    tittle: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 15,
    },
    description: {
      type: String,
      required: true,
      minlength: 5,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    priority: {
      type: String,
      enum: ["alta", "media", "baja"],
      default: "media",
    },
    completed: {
      type: Boolean,
      default: false,
    },
    uid: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

taskSchema.plugin(mongooseSoftdelete);

export const Task = model("Task", taskSchema);
