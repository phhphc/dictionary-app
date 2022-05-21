import { Router } from "express";

import { updateUser, deleteUser } from "../controllers/user";

const userRouter = Router()

userRouter.put('/:id', updateUser)
userRouter.delete('/:id', deleteUser)

export default userRouter