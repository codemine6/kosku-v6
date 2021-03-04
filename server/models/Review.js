import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    customer: {
        type: String
    },
    images: [{
        type: String
    }],
    owner: {
        type: String
    },
    rating: {
        type: Number
    },
    reply: {
        type: String,
        default: null
    },
    room: {
        type: String
    },
    text: {
        type: String
    }
}, {versionKey: false})

export default mongoose.model('review', reviewSchema)