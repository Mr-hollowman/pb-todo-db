import mongoose from "mongoose";

export const connect = async () => {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("db connected")
    }).catch(err => { throw err })
}

export const createError = (status, message)=>{
    const err = new Error()
    err.status = status
    err.message = message
    return err
}