import express from 'express'
import dotenv from 'dotenv'
import { clerkMiddleware } from '@clerk/express'
import { connectDB } from './lib/db.js'
import fileUpload from 'express-fileupload'
import path from "path" //node nodule using with fileUpload

import userRoutes from "./routes/user.route.js"
import adminRoutes from "./routes/admin.route.js"
import authRoutes from './routes/auth.route.js'
import albumRoutes from './routes/album.route.js'
import songRoutes from './routes/song.route.js'
import statsRoutes from './routes/stats.route.js'

dotenv.config()

const maxSize = 10*1024*1024 // 10MB
const __dirname = path.resolve()
const app = express()
const PORT = process.env.PORT;

//these app.uses are using build in framework like express, fileupload etc

app.use(express.json())
app.use(clerkMiddleware()) // adds auth to user path
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"),
    createParentPath: true,
    limits: {
        fileSize: maxSize 
    },
}))


app.use("/api/users", userRoutes) 
app.use("/api/admin", adminRoutes) 
app.use("/api/auth", authRoutes) 
app.use("/api/songs", songRoutes) 
app.use("/api/albums", albumRoutes) 
app.use("/api/stats", statsRoutes) 

//error handler, this is what comes out when our next(error) is triggered
app.use((err, req, res, next) => {
    res.status(500).json({ message: process.env.NODE_ENV === "production" ? "Internal server error": err.message })
})
  
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    connectDB()
})
