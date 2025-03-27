import express, { json } from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import userRoute from "./Routes/userRoute.js"
import { adminRoute } from "./Routes/adminRoute.js"
import cors from 'cors';
import path from "path"

dotenv.config()
const app=express()


app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))

app.use(json())
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use('/',userRoute)
app.use('/',adminRoute)

mongoose.connect('mongodb://mongodb:27017/Bookify').then(()=>{
 console.log('MongoDB connected successfully')   
})
.catch ((error)=>
{
    console.error("Connection failed !",error)
})

app.listen(process.env.PORT,function(){
    console.log("Welcome to Bookify");
});
