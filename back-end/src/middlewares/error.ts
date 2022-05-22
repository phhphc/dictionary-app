import { Request, Response, NextFunction } from "express"

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
        return next(err)
    }

    res.status(res.statusCode !== 200 ? res.statusCode : 500)

    if (process.env.NODE_ENV === 'DEBUG') {
        res.json({
            message: err.message,
            stack: err.stack
        })
    } else if (res.statusCode != 500) {
        res.json({
            message: err.message,
        })
    } else {
        res.send()
        console.error(err.stack)
    }
}