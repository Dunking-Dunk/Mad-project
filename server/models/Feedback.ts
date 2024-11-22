import mongoose from "mongoose";

interface FeedbackAttrs {
    feedback: string;
    link: string;
}
 
export interface FeedbackDoc extends mongoose.Document {
    feedback: string;
    link: string;
}

interface FeedbackModel extends mongoose.Model<FeedbackDoc> {
    build(attrs: FeedbackAttrs): FeedbackDoc
}

const feedbackSchema = new mongoose.Schema({
    feedback: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
}, {
    timestamps: true,
        toJSON: {
            transform(doc,ret) {
                ret.id = ret._id
                delete ret._id
            }
        } 
})

feedbackSchema.statics.build = (attrs:FeedbackAttrs) => {
    return new Feedback(attrs)
}

export const Feedback = mongoose.model<FeedbackDoc, FeedbackModel>('Feedback', feedbackSchema)    