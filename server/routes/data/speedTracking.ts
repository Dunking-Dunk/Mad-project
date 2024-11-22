import express, { Request, Response } from 'express'
import Point from '../../models/Point'
import moment from 'moment'

const router = express.Router()

router.get('/api/data/speedtracking/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    const { days }: any = req.query
    const start = moment().subtract(days, "days")

    const allSpeed = await Point.find({ $and: [{ trackerId: id }, { createdAt: { $gt: start } }] }).select('speed createdAt')

    res.status(200).send(allSpeed)
})

export { router as GetSpeedTracking }   