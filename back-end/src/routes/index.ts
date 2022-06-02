import { Router } from 'express'

import authRouter from './auth'
import userRouter from './user'
import dictRouter from './dict'

const router = Router()

router.use('/api/auth', authRouter)
router.use('/api/user', userRouter)
router.use('/api/dict', dictRouter)

export default router
