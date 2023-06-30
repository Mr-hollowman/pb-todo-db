import express from "express";
import dotenv from 'dotenv'
import { connect } from "./connect.js";

dotenv.config()
const app = express()

app.use('/',(req, res)=>{
    res.send({message:"welcome to the server"})
})

app.listen(process.env.PORT,()=>{
    connect()
    console.log("app is running")
})