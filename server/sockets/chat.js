import Chat from '../models/Chat.js'
import Message from '../models/Message.js'
import User from '../models/User.js'

export function ChatHandler(socket) {
    socket.on('count', async (user, callback) => {
        async function countChat() {
            const chats = await Chat.find({users: user})
            return await Promise.all(chats.map(async chat => {
                const [message] = await Message.find({chat: chat._id, read: false, receiver: user}).sort({sendedAt: 'desc'}).limit(1)
                if (message) return message
            })).then(data => data.filter(item => item).length)
        }

        callback(await countChat())

        Message.watch().on('change', async changes => {
            if (changes.operationType === 'insert' && changes.fullDocument.receiver === user) {
                socket.emit('new_count', await countChat())
            }
        })
    })

    socket.on('messages', params => {
        Message.watch().on('change', async changes => {
            if (changes.operationType === 'insert' && changes.fullDocument.chat === params.chat) {
                const message = changes.fullDocument
                socket.emit('new_message', message)
            } else if (changes.operationType === 'update' && changes.updateDescription.updatedFields.read) {
                const message = await Message.findById(changes.documentKey._id)
                if (message.sender === params.user) {
                    socket.emit('readed', changes.documentKey._id)
                }
            }
        })
    })

    socket.on('read', async message => {
        await Message.findByIdAndUpdate(message, {read: true})
    })

    socket.on('chats', user => {
        Message.watch().on('change', async changes => {
            if (changes.operationType === 'insert' && changes.fullDocument.receiver === user) {
                const message = changes.fullDocument
                const user = await User.findById(message.sender)
                socket.emit('new_chat', {
                    _id: message.chat,
                    message,
                    user: {
                        profileImage: user.profileImage,
                        username: user.username
                    }
                })
            }
        })
    })
}