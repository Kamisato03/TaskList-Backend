import mongoose from "mongoose";
const {Schema, model} = mongoose;
import bcryptjs from 'bcryptjs';

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

userSchema.pre("save", async function(next){
    const user = this;
    if(!user.isModified('password')) return next()

    try {
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(user.password, salt);
        next()
    } catch (error) {
        console.log(error)
        throw new Error('Fallo el hash de password')
    }
});

userSchema.methods.comparePassword = async function(candidatePassword){
    return await bcryptjs.compare(candidatePassword, this.password);
}



export const User = model("User", userSchema);