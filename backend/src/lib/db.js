import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Connectedd to mongoDB ${conn.connection.host}`)
    } catch (error) {
        console.log("failed to connect to MongoDB", error.message)
        process.exit(1)

    }
}
