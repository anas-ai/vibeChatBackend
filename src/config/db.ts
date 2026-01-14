import mongoose from "mongoose";
import dotenv from 'dotenv';


dotenv.config();

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log('MongoDB connected');

    } catch (error) {
        console.log("mongoDB connection error:", error);
        process.exit(1)
    }
}

export default connectDB