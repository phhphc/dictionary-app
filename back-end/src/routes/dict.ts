import { Router } from 'express'

import {
    getUserDict,
    addUserDict,
    updateUserDict,
    deleteUserDict,
} from '../controllers/dict'
import { protect } from '../middlewares/auth'

const dictRouter = Router()

dictRouter.use(protect)

dictRouter.get('/', getUserDict)
dictRouter.post('/', addUserDict)
dictRouter.put('/:id', updateUserDict)
dictRouter.delete('/:id', deleteUserDict)

export default dictRouter
