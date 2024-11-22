import { Feedback } from "../../models/Feedback";
import express, {Request, Response} from 'express'

const router = express.Router();

router.get('/api/feedback', async (req: Request, res: Response) => {
    const feedback = await Feedback.find({})
    res.send(feedback).status(200)
})

export {router as GetAllFeedback}