import express, { Request, Response } from "express";
import { Tracker } from '../../models/Tracking';

const router = express.Router();

router.get('/api/gps-tracking', async (req: Request, res: Response) => {
    let trackers;
    if (req.query.populate === 'true')
        trackers = await Tracker.find({}).populate('bus')
    else
        trackers = await Tracker.find({})
    res.status(200).send(trackers)
})

export { router as GetAllGpsTracker }