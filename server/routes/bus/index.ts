import express, { Request, Response } from 'express'
import { Bus } from '../../models/Bus'

const router = express.Router()

router.get('/api/bus', async (req: Request, res: Response) => { 
    const { search, populate, timing } = req.query

    let buses;
    if (search) {
        buses = await Bus.find({
            $or: [{ busNumber: search}, { busName: { $regex: search, $options: 'i' } }]
}).populate('stops')
    } else if (timing) {
        if (timing === '1:00') buses = await Bus.find({ returnAfter1: true }).populate('stops')
        else if (timing === '5:00') buses = await Bus.find({ returnAfter5: true }).populate('stops')
        else buses = await Bus.find({ returnAfter315: true }).populate('stops')
    } else {
        if (populate === 'true')  buses = await Bus.find({status: true}).populate('stops')
        else buses = await Bus.find({})
    }

    res.status(200).json(buses)
})

export {router as GetAllBusRoute}   