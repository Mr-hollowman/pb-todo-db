import mongoose from "mongoose";
import Users from "../model/Users.js";
import { createError } from "../connect.js";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
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

export const signin = async (req, res, next) => {
    try {
        const user = await Users.findOne({ email: req.body.email })
        if (!user) return next(createError(404, "User not found!"))
        const decryptPass = await bcrypt.compare(req.body.password, user.password)

        if (!decryptPass) return next(createError(400, "wrong credentials!"));

        const token = jwt.sign({ id: user._id }, process.env.JWT)
        const { password, ...others } = user._doc;
        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json(others)
    } catch (error) {
        next(error)
    }
}