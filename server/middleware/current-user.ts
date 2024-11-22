import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface UserPayload {
    id: string;
}

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload
        }
    }
}
 
export const currentUser = (req: Request, res: Response, next: NextFunction) => {

    if (!req.cookies.token) {
        return next()
    }

    try {
        const payload = jwt.verify(req.cookies.token, process.env.JWT_KEY!) as UserPayload

        req.currentUser = payload;
    }
    catch (err) {
        console.log(err)
            }

    next()
}

export const authorizeRole = (role: string) => {
    return (req: Request, res: Response, next: NextFunction) => { 
        // if (req.currentUser.)
    }
}