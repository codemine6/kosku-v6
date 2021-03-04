import Message from '../models/Message.js'

export const addMessage = async (req, res) => {
    try {
        const message = await Message.create({...req.body, sender: req.user._id})
        res.status(200).json(message)
    } catch {
        res.status(400).json({message: 'Tidak dapat mengirim pesan'})
    }
}