import express, { Request, Response } from 'express'
import {requireAuth} from '../../middleware/require-auth'
import { Tracker } from '../../models/Tracking'
import { Bus } from '../../models/Bus'

const router = express.Router()

router.delete('/api/gps-tracking/:id',requireAuth, async (req: Request, res: Response) => { 
    const { id } = req.params
    const tracker = await Tracker.findById(id)
    await Bus.updateOne({ tracker: tracker?.id }, { $unset: { tracker: '' } })
    await Tracker.findByIdAndDelete(id)

    res.status(200).send("successfully deleted")
})

export {router as DeleteTracker}