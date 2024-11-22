import express, { Request, Response } from 'express'
import { Stop } from '../../models/Stop'

const router = express.Router()

router.get('/api/stop', async (req: Request, res: Response) => { 
    const { populate } = req.query
    
    let stops;

    if (populate === 'true') stops = await Stop.find({}).populate('busId')
    else stops = await Stop.find({})

    res.status(200).json(stops)
})

export {router as GetAllStops}