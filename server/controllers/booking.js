import Booking from '../models/Booking.js'
import Room from '../models/Room.js'
import User from '../models/User.js'
import Notification from '../models/Notification.js'

export const newBooking = async (req, res) => {
    try {
        const room = await Room.findById(req.body.room)
        if (room.availableRooms >= req.body.details.room) {
            const booking = await Booking.create(req.body)
            if (booking) {
                await Notification.create({
                    link: `booking/${booking._id}`,
                    text: 'Pesanan baru',
                    user: req.body.owner
                })
                res.status(200).json({
                    code: booking.details.code,
                    payment: booking.payment.total
                })
            } else throw new Error
        } else throw new Error
    } catch {
        res.status(403).json({message: 'Pesanan tidak dapat diproses'})
    }
}

export const confirm = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndUpdate(req.params.id, {
            confirmedAt: Date.now(),
            status: 'confirmed'
        }, {new: true})
        if (booking) {
            res.status(200).json({confirmedAt: booking.confirmedAt, status: booking.status})
        } else throw new Error
    } catch {
        res.status(400).json({message: 'Tidak dapat mengkonfirmasi pesanan'})
    }
}

export const cancel = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndUpdate(req.params.id, {
            canceledAt: Date.now(),
            status: 'canceled'
        }, {new: true})
        if (booking) {
            res.status(200).json({canceledAt: booking.canceledAt, status: booking.status})
        } else throw new Error
    } catch {
        res.status(400).json({message: 'Tidak dapat membatalkan pesanan'})
    }
}

export const finish = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndUpdate(req.params.id, {
            finishedAt: Date.now(),
            status: 'finished'
        }, {new: true})
        if (booking) {
            res.status(200).json({finishedAt: booking.finishedAt, status: booking.status})
        } else throw new Error
    } catch {
        res.status(400).json({message: 'Tidak dapat menyelesaikan pesanan'})
    }
}

export const allBookings = async (req, res) => {
    try {
        const status = req.query.status === 'all' ? {$ne: null} : req.query.status
        const user = req.user.type === 'owner' ? {owner: req.user._id} : {customer: req.user._id}
        const bookings = await Booking.find({status, ...user}).sort({bookedAt: 'desc'})
        if (bookings) {
            const data = await Promise.all(bookings.map(async booking => {
                const room = await Room.findById(booking.room)
                const data = {
                    _id: booking._id,
                    bookedAt: booking.bookedAt,
                    payment: {
                        total: booking.payment.total
                    },
                    room: {
                        image: room.images[0],
                        location: {
                            address: room.location.address,
                            city: room.location.city
                        },
                        name: room.name
                    },
                    status: booking.status
                }
                if (req.user.type === 'owner') {
                    const customer = await User.findById(booking.customer)
                    data.customer = customer.username
                }
                return data
            }))
            if (data.length) {
                res.status(200).json(data)
            } else throw new Error
        } else throw new Error
    } catch {
        res.status(404).json({message: 'Tidak ada pesanan'})
    }
}

export const bookingDetails = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
        if (booking) {
            const id = req.user.type === 'owner' ? booking.customer : booking.owner
            const user = await User.findById(id)
            const room = await Room.findById(booking.room)
            const data = {
                _id: booking._id,
                confirmedAt: booking.confirmedAt,
                bookedAt: booking.bookedAt,
                finishedAt: booking.finishedAt,
                details: {
                    code: booking.details.code,
                    room: booking.details.room
                },
                payment: {
                    total: booking.payment.total
                },
                room: {
                    _id: room._id,
                    availableRooms: room.availableRooms,
                    image: room.images[0],
                    name: room.name,
                    location: {
                        address: room.location.address,
                        city: room.location.city
                    }
                },
                status: booking.status,
                user: {
                    _id: user._id,
                    profileImage: user.profileImage,
                    type: user.type,
                    username: user.username
                }
            }
            res.status(200).json(data)
        }
    } catch {
        res.status(404).json({message: 'Tidak ada pesanan'})
    }
}