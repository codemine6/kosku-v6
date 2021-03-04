import User from '../models/User.js'

export const getDetails = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (user) {
            res.status(200).json(user)
        } else {
            throw new Error
        }
    } catch {
        res.status(404).json({message: 'Something when wrong'})
    }
}