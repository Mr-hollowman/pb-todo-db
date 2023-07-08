import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "Users", require:true },
    title: { type: String, require: true },
    subTodo: { type: Array },
    active: { type: Boolean, require:true }
}, { timestamps: true })

export default mongoose.model("Todos", TodoSchema)