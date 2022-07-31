import { Router } from 'express'
import { loadMedia } from '../controllers/media.controller'

const mediaRouter = Router()

mediaRouter.get('*', loadMedia)

export default mediaRouter
