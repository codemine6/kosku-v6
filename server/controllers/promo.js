import Promo from '../models/Promo.js'

export const promo = async (req, res) => {
    try {
        const promo = await Promo.find()
        res.status(200).json(promo)
    } catch {
        res.status(400).json({message: 'Opps silahkan coba lagi'})
    }
}