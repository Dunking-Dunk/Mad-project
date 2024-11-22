import express, { Request, Response } from 'express'
import { Bus } from '../../models/Bus'
import { Stop } from '../../models/Stop'
import { Driver } from '../../models/Driver'
import { Announcement } from '../../models/Announcement'

const router = express.Router()

router.get('/api/data/quick-stats', async (req: Request, res: Response) => {
    const totalStops = await Stop.countDocuments({})
    const totalBus = await Bus.countDocuments({})
    const drivers = await Driver.countDocuments({})
    const announcements = await Announcement.countDocuments({})
    const activeBuses = await Bus.countDocuments({
        status: true,
    })
    const inactiveBuses = await Bus.countDocuments({
        status: false,
    })


    res.status(200).send({
        totalStops, totalBus, drivers, announcements, activeBuses, inactiveBuses,
        maintanceRequired: 5
    })
})

export { router as GetQuickStats }   