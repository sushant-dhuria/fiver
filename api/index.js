import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import gigRoutes from './routes/gigRoutes.js';
import messageRoutes from './routes/messageRoutes.js'
import conversationRoutes from './routes/conversationRoutes.js'
import reviewRoutes from './routes/reviewRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import cookieParser from "cookie-parser";
import cors from 'cors'
const app=express();
dotenv.config();

mongoose.set('strictQuery',true);
const connect=async()=>{
try{
await mongoose.connect(process.env.MONGODB);

console.log("database connected");
}
catch(error)
{
console.log(error);
}
};
app.use(cors({
  origin:"http://127.0.0.1:5173/",
  sameSite:"none",
credentials:true,
}))
// const corsOptions = {
//   origin: 'http://127.0.0.1:5173/', // Allow requests from this origin
//   methods: ['GET', 'POST'], // Allow these HTTP methods
//   allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
//   credentials: true, // Allow cookies to be sent with requests
// };
// app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRoutes)
app.use("/api/user",userRoutes)
app.use("/api/gigs",gigRoutes)
app.use("/api/orders",orderRoutes)
app.use("/api/messages",messageRoutes)
app.use("/api/conversations",conversationRoutes)
app.use("/api/reviews",reviewRoutes)
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).send(errorMessage);
  });
app.listen(8800,()=>{
    console.log("backend server running");
    connect();
})