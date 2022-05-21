import { Request, Response, NextFunction } from "express"

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(res.statusCode ? res.statusCode : 500)

    if (process.env.NODE_ENV === 'DEBUG') {
        res.json({
            message: err.message,
            stack: err.stack
        })
    } else {
        res.send()
    }
}