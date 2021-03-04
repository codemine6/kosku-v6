import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

function setCookie(res, user) {
    const token = jwt.sign({_id: user._id, type: user.type}, process.env.SECRET_KEY)
    const config = {
        httpOnly: true,
        maxAge: 31556952000
    }
    if (process.env.NODE_ENV) {
        config.sameSite = 'none',
        config.secure = true
    }
    res.cookie(process.env.COOKIE, token, config)
}
console.log(process.env.NODE_ENV)

export const login = async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if (user) {
            const matching = bcrypt.compareSync(req.body.password, user.password)
            if (matching) {
                setCookie(res, user)
                res.status(200).json({
                    _id: user._id,
                    email: user.email,
                    profileImage: user.profileImage,
                    type: user.type,
                    username: user.username
                })
            } else throw new Error
        } else throw new Error
    } catch {
        res.status(401).json({message: 'Email atau password salah'})
    }
}

export const register = async (req, res) => {
    try {
        const user = await User.create(req.body)
        if (user) {
            setCookie(res, user)
            res.status(200).json({
                _id: user._id,
                email: user.email,
                profileImage: user.profileImage,
                type: user.type,
                username: user.username
            })
        }
    } catch (err) {
        let message
        if (err.code === 11000) {
            message = 'Email sudah terdaftar'
        } else {
            message = Object.values(err.errors)[0].message
        }
        res.status(400).json({message})
    }
}

export const logout = async (req, res) => {
    res.cookie(process.env.COOKIE, '', {maxAge: 0})
    res.status(200).json(null)
}

export const status = async (req, res) => {
    try {
        const cred = jwt.verify(req.cookies.jwt, process.env.SECRET_KEY)
        const user = await User.findById(cred._id)
        if (user) {
            const {_id, email, profileImage, type, username} = user
            res.status(200).json({_id, email, profileImage, type, username})
        }
    } catch {
        res.status(401).json(null)
    }
}