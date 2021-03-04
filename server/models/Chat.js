import mongoose from 'mongoose'

const chatSchema = new mongoose.Schema({
    startedAt: {
        type: Date,
        default: Date.now
    },
    users: [{
        type: String
    }]
}, {versionKey: false})

export default mongoose.model('chat', chatSchema)