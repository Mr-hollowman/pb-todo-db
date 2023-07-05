import express from 'express'
import { createTodo } from '../controllers/todoControllers.js'
import { verifyToken } from '../connect.js'

const router = express.Router()

router.post('/createTodo', verifyToken, createTodo)

export default router