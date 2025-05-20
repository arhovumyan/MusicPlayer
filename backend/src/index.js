import express from 'express'
import dotenv from 'dotenv'
import userRoutes from "./routes/user.route.js"
import cors from 'cors'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT;

app.use("/api/users", userRoutes)

app.get('/', (req, res) => {
    res.send('Backend is running');
});
  
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
