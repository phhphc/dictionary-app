import { Request, Response, NextFunction } from 'express'

const debug = process.env.NODE_ENV === 'DEBUG'

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (res.headersSent) {
        return next(err)
    }

    res.status(res.statusCode !== 200 ? res.statusCode : 500)

    res.json({
        message: res.statusCode !== 500 ? err.message : 'Internal Server Error',
        stack: debug ? err.stack : null,
    })
}
