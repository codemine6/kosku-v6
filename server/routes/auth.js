import express from 'express'
import {login, register, logout, status} from '../controllers/auth.js'

const router = express.Router()

router.post('/login', login)
router.post('/register', register)
router.get('/logout', logout)
router.get('/status', status)

export default router