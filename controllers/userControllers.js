import mongoose from "mongoose";
import Users from "../model/Users.js";
import { createError } from "../connect.js";
import bcrypt from 'bcryptjs'

export const signup = async (req, res, next) => {
    try {
        const user = await Users.findOne({ email: req.body.email })
        if (user) {
            next(createError(400, "This email Id is already used, please try Login"))
        }
        else {
            const salt = bcrypt.genSaltSync(15);
            const hash = bcrypt.hashSync(req.body.password, salt)
            const newUser = new Users({ ...req.body, password: hash })
            await newUser.save()
            res.status(200).send({ message: "User has been created" })
        }
    } catch (error) {
        next(error)
    }
}