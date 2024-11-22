import { app, httpServer } from "./app"
import mongoose from "mongoose"
import { connection } from './socket'

const PORT = process.env.PORT || 4000

const start = async () => {
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI is required")
    }

    try {
        await mongoose.connect(process.env.MONGO_URI)
        connection()
    }
    catch (err) {
        console.error(err)
    }

    httpServer.listen(PORT, () => {
        console.log('listening on port 4000')
    })
}

start()