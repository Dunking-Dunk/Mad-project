import express, { Request, Response } from 'express'

import { NotFoundError } from '../../errors/not-found-error'
import { Bus } from '../../models/Bus'

const router = express.Router()

router.get('/api/bus/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    const { populate } = req.query

    let bus;
    if (populate === 'true') {
        bus = await Bus.findById(id).populate('stops').populate('driver')
    } else {
        bus = await Bus.findById(id)
    }


    if (!bus) {
        throw new NotFoundError()
    }

    res.status(200).send(bus)
})

export { router as GetBusRoute }