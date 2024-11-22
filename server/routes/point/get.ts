import express, { Request, Response } from 'express'

import { Point } from '../../models/Point'

const router = express.Router()

router.get('/api/point', async (req: Request, res: Response) => { 
    const points = await Point.find({})

    res.status(200).send(points)
})

export {router as getAllPoints}