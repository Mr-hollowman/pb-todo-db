import express from 'express'
import { createSubTodo, createTodo } from '../controllers/todoControllers.js'
import { verifyToken } from '../connect.js'

const router = express.Router()

router.post('/createTodo', verifyToken, createTodo)
router.post('/createSubTodo', verifyToken, createSubTodo)

export default router