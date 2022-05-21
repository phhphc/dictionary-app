import { Router } from "express";

import { updateUser, deleteUser, getUser } from "../controllers/user";
import { protect } from "../middlewares/auth";

const userRouter = Router()

userRouter.use(protect)

userRouter.get('/', getUser)
userRouter.put('/', updateUser)
userRouter.delete('/', deleteUser)

export default userRouter