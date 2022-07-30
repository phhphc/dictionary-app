import { Router } from 'express'

import { login, register, logout } from '../controllers/auth'

const authRouter = Router()

authRouter.post('/login', login)
authRouter.post('/register', register)
authRouter.post('/logout', logout)

export default authRouter
