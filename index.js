import express from "express";
import dotenv from 'dotenv'
import { connect } from "./connect.js";
import userRoutes from './routes/userRoutes.js'
import todoRoutes from './routes/todoRoutes.js'
import cookieParser from "cookie-parser";

dotenv.config()
const app = express();

app.use(express.json())

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(cookieParser())

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