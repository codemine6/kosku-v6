import Notification from '../models/Notification.js'

export const notificationList = async (req, res) => {
    try {
        const notifications = await Notification.find({user: req.user._id})
        res.status(200).json(notifications)
    } catch {
        res.status(404).json(null)
    }
}