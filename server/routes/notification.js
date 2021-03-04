import express from 'express'
import {notificationList} from '../controllers/notification.js'
import {authRoute} from '../middleware/auth.js'

const router = express.Router()

router.get('/notifications', authRoute, notificationList)

export default router