import mongoose from "mongoose";

// mongoose.set('debug', true)
const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DB_NAME}`)
        console.log(`\nMongoDB Connected`);
        
    } catch (error) {
        console.log("Error in MongoDB Connection", error)
        process.exit(1)
    }
}


export default connectDB