import express from 'express'
import dotenv from 'dotenv'
import 'colors'

import { errorHandler } from './middlewares/error'
import { connectDB } from './configs/database'
import { authRouter, userRouter } from './routes'

dotenv.config()
connectDB()

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

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)

app.use(errorHandler)