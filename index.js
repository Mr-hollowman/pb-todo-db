import express from "express";
import dotenv from 'dotenv'
import { connect } from "./connect.js";
import userRoutes from './routes/userRoutes.js'
import todoRoutes from './routes/todoRoutes.js'
import cookieParser from "cookie-parser";
import cors from 'cors'
const app = express();
dotenv.config()
app.use(cookieParser())
app.use(express.json())
app.use(cors())

app.use('/api/v1/users/', userRoutes)
app.use('/api/v1/todos/', todoRoutes)


app.use((err, req, res, next) => {
    const status = err.status || 500
    const message = err.message || "Something went wrong!";
    return res.status(status).json({
        success: false,
        status,
        message,
    })
})

app.listen(process.env.PORT, () => {
    connect()
    console.log("app is running")
})