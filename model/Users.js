import mongoose from "mongoose";

const UserScema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    img: { type: String, },
}, { timestamps: true })

export default mongoose.model("User", UserScema)