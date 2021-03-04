import mongoose from 'mongoose'

const notificationSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    link: {
        type: String
    },
    read: {
        type: Boolean,
        default: false
    },
    text: {
        type: String
    },
    user: {
        type: String
    }
}, {versionKey: false})

export default mongoose.model('notification', notificationSchema)