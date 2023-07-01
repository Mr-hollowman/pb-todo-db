import express from 'express'
import { createTodo } from '../controllers/todoControllers.js'

const router = express.Router()

router.post('/createTodo', createTodo)

export default router