import mongoose from "mongoose";
import Users from "../model/Users.js";
import { ObjectId } from "mongodb";
export const createTodo = async (req, res, next) => {
    const newTodo = {
        title: req.body.title,
        active: true,
        id: new ObjectId()
    }
    try {
        const updates = await Users.findByIdAndUpdate(req.user.id, {
            $push: { todos: newTodo }
        }, { new: true })
        res.status(200).json(updates.todos)
    } catch (error) {
        next(error)
    }
}

export const createSubTodo = async (req, res, next) => {
    const newSubTodo = {
        id: req.body.id,
        title: req.body.title,
        active: true
    }

    const updates = await Users.findOneAndUpdate(req.user.id, {
        $push:{}
    })
}