import express, { Request, Response } from 'express'
import Point from '../../models/Point'
import moment from 'moment'

const router = express.Router()

router.get('/api/data/backtrack/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    const { days }: any = req.query
    const start = moment().subtract(days, "days")

    const allCoords = await Point.find({ $and: [{ trackerId: id }, { createdAt: { $gt: start } }] }).select('location')

    res.status(200).send(allCoords)
})

export { router as GetBackTrackBus }   