import mongoose, { Schema } from 'mongoose'

interface PointAttrs {
    location: {
        type: string,
        coordinate: number[]
    },
    trackerId: string
    busId?: string
    speed?: number
}

export interface PointDoc extends mongoose.Document {
    location: {
        type: string,
        coordinate: number[]
    },
    trackerId: string
    busId?: string
    speed?: number
}

interface PointModel extends mongoose.Model<PointDoc> {
    build(attrs: PointAttrs): PointDoc
}


const pointSchema = new Schema({
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
    speed: {
        type: Number,
        default: 0
    },
    trackerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tracker',
        required: true
    },
    busId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bus'
    }
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id
            delete ret._id
        }
    }
})

pointSchema.statics.build = (attrs: PointAttrs) => {
    return new Point(attrs)
}


export const Point = mongoose.model<PointDoc, PointModel>('Point', pointSchema)

export default Point