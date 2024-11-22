import { Feedback } from "../../models/Feedback";
import express, {Request, Response} from 'express'

const router = express.Router();

router.delete('/api/feedback/:id', async (req: Request, res: Response) => {
    const { id } = req.params

    await Feedback.findByIdAndDelete(id)
    res.send('successfully deleted').status(200)
})

export {router as DeleteFeedback}