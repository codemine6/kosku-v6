import express from 'express'
import {addRoom, updateRoom, addFavorite, getMyRooms, getRecommended, getFavorites, getOneRoom, getSummaryRoom, roomDetails} from '../controllers/room.js'
import {ownerRoute, customerRoute} from '../middleware/auth.js'

const router = express.Router()

router.post('/room', ownerRoute, addRoom)
router.patch('/room/:id', ownerRoute, updateRoom)
router.patch('/favorite', customerRoute, addFavorite)
router.get('/my-rooms', ownerRoute, getMyRooms)
router.get('/rooms/recommended', getRecommended)
router.get('/rooms/favorite', customerRoute, getFavorites)
router.get('/room/:id', ownerRoute, getOneRoom)
router.get('/room/:id/summary', getSummaryRoom)
router.get('/room/:id/detail', roomDetails)

export default router