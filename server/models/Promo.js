import mongoose from 'mongoose'

const promoSchema = new mongoose.Schema({
    image: {
        type: String
    }
}, {versionKey: false})

export default mongoose.model('promo', promoSchema)