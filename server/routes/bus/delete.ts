import express, { Request, Response } from 'express'
import { NotFoundError } from '../../errors/not-found-error'
import { requireAuth } from '../../middleware/require-auth'
import { Bus } from '../../models/Bus'
import { Stop } from '../../models/Stop'
import { Tracker } from '../../models/Tracking'
import { io } from '../../app'
import { Driver } from '../../models/Driver'

const router = express.Router()

router.delete('/api/bus/:id', requireAuth, async (req: Request, res: Response) => {
    const { id } = req.params

    const bus = await Bus.findById(id)

    if (!bus) throw new NotFoundError()

    await bus?.stops.map(async (stopId) => {
        await Stop.findByIdAndUpdate(stopId, { $pull: { busId: id } })
    })

    await Driver.updateOne({ id: bus?.driver }, { busId: null })
    await Bus.findByIdAndDelete(id)

    io.emit('busDeleted', id)

    res.status(200).send("successfully deleted")
})

export { router as DeleteBusRoute }