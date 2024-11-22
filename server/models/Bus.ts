import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { StopDoc } from "./Stop";

interface BusAttrs {
    busNumber: number,
    busSet: string,
    busName: string,
    description: string,
    origin: string,
    stops: StopDoc[],
    tracker?: string,
    driver?: string,
    stops_polyline: [],
    stops_distance_time: [],
    seats: number,
    status: boolean,
    ac: boolean,
    trackerId: string
}
export interface BusDoc extends mongoose.Document {
    busNumber: number,
    busSet: string,
    busName: string,
    description: string,
    origin: string,
    stops: StopDoc[],
    version: number,
    tracker?: string,
    driver?: string,
    stops_polyline: [],
    stops_distance_time: [],
    seats: number,
    status: boolean,
    ac: boolean,
    trackerId: string
}

interface BusModel extends mongoose.Model<BusDoc> {
    build(attrs: BusAttrs): BusDoc
}

export const Schema = new mongoose.Schema({
    busNumber: {
        type: String,
        required: true,
    },
    busSet: {
        type: String,
    },
    busName: {
        type: String,
        required: true,
    },
    origin: {
        type: String,
    },
    description: {
        type: String
    },
    stops: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stop'
    }],
    stops_polyline: [{
        type: [Number],
        required: true,
    }],
    stops_distance_time: [{
        distance: Number,
        duration: Number
    }],
    seats: {
        type: Number,
        default: 64
    },
    ac: {
        type: Boolean,
        default: false
    },
    status: {
        type: Boolean
    },
    trackerId: {
        type: String,
        required: true,
        unique: true
    },
    tracker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tracker'
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver'
    },
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id
            delete ret._id
        },
        virtuals: true
    }
})

Schema.set("versionKey", "version");
Schema.plugin(updateIfCurrentPlugin);

Schema.statics.build = (attrs: BusAttrs) => {
    return new Bus(attrs)
}

const Bus = mongoose.model<BusDoc, BusModel>('Bus', Schema)

export { Bus }