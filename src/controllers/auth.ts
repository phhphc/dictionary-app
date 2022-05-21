import { Request, Response } from "express"
import expressAsyncHandler from "express-async-handler"


import User from '../models/user'
import { hashPassword, comparePassword } from "../helpers/password"
import { generateToken } from '../helpers/token'

// @desc    User login
// @route   POST /api/user/login
// @access  Public
type LoginBody = {
    email?: string
    password?: string
}
export const login = expressAsyncHandler(async (req: Request, res: Response) => {
    const { email, password }: LoginBody = req.body

    if (!email || !password) {
        res.status(400)
        throw new Error("Make sure email, password field is included")
    }

    // Check if username and password math
    const user = await User.findOne({ email })
    if (!user || !await comparePassword(password, user.password)) {
        res.status(401)
        throw new Error("User name or password incorrect")
    }

    res.status(200)
        .cookie('token', generateToken({ id: user._id.toString() }), { httpOnly: true, })
        .send()
})


// @desc    User register
// @route   POST /api/user/register
// @access  Public
type RegisterBody = {
    email?: string,
    password?: string,
    name?: string
}
export const register = expressAsyncHandler(async (req: Request, res: Response) => {
    const { email, password, name }: RegisterBody = req.body

    if (!email || !password || !name) {
        res.status(400)
        throw new Error("Make sure email, password, name field is included")
    }

    // Check user exists
    if (await User.findOne({ email })) {
        res.status(409)
        throw new Error("Email already exists")
    }

    // Create User
    const user = await User.create({
        email,
        password: await hashPassword(password),
        name
    })

    res.status(200)
        .cookie('token', generateToken({ id: user._id.toString() }), { httpOnly: true, })
        .send()
})