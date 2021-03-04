import mongoose from 'mongoose'

const roomSchema = new mongoose.Schema({
    availableRooms: {
        type: Number
    },
    customerType: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String
    },
    facilities: [
        {
            _id: false,
            id: String,
            name: String
        }
    ],
    images: [
        {
            type: String
        }
    ],
    location: {
        address: String,
        city: String,
        coords: [Number]
    },
    name: {
        type: String
    },
    owner: {
        type: String,
        required: true
    },
    pricing: {
        price: Number,
        type: {
            type: String
        }
    },
    roomType: {
        type: String
    },
    rules: {
        type: String
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {versionKey: false})

export default mongoose.model('room', roomSchema)