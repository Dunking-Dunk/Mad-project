import { io } from "./app"
import { Bus } from "./models/Bus"
import { Tracker } from "./models/Tracking"
import { Stop } from "./models/Stop"
import { Driver } from "./models/Driver"

export const connection = () => {
    io.on("connection", (socket) => {
        console.log(`${socket.id} a user connected`)
        // socket.on('stop-getLocation', (data) => {

        // })

        // const interval = setInterval(async () => {
        //     const tracker = await Tracker.find({})
        //     io.emit('getAllBusLocation', tracker)
        //     tracker.forEach(track => {
        //         io.to(track.id).emit('getBusLocation', track)
        //     })
        // }, 2000)

        socket.on('join-room', (room) => {
            socket.join(room)
        })

        socket.on('leave-room', (room) => {
            socket.leave(room)
        })

        socket.on('disconnect', () => {
            console.log(`${socket.id} disconnected`)
        })
    })

    const watchOptions = {
        fullDocument: 'updateLookup',

    }

    const changeStreamTracker = Tracker.collection.watch([], watchOptions)
    const changeStreamStop = Stop.collection.watch([], watchOptions)
    const changeStreamDriver = Driver.collection.watch([], watchOptions)

    changeStreamTracker.on('change', (data: any) => {
        const fullDocument = data.fullDocument
        if (data.operationType === 'insert') {
            const id = String(fullDocument.trackerId)
            io.to(id).emit("getBusLocation", { ...fullDocument });
            io.to('allBus').emit('getAllBusLocation', { ...fullDocument })
        }
    })
    changeStreamStop.on('change', (data: any) => {
        const fullDocument = data.fullDocument
        if (data.operationType === 'update') {
            io.emit('updateStop', { ...fullDocument, id: fullDocument._id })
        }
    })

    changeStreamDriver.on('change', (data: any) => {
        const fullDocument = data.fullDocument
        if (data.operationType === 'update') {
            io.emit('updateDriver', { ...fullDocument, id: fullDocument._id })
        }
    })


}