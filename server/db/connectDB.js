import mongoose from "mongoose";

export const connectDB = async()=>{
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected at ${ connect.connection.host}`);
    } catch (error) {
        console.log("Error connecting to MongoDB", error.message);
        process.exit(1); //failure        
    }
}