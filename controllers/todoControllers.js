import Todo from "../model/Todo.js";
import Users from "../model/Users.js";
import { ObjectId } from "mongodb";
export const createTodo = async (req, res, next) => {
    const newTodo = {
        title: req.body.title,
        active: true,
        id: new ObjectId(),
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
        id: new ObjectId(),
        title: req.body.title,
        active: true
    }

    const updates = await Users.findByIdAndUpdate(req.user.id, {
        $push: { "todos.$[].subTodo": newSubTodo }
    }, { new: true })

    console.log(updates)
    res.send(updates)
}

export const createTodoNew = async (req, res, next) => {
    const newTodo = new Todo({
        creator: req.user.id,
        title: req.body.title,
        active: true,
        // id: new ObjectId(),
        subTodo: []
    })
    await newTodo.save()
    res.status(200).send({ message: "Todo has been created" })
}