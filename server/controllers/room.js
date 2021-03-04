import Room from '../models/Room.js'
import User from '../models/User.js'
import Review from '../models/Review.js'
import Booking from '../models/Booking.js'

export const addRoom = async (req, res) => {
    try {
        const room = await Room.create({...req.body, owner: req.user._id})
        if (room) {
            res.status(201).json({message: 'Room baru berhasil ditambahkan'})
        } else throw new Error
    } catch {
        res.status(400).json({message: 'Gagal menyimpan room baru'})
    }
}

export const updateRoom = async (req, res) => {
    try {
        const room = await Room.findByIdAndUpdate(req.params.id, {
            ...req.body,
            updatedAt: Date.now()
        })
        if (room) {
            res.status(200).json(null)
        } else throw new Error
    } catch {
        res.status(404).json({message: 'Update Gagal'})
    }
}

export const addFavorite = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        const favorited = user.roomFavorites.includes(req.body.room)
        if (favorited) {
            const data = user.roomFavorites.filter(id => id !== req.body.room)
            const newUser = await User.findByIdAndUpdate(req.user._id, {
                roomFavorites: data
            }, {new: true})
            res.status(200).json(newUser.roomFavorites)
        } else {
            const data = [...user.roomFavorites, req.body.room]
            const newUser = await User.findByIdAndUpdate(req.user._id, {
                roomFavorites: data
            }, {new: true})
            res.status(200).json(newUser.roomFavorites)
        }
    } catch {
        res.status(400).json({message: 'Tidak dapat ditambahkan ke favorite'})
    }
}

export const getMyRooms = async (req, res) => {
    try {
        const rooms = await Room.find({owner: req.user._id})
        const data = await Promise.all(rooms.map(async room => {
            const bookings = await Booking.find({room: room._id, status: 'finished'}).countDocuments()
            const reviews = await Review.find({room: room._id}).countDocuments()
            return {
                _id: room._id,
                bookings,
                image: room.images[0],
                location: room.location,
                name: room.name,
                pricing: room.pricing,
                reviews
            }
        }))
        res.status(200).json(data)
    } catch {
        res.status(404).json({message: 'Room tidak ditemukan'})
    }
}

export const getRecommended = async (req, res) => {
    try {
        const rooms = await Room.find()
        if (rooms) {
            const data = rooms.map(room => ({
                _id: room._id,
                customerType: room.customerType,
                image: room.images[0],
                location: {
                    address: room.location.address,
                    city: room.location.city
                },
                name: room.name,
                pricing: room.pricing
            }))
            res.status(200).json(data)
        } else throw new Error
    } catch {
        res.status(404).json({message: 'Room tidak ditemukan'})
    }
}

export const getFavorites = async (req, res) => {
    try {
        const customer = await User.findById(req.user._id)
        const favorites = customer.roomFavorites
        if (favorites.length) {
            const data = await Promise.all(favorites.map(async id => {
                const room = await Room.findById(id)
                return {
                    _id: room._id,
                    customerType: room.customerType,
                    image: room.images[0],
                    location: {
                        address: room.location.address,
                        city: room.location.city
                    },
                    name: room.name,
                    pricing: room.pricing
                }
            }))
            res.status(200).json(data)
        }
    } catch {
        res.status(404).json({message: 'Room tidak ditemukan'})
    }
}

export const getOneRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id)
        const data = {
            availableRooms: room.availableRooms,
            customerType: room.customerType,
            description: room.description,
            facilities: room.facilities,
            images: room.images,
            location: room.location,
            name: room.name,
            pricing: room.pricing,
            roomType: room.roomType,
            rules: room.rules
        }
        res.status(200).json(data)
    } catch {
        res.status(404).json({message: 'Room tidak ditemukan'})
    }
}

export const getSummaryRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id)
        if (room) {
            const data = {
                _id: room._id,
                availableRooms: room.availableRooms,
                image: room.images[0],
                location: {
                    address: room.location.address,
                    city: room.location.city
                },
                name: room.name,
                owner: room.owner,
                pricing: {
                    price: room.pricing.price,
                    type: room.pricing.type
                }
            }
            res.status(200).json(data)
        } else throw new Error
    } catch {
        res.status(404).json({message: 'Room tidak ditemukan'})
    }
}

export const roomDetails = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id)
        if (room) {
            const owner = await User.findById(room.owner)
            const reviews = await Review.find({room: room._id})
            const reviewsData = await Promise.all(reviews.slice(0,3).map(async review => {
                const customer = await User.findById(review.customer)
                return {
                    customer: customer.username,
                    rating: review.rating,
                    reply: review.reply,
                    text: review.text
                }
            }))
            const average = (reviews.reduce((a, b) => a + b.rating, 0) / reviews.length).toFixed(1)
            const data = {
                _id: room._id,
                availableRooms: room.availableRooms,
                customerType: room.customerType,
                description: room.description,
                facilities: room.facilities,
                images: room.images,
                location: room.location,
                name: room.name,
                pricing: room.pricing,
                roomType: room.roomType,
                rules: room.rules,
                updatedAt: room.updatedAt,
                owner: {
                    _id: owner._id,
                    profileImage: owner.profileImage,
                    type: owner.type,
                    username: owner.username
                },
                rating: average,
                reviews: reviewsData,
                reviewsCount: reviews.length
            }
            res.status(200).json(data)
        } else throw new Error
    } catch {
        res.status(404).json({message: 'Room tidak ditemukan'})
    }
}