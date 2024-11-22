import express, { Request, Response } from "express";
import { currentUser } from '../../middleware/current-user'
import { User } from "../../models/User";

const router = express.Router();

router.get('/api/users/currentuser', currentUser, async (req: Request, res: Response) => {
    const user = await User.findById(req.currentUser?.id)
    res.send({ currentUser: user || null })
})

export { router as currentUserRouter }