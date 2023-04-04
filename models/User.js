import mongoose from "mongoose";
const {Schema, model} = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true, //limpia los espacios
        unique: true, //que sea único
        lowercase: true,
        index: { unique: true }, //búsquedas mas rápidas
    },
    password: {
        type: String,
        required: true,
    },
});

export const User = mongoose.model("User", userSchema);