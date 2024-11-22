import express, { Request, Response } from 'express'
import { Driver } from '../../models/Driver'

const router = express.Router()

router.get('/api/driver/:driverId', async (req: Request, res: Response) => { 
   const driver = await Driver.findById(req.params.driverId)

    res.status(200).json(driver)
})

export {router as GetDriver}