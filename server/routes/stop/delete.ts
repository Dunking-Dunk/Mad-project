import express, { Request, Response } from 'express'
import {requireAuth} from '../../middleware/require-auth'
import { Stop } from '../../models/Stop'
import { Bus } from '../../models/Bus'
import { io } from '../../app'

const router = express.Router()

router.delete('/api/stop/:id',requireAuth, async (req: Request, res: Response) => { 
    const { id } = req.params
    const stop = await Stop.findById(id)
    await stop?.busId?.map(async(busId) => {
        await Bus.updateOne({id: busId}, { $pull : {stops: id} })
    })
    await Stop.findByIdAndDelete(id)

    io.emit('stopDeleted', id)

    res.status(200).send("successfully deleted")
})

export {router as DeleteStop}