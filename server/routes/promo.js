import express from 'express'
import {promo} from '../controllers/promo.js'

const router = express.Router()

router.get('/promo', promo)

export default router