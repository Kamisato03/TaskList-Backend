import mongoose from "mongoose";
const {Schema, model} = mongoose;

const taskSchema = new Schema({
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    }
});

export const Task = mongoose.model("Task", taskSchema);
