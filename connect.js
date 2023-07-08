import { MongoClient } from "mongodb";
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";
export const connect = async () => {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("db connected")
    }).catch(err => { throw err })
}

export const createError = (status, message) => {
    const err = new Error()
    err.status = status
    err.message = message
    return err
}

export const verifyToken = (req, res, next) => {
    console.log(req.cookies.access_token,"token")
    const token = req.cookies.access_token;
    if (!token) return next(createError(401, "You are not authendicated!"))

    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(createError(403, "Token is not valid"))
        req.user = user
        next()
    })
}