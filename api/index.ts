import express from "express";
import type { Request, Response } from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from "../src/config/db.js";  
import authRoutes from "../src/routes/auth.routes.js";  

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: '*', // Update this with your frontend URL in production
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB()
  .then(() => {
    console.log('✅ Database connection established');
  })
  .catch((err) => {
    console.error('❌ Database connection failed:', err);
  });

// Health check endpoint - MUST be defined
app.get("/", (req: Request, res: Response) => {
    res.status(200).json({ 
        message: "Vibe Chat API is running",
        status: "healthy",
        timestamp: new Date().toISOString(),
        endpoints: {
            health: "/",
            auth: "/api/auth"
        }
    });
});

// Test endpoint
app.get("/api/test-env", (req: Request, res: Response) => {
    res.status(200).json({
        mongoConfigured: !!process.env.MONGO_URI,
        jwtConfigured: !!process.env.JWT_SECRET,
        port: process.env.PORT || 'not set',
        nodeEnv: process.env.NODE_ENV || 'not set'
    });
});

// API Routes
app.use("/api/auth", authRoutes);

app.use((req: Request, res: Response) => {
    res.status(404).json({
        error: "Route not found",
        path: req.path,
        method: req.method
    });
});

// Error handler
app.use((err: any, req: Request, res: Response, next: any) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        error: err.message || "Internal server error",
        path: req.path
    });
});

export default app;

// For local development
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
        console.log(process.env.JWT_REFRESH_SECRET);
        
    });
}