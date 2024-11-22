import mongoose from "mongoose";
import {Password} from '../services/password'

interface UserAttrs {
    email: string;
    password: string;
    name: string;
    role: string;
}

interface UserModel extends mongoose.Model<UserDoc> { 
    build(attrs: UserAttrs): UserDoc
}

interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
    name: string;
    role: string;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required:true
    },
    role: {
        type: String,
        required: true,
        default: 'user'
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id
            delete ret._id
            delete ret.password;
            delete ret.__v
          }
    }
})

userSchema.pre('save', async function (done) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed)
    }

    done()
})


userSchema.statics.build = (attrs: UserAttrs) => { 
    return new User(attrs)
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema)



export { User}