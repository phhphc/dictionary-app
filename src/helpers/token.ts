import { sign, verify } from 'jsonwebtoken'

const jwtSecret = process.env.JWT_SECRET as string

export interface TokenPayload {
    id: string
}

export const generateToken = (payload: TokenPayload) => {
    return sign(payload, jwtSecret, {
        algorithm: 'HS256',
        expiresIn: '30d',
    })
}

export const verifyToken = (token: string) => {
    return verify(token, jwtSecret) as TokenPayload
}
