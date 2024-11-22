import mongoose from "mongoose";

interface AnnouncementAttrs {
     content: string;
}
 
export interface AnnouncementDoc extends mongoose.Document {
    content: string;
}

interface AnnouncementModel extends mongoose.Model<AnnouncementDoc> {
    build(attrs: AnnouncementAttrs): AnnouncementDoc
}

const announcementSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
        toJSON: {
            transform(doc,ret) {
                ret.id = ret._id
                delete ret._id
            }
        } 
})

announcementSchema.statics.build = (attrs:AnnouncementAttrs) => {
    return new Announcement(attrs)
}

export const Announcement = mongoose.model<AnnouncementDoc, AnnouncementModel>('Announcement', announcementSchema)    