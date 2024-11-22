import mongoose from "mongoose";
import { BusDoc } from "./Bus";

interface Coords {
    latitude: number;
    longitude: number;
}


interface StopAttrs {
    coords: Coords,
    address?: string,
    name: string,
    timing: string, 
    busId?: BusDoc[]
}

export interface StopDoc extends mongoose.Document {
    coords: Coords,
    address?: string,
    name: string,
    timing: string,   
    busId?: BusDoc[]
}

interface StopModel extends mongoose.Model<StopDoc> {
    build(attrs: StopAttrs): StopDoc;
}


const stopSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinate: {
            type: [Number],
            required: true
        },
    },
    name: {
        type: String,
        required: true
    },
    busId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bus'
    }]
},
{
    toJSON: {
        transform(doc,ret) {
            ret.id = ret._id
            delete ret._id
        }
    }
    })

stopSchema.statics.build = (attrs: StopAttrs) => {
    return new Stop(attrs)
}

// stopSchema.pre('remove', function(next) {
//     // Remove all the assignment docs that reference the removed person.

// });

const Stop = mongoose.model<StopDoc, StopModel>('Stop', stopSchema)

export {Stop}