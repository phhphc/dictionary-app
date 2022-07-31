import dotenv from 'dotenv'
dotenv.config()

import express, { Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import 'colors'

import { errorHandler } from './middlewares/error'
import path from 'path'
import { connectDB } from './configs/database'
import router from './routes'

connectDB()
const app = express()
const port = process.env.PORT

app.listen(port, () => {
    console.log(`[server] Server is running at http://localhost:${port}`)
    if (process.env.NODE_ENV == 'DEBUG') {
        console.warn(`[server] Server is running in debug mode`.red)
    }
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(router)

app.use(express.static(path.join(__dirname, '..', 'public')))
app.get('*', (req: Request, res: Response) => {
    const indexfile = path.join(__dirname, '..', 'public', 'index.html')
    res.sendFile(indexfile)
})

app.use(errorHandler)
