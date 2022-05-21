import { Request, Response } from "express"
import expressAsyncHandler from "express-async-handler"

import User from '../models/userModels'

// @desc User login
// @route POST /api/user/login
// @access Public
type LoginBody = {
    email?: string
    password?: string
}
export const login = expressAsyncHandler(async (req: Request, res: Response) => {
    const loginBody: LoginBody = req.body

    if (!loginBody.email) {
        res.status(400)
        throw Error("email attribute not found")
    }
    if (!loginBody.password) {
        res.status(400)
        throw Error("Password attribute not found")
    }

    const user = User.findOne()

    res.status(200).send()
})


// @desc User register
// @route POST /api/user/register
// @access Public
type RegisterBody = {
    email?: string,
    password?: string,
    name?: string
}
export const register = expressAsyncHandler(async (req: Request, res: Response) => {
    const registerBody: RegisterBody = req.body

    if (!registerBody.email) {
        res.status(400)
        throw Error("email not set")
    }
    if (!registerBody.password) {
        res.status(400)
        throw Error("password not set")
    }
    if (!registerBody.name) {
        res.status(400)
        throw Error("name not set")
    }


    const user = await User.create({
        email: registerBody.email,
        password: registerBody.password,
        name: registerBody.name
    })


    res.json(user)
})


// @desc User logout
// @route POST /api/user/logout
// @access Public
export const logout = (req: Request, res: Response) => {
    res.status(401).send("logout fail")
}