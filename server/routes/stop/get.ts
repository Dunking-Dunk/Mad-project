import express, { Request, Response } from 'express'
import { Stop } from '../../models/Stop'

const router = express.Router()

router.get('/api/stop/:stopId', async (req: Request, res: Response) => { 
   const stops = await Stop.findById(req.params.stopId)

    res.status(200).json(stops)
})

export {router as GetStop}