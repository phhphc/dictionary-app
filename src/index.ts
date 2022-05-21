import express from 'express'
import dotenv from 'dotenv'

import { errorHandler } from './middlewares/errorMiddleware'
import authRoutes from './routes/authRoutes'

dotenv.config()

const app = express()
const port = process.env.PORT

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
  if (process.env.NODE_ENV == 'DEBUG') {
    console.warn(`[server]: Server is running in debug mode`)
  }
});

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/api/auth", authRoutes)

app.use(errorHandler)