import mongoose from "mongoose";

export const connect = async () => {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("db connected")
    }).catch(err => { throw err })
}