import express from 'express'
import dotenv from 'dotenv'
import { clerkMiddleware } from '@clerk/express'
import { connectDB } from './lib/db.js'
import fileUpload from 'express-fileupload'
import path from "path"

import userRoutes from "./routes/user.route.js"
import adminRoutes from './routes/admin.route.js'
import authRoutes from './routes/auth.route.js'
import albumRoutes from './routes/album.route.js'
import songRoutes from './routes/song.route.js'
import statsRoutes from './routes/stats.route.js'

// ✅ Load environment variables before using them
dotenv.config()

console.log('→ MONGODB_URI is:', process.env.MONGODB_URI)

const maxSize = 10*1024*1024 // 10MB
const __dirname = path.resolve()
const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(express.json())
app.use(clerkMiddleware())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"),
    createParentPath: true,
    limits: { fileSize: maxSize },
}))

// Routes
app.use("/api/users", userRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/songs", songRoutes)
app.use("/api/albums", albumRoutes)
app.use("/api/stats", statsRoutes)

// Error handler
app.use((err, req, res, next) => {
    res.status(500).json({ message: process.env.NODE_ENV === "production" ? "Internal server error" : err.message })
})

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    connectDB()
})