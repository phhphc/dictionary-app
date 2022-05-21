import { Response } from "express"
import { JWTRequest } from "../middlewares/auth"
import expressAsyncHandler from "express-async-handler"

import User from '../models/user'
import { hashPassword } from "../helpers/password"

// @desc    Get user data
// @route   GET /api/user/
// @access  Authenticated only
export const getUser = expressAsyncHandler(async (req: JWTRequest, res: Response) => {
    const user = await User.findById(req.auth?.id).select('email name')

    if (user) {
        res.json({
            name: user.name,
            email: user.email
        })
    } else {
        res.status(404)
        throw new Error("User not found")
    }
})


// @desc    Update user account
// @route   PUT /api/user/
// @access  Authenticated only
type UpdateUserBody = {
    email?: string,
    password?: string,
    name?: string
}
export const updateUser = expressAsyncHandler(async (req: JWTRequest, res: Response) => {
    const { email, password, name }: UpdateUserBody = req.body

    // check if mail is duplicate
    if (await User.findOne({ email })) {
        res.status(409)
        throw new Error("Email duplicate")
    }

    // update user data
    const user = await User.findByIdAndUpdate(req.auth?.id, {
        email,
        password: password ? await hashPassword(password) : password,
        name
    }, { new: true }).select('email name')

    if (user) {
        res.json({
            name: user.name,
            email: user.email
        })
    } else {
        res.status(404)
        throw new Error("User not found")
    }
})


// @desc    Delete user account and all related data
// @route   DELETE /api/user/
// @access  Authenticated only
export const deleteUser = expressAsyncHandler(async (req: JWTRequest, res: Response) => {
    const { deletedCount } = await User.deleteOne({ _id: req.auth?.id })

    if (deletedCount) {
        res.status(204).send()
    } else {
        res.status(404)
        throw new Error("User not found")
    }
}) 