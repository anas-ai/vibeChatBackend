import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from "../src/config/db.js";  
import authRoutes from "../src/routes/auth.routes.js";  


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json())

connectDB()
app.use("/api/auth", authRoutes)

export default app