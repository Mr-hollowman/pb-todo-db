import express from "express";
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use('/',(req, res)=>{
    res.send({message:"welcome to the server"})
})

app.listen(process.env.PORT,()=>{
    console.log("app is running")
})