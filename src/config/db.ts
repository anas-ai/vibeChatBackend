import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
    const mongoUri = process.env.MONGO_URI;
    
    if (!mongoUri) {
        console.error('❌ MONGO_URI is not defined in environment variables');
        throw new Error('MONGO_URI is missing in environment variables');
    }

    try {
        await mongoose.connect(mongoUri);
        console.log('✅ MongoDB connected successfully to database:', mongoose.connection.name);
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        process.exit(1);
    }
}

export default connectDB;