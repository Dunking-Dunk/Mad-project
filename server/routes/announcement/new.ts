import { Announcement } from "../../models/Announcement";
import express, { Request, Response } from 'express'
import { body } from "express-validator";
import { ValidateRequest } from "../../middleware/validate-request";
import { requireAuth } from '../../middleware/require-auth'
import { io } from "../../app";

const router = express.Router();

router.post('/api/announcement', requireAuth, [body('content').notEmpty().withMessage('content is required')], ValidateRequest, async (req: Request, res: Response) => {

    const announcement = Announcement.build(req.body)
    await announcement.save()
    io.emit('newAnnoucement', announcement)
    res.json(announcement).status(201)
})

export { router as NewAnnouncement }