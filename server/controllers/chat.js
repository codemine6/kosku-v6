import Chat from '../models/Chat.js'
import Message from '../models/Message.js'
import User from '../models/User.js'

export const startChat = async (req, res) => {
    try {
        const users = [req.user._id, req.body.user]
        const chat = await Chat.findOne({users})
        if (chat) {
            res.status(200).json({_id: chat._id})
        } else {
            const chat = await Chat.create({users})
            res.status(200).json({_id: chat._id})
        }
    } catch {
        res.status(404).json({message: 'Kamu belum memiliki percakapan'})
    }
}

export const chatList = async (req, res) => {
    try {
        const chats = await Chat.find({users: req.user._id})
        const data = await Promise.all(chats.map(async chat => {
            const [message] = await Message.find({chat: chat._id, deleteFor: {$ne: req.user._id}}).sort({sendedAt: 'desc'}).limit(1)
            if (message) {
                const other = chat.users.find(id => id !== req.user._id)
                const user = await User.findById(other)
                return {
                    _id: chat._id,
                    message,
                    user: {
                        profileImage: user.profileImage,
                        username: user.username
                    }
                }
            }
        }))
        res.status(200).json(data.filter(item => item))
    } catch {
        res.status(404).json(null)
    }
}

export const chatDetail = async (req, res) => {
    try {
        const chat = await Chat.findById(req.params.id)
        const other = chat.users.find(id => id !== req.user._id)
        const user = await User.findById(other)
        const messages = await Message.find({chat: chat._id, deleteFor: {$ne: req.user._id}})
        messages.map(async message => {
            if (message.sender !== req.user._id && !message.read) {
                await Message.findByIdAndUpdate(message._id, {read: true})
            }
        })
        const data = {
            messages,
            user: {
                _id: user._id,
                profileImage: user.profileImage,
                username: user.username
            }
        }
        res.status(200).json(data)
    } catch {
        res.status(404).json({message: 'Percakapan tidak ditemukan'})
    }
}

export const deleteChat = async (req, res) => {
    try {
        const messages = await Message.find({chat: req.params.id, deleteFor: {$ne: req.user._id}})
        messages.map(async message => {
            if (message.deleteFor) {
                await Message.findByIdAndDelete(message._id)
            } else {
                await Message.findByIdAndUpdate(message._id, {deleteFor: req.user._id})
            }
        })
        res.status(200).json(null)
    } catch {
        res.status(404).json(null)
    }
}