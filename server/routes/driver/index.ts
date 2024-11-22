export { router as GetAllStops }
import express, { Request, Response } from 'express'
import { Driver } from '../../models/Driver'

const router = express.Router()

router.get('/api/driver', async (req: Request, res: Response) => { 
   const { populate } = req.query
   let drivers;
   if (populate === 'true') drivers = await Driver.find({}).populate('busId')
   else drivers = await Driver.find({})

    res.status(200).json(drivers)
})

export {router as GetAllDriver}