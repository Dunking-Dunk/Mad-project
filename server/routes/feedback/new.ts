import { Feedback } from "../../models/Feedback";
import express, {Request, Response} from 'express'
import { body } from "express-validator";
import { ValidateRequest } from "../../middleware/validate-request";

const router = express.Router();

router.post('/api/feedback', [body('feedback').notEmpty().withMessage('feedback is required'), body('link').notEmpty().withMessage('feedback is required')], ValidateRequest, async (req: Request, res: Response) => {
    console.log(req.body)
    const feedback = Feedback.build(req.body)
    await feedback.save()

    res.send(feedback).status(201)
})

export {router as NewFeedback}