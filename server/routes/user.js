import express from 'express'
import {getDetails} from '../controllers/user.js'

const router = express.Router()

router.get('/user/:id', getDetails)

export default router