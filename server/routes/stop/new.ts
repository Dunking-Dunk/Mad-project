import express, {Request, Response} from 'express'
import { Stop } from "../../models/Stop";
import { body } from 'express-validator';
import {requireAuth} from '../../middleware/require-auth'
import {ValidateRequest} from '../../middleware/validate-request'
import { io } from '../../app';

const router = express.Router()

router.post('/api/stop',requireAuth,
    [
        body('location').not().isEmpty().withMessage('coordinates are required'),
        body('name').not().isEmpty().withMessage('name is required'),
        body('address').not().isEmpty().withMessage('name is required'),
], ValidateRequest, async (req: Request, res: Response) => {
    const stop = Stop.build(req.body)
        await stop.save()
    
        io.emit('newStopAdded',stop)

    res.json(stop).status(201)
})

export { router as NewStopRoute}