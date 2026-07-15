import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './src/database/db.js'
import authRoutes from './src/routes/auth.routes.js'

dotenv.config();


const app = express();


app.use(express.json())
app.use(cors())

app.use('/api/auth', authRoutes)

const port = process.env.PORT || 3000

connectDB()

app.listen(port, () => {
    console.log(`Server has started on port: ${port}`)
})