import express from 'express'
import {edit, getReview, roomReviews, allReviews} from '../controllers/review.js'
import {ownerRoute, customerRoute} from '../middleware/auth.js'

const router = express.Router()

router.patch('/review/:id', customerRoute, edit)
router.get('/review/:id', customerRoute, getReview)
router.get('/reviews/:id', roomReviews)
router.get('/reviews', ownerRoute, allReviews)

export default router