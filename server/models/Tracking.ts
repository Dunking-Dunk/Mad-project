import mongoose from 'mongoose';

interface TrackerAttrs {
    speed: number,
    location: {
        type: string,
        coordinate: number[]
    },
    fuelLevel: number,
    engineStatus: boolean,
    engineRpm: number,
    engineTemp: number,
    torque: number,
    batteryLevel: number,
    batteryVoltage: number,
    wheelRpm: number,
    co2emission: number,
    coolantTemp: number,
    transmissionTemp: number,
    diagnosticCodes: string,
    trackerId: string,
    createdAt: string
}

interface TrackerDoc extends mongoose.Document {
    speed: number,
    location: {
        type: string,
        coordinate: number[]
    },
    fuelLevel: number,
    engineStatus: boolean,
    engineRpm: number,
    engineTemp: number,
    torque: number,
    batteryLevel: number,
    batteryVoltage: number,
    wheelRpm: number,
    co2emission: number,
    coolantTemp: number,
    transmissionTemp: number,
    diagnosticCodes: string,
    trackerId: string,
    createdAt: string
}

interface TrackerModel extends mongoose.Model<TrackerDoc> {
    build(attrs: TrackerAttrs): TrackerDoc
}

const trackingSchema = new mongoose.Schema({
    speed: {
        type: Number,
        default: 0
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinate: {
            type: [Number],
            required: true,
        },
    },
    //all tcu data comes here
    fuelLevel: {
        type: Number,
        default: 0
    },
    engineStatus: {
        type: Boolean,
        default: false
    },
    engineRpm: {
        type: Number,
        default: 0
    },
    engineTemp: {
        type: Number,
        default: 0
    },
    torque: {
        type: Number,
        default: 0
    },
    batteryLevel: {
        type: Number,
        default: 0
    },
    batteryVoltage: {
        type: Number,
        default: 0,
    },
    wheelRpm: {
        type: Number,
        default: 0
    },
    co2emission: {
        type: Number,
        default: 0
    },
    coolantTemp: {
        type: Number,
        default: 0
    },
    transmissionTemp: {
        type: Number,
        default: 0
    },
    diagnosticCodes: [{
        type: String
    }],
    trackerId: {
        type: String,
        required: true,
    },//trackerId is registered on the tcu soo it should be consistent
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id
            delete ret._id
        }
    }
}
)

trackingSchema.statics.build = (attrs: TrackerAttrs) => {
    return new Tracker(attrs)
}

const Tracker = mongoose.model<TrackerDoc, TrackerModel>('Tracker', trackingSchema)

export { Tracker }