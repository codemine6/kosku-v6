import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema({
    bookedAt: {
        type: Date,
        default: Date.now
    },
    canceledAt: {
        type: Date,
        default: null
    },
    confirmedAt: {
        type: Date,
        default: null
    },
    finishedAt: {
        type: Date,
        default: null
    },
    customer: {
        type: String
    },
    details: {
        code: {
            type: String
        },
        room: {
            type: String
        },
        time: {
            type: String
        },
        type: {
            type: String
        }
    },
    owner: {
        type: String
    },
    payment: {
        total: {
            type: Number
        },
        type: {
            type: String
        }
    },
    room: {
        type: String
    },
    status: {
        type: String,
        default: 'waiting'
    }
}, {versionKey: false})

export default mongoose.model('booking', bookingSchema)