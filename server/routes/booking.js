import express from 'express'
import {newBooking, confirm, cancel, finish, allBookings, bookingDetails} from '../controllers/booking.js'
import {authRoute, customerRoute} from '../middleware/auth.js'

const router = express.Router()

router.post('/new-booking', customerRoute, newBooking)
router.patch('/booking/:id/confirm', authRoute, confirm)
router.patch('/booking/:id/cancel', authRoute, cancel)
router.patch('/booking/:id/finish', authRoute, finish)
router.get('/bookings', authRoute, allBookings)
router.get('/booking/:id', authRoute, bookingDetails)

export default router