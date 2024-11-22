import express, { Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { body } from 'express-validator'
import { User } from "../../models/User";
import { BadRequestError } from '../../errors/bad-request-error';
import { ValidateRequest } from "../../middleware/validate-request";
import { Password } from "../../services/password";

const router = express.Router();

router.post('/api/users/signin', [
    body('email').isEmail().withMessage('email must be valid'),
    body('password').trim().notEmpty().withMessage('you must apply a password')
], ValidateRequest,
    async (req: Request, res: Response) => {
        const { email, password } = req.body

        const existingUser = await User.findOne({ email })
        if (!existingUser) {
            throw new BadRequestError('Invalid Credentials')
        }
        const passwordMatch = await Password.compare(existingUser.password, password)

        if (!passwordMatch) {
            throw new BadRequestError('Invalid Credentials')
        }
        const userJwt = jwt.sign({
            id: existingUser.id,
        }, process.env.JWT_KEY!, {
            expiresIn: process.env.JWT_EXPIRATION
        })
        const options: {
            expires: any,
            httpOnly: boolean
        } = {
            expires: new Date(
                Date.now() + 24 * 60 * 60 * 1000 * 2
            ),
            httpOnly: true
        }

        res.status(200).cookie('token', userJwt, options).json({ email: existingUser.email, name: existingUser.name, role: existingUser.role, accessToken: userJwt })
    })

export { router as signinRouter }