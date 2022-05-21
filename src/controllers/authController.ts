import { Request, Response } from "express"
import expressAsyncHandler from "express-async-handler"

// @desc User login
// @route POST /api/auth/login
// @access Public
type LoginBody = {
    username?: String
    password?: String
}
export const login = expressAsyncHandler(async (req: Request, res: Response) => {
    const loginBody: LoginBody = req.body

    if (!loginBody.username) {
        res.status(400)
        throw Error("Username attribute not found")
    }

    if (!loginBody.password) {
        res.status(400)
        throw Error("Password attribute not found")
    }

    res.status(200).send()
})

// @desc User register
// @route POST /api/auth/register
// @access Public
export const register = expressAsyncHandler(async (req: Request, res: Response) => {
    res.status(401).send("register fail")
})

// @desc User logout
// @route POST /api/auth/logout
// @access Public
export const logout = (req: Request, res: Response) => {
    res.status(401).send("logout fail")
}