import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    todos: { type: Array }
}, { timestamps: true })

export default mongoose.model("Todos", TodoSchema)