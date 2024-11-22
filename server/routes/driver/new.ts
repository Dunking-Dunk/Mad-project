import express, {Request, Response} from 'express'
import { Driver } from '../../models/Driver';
import { body } from 'express-validator';
import {requireAuth} from '../../middleware/require-auth'
import { ValidateRequest } from '../../middleware/validate-request'
import { v2 as cloudinary } from 'cloudinary'

const router = express.Router()

router.post('/api/driver',requireAuth,
    async (req: Request, res: Response) => {

        const result = await cloudinary.uploader.upload(req.body.image, {
                folder: 'driver'
        })
        req.body.image = {
            public_id: result.public_id,
            url: result.secure_url
        }
            const driver = Driver.build(req.body)
           await driver.save()
           res.json(driver).status(201)
})

export { router as NewDriver}