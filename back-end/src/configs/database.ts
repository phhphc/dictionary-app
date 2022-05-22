import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI as string)
        console.log(`[database]: Connected to MongoDB at ${conn.connection.host}`.cyan.underline)
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}