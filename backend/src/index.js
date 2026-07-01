import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import authRoutes from './routes/auth.routes.js'

dotenv.config()

const app = express()
app.use(cors({ origin: process.env.CLIENT_URL }))
app.use(express.json())

// Connect to MongoDB
connectDB()

// Routes
app.use('/api/auth', authRoutes)

// Health Check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
