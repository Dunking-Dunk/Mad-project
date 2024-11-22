import express, { Request, Response } from "express";
import { body } from 'express-validator'
import { BadRequestError } from '../../errors/bad-request-error'
import { ValidateRequest } from "../../middleware/validate-request";
import { User } from '../../models/User'
import jwt from 'jsonwebtoken'

const router = express.Router();

const options: {
  expires: any,
  httpOnly: boolean
} = {
  expires: new Date(
    Date.now() + 24 * 60 * 60 * 1000 * 2
  ),
  httpOnly: true
}

router.post('/api/users/signup',
  [body('email').isEmail().withMessage('Email must be valid'),
  body('name').isLength({ min: 5 }).withMessage('name must be greater than 5 characters'),
  body('password').trim().isLength({ min: 5, max: 20 }).withMessage('password must be between 5 and 20 character')]
  , ValidateRequest,
  async (req: Request, res: Response) => {

    const { email, password, name, role } = req.body

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      throw new BadRequestError('email in use')
    }

    const user = User.build({ email, password, name, role })
    await user.save()

    const userJwt = jwt.sign({
      id: user.id,
    }, process.env.JWT_KEY!, {
      expiresIn: process.env.JWT_EXPIRATION
    })

    res.status(200).cookie('token', userJwt, options).json(user)
  })

export { router as signupRouter }