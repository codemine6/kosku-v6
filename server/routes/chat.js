import express from 'express'
import {startChat, chatList, chatDetail, deleteChat} from '../controllers/chat.js'
import {authRoute} from '../middleware/auth.js'

const router = express.Router()

router.post('/chat/start', authRoute, startChat)
router.get('/chats', authRoute, chatList)
router.get('/chat/:id', authRoute, chatDetail)
router.delete('/chat/:id/delete', authRoute, deleteChat)

export default router