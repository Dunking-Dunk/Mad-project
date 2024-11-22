import express, { Request, Response } from "express";
import { Tracker } from "../../models/Tracking";
import { Bus } from "../../models/Bus";

const router = express.Router();

router.post('/api/gps-tracking', async (req: Request, res: Response) => {
    const tracker = await Tracker.create(req.body) //trackerid

    await Bus.findOneAndUpdate({ trackerId: tracker.trackerId }, {
        tracker: tracker.id
    })

    res.sendStatus(200)
})

export { router as NewGpsTracker }