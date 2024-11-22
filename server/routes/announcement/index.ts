import { Announcement } from "../../models/Announcement";
import express, {Request, Response} from 'express'

const router = express.Router();

router.get('/api/announcement', async (req: Request, res: Response) => {
    const announcement = await Announcement.find({})
    res.send(announcement).status(200)
})

export {router as GetAllAnnouncement}