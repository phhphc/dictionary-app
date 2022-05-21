import expressAsyncHandler from "express-async-handler"
import { Request, Response, NextFunction } from "express"

import { verifyToken, TokenPayload } from "../helpers/token"

export interface JWTRequest extends Request {
    auth?: TokenPayload
}

export const protect = expressAsyncHandler(async (req: JWTRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.token
    if (!token) {
        throw new Error("No token found in cookies")
    }

    try {
        const decodedToken = verifyToken(token)
        req.auth = decodedToken
        next()
    } catch (err) {
        res.status(401)
        throw err
    }
})