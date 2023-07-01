import express from "express";
import dotenv from 'dotenv'
import { connect } from "./connect.js";
import userRoutes from './routes/userRoutes.js'
import cookieParser from "cookie-parser";

dotenv.config()
const app = express();

app.use(cookieParser())
app.use(express.json())

app.use('/api/v1/users/', userRoutes)

app.use('/', (req, res) => {
    res.send({ message: "welcome to the server" })
})

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