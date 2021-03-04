import Review from '../models/Review.js'
import Room from '../models/Room.js'
import User from '../models/User.js'

export const edit = async (req, res) => {
    try {
        const room = req.params.id
        const customer = req.user._id
        const review = await Review.findOne({room, customer})
        if (review) {
            const newReview = await Review.findByIdAndUpdate(review._id, req.body)
            newReview && res.status(200).json(null)
        } else {
            const newReview = await Review.create({...req.body, room, customer})
            newReview && res.status(200).json(null)
        }
    } catch {
        res.status(404).json({message: 'Tidak dapat menambahkan ulasan'})
    }
}

export const getReview = async (req, res) => {
    try {
        const roomId = req.params.id
        const customer = req.user._id
        const review = await Review.findOne({room: roomId, customer})
        const room = await Room.findById(req.params.id)
        if (room) {
            const data = {
                rating: review?.rating ?? 0,
                text: review?.text ?? '',
                room: {
                    availableRooms: room.availableRooms,
                    image: room.images[0],
                    location: {
                        address: room.location.address,
                        city: room.location.city
                    },
                    name: room.name,
                    owner: room.owner
                }
            }
            res.status(200).json(data)
        } else throw new Error
    } catch {
        res.status(404).json({message: 'Review tidak ditemukan'})
    }
}

export const roomReviews = async (req, res) => {
    try {
        const reviews = await Review.find({room: req.params.id})
        const data = await Promise.all(reviews.map(async review => {
            const customer = await User.findById(review.customer)
            const result = {
                customer: customer.username,
                rating: review.rating,
                reply: review.reply,
                text: review.text
            }
            return result
        }))
        res.status(200).json(data)
    } catch {
        res.status(404).json({message: 'Review tidak ditemukan'})
    }
}

export const allReviews = async (req, res) => {
    try {
        const type = req.query.type === 'replied' ? {$ne: null} : null
        const reviews = await Review.find({owner: req.user._id, type})
        const data = await Promise.all(reviews.map(async review => {
            const customer = await User.findById(review.customer)
            const room = await Room.findById(review.room)
            const result = {
                _id: review._id,
                customer: customer.username,
                rating: review.rating,
                reply: review.reply,
                text: review.text,
                room: {
                    image: room.images[0],
                    location: {
                        address: room.location.address,
                        city: room.location.city
                    },
                    name: room.name
                }
            }
            return result
        }))
        res.status(200).json(data)
    } catch {
        res.status(404).json({message: 'Review tidak ditemukan'})
    }
}