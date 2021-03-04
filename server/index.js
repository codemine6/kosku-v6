import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import {createServer} from 'http'
import {Server} from 'socket.io'
dotenv.config()

import cors from './middleware/cors.js'
import {ChatHandler} from './sockets/chat.js'
import {NotificationHandler} from './sockets/notification.js'

import auth from './routes/auth.js'
import booking from './routes/booking.js'
import chat from './routes/chat.js'
import message from './routes/message.js'
import notification from './routes/notification.js'
import promo from './routes/promo.js'
import review from './routes/review.js'
import room from './routes/room.js'
import user from './routes/user.js'

const app = express()
const http = createServer(app)
const io = new Server(http, {
    cors: {
        origin: process.env.ORIGIN
    }
})

app.use(express.json({limit: '50mb'}))
app.use(cookieParser())
app.use(cors)

app.use('/auth', auth)
app.use(booking)
app.use(chat)
app.use(message)
app.use(notification)
app.use(promo)
app.use(review)
app.use(room)
app.use(user)

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
.then(() => {
    http.listen(process.env.PORT, () => {
        io.of('/chat').on('connect', socket => ChatHandler(socket))
        io.of('/notification').on('connect', socket => NotificationHandler(socket))
        console.log('App running..')
    })
}).catch(err => console.log(err))