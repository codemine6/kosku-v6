import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    city: {
        type: String,
        default: null
    },
    email: {
        type: String,
        required: [true, 'Silahkan masukan alamat email'],
        unique: true,
        lowercase: true,
        validate: [
            (email) => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email),
            'Silahkan masukan alamat email yang valid']
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: [true, 'Silahkan masukan password'],
        minLength: [6, 'Password minimal 6 karakter']
    },
    phone: {
        type: String,
        required: [true, 'Silahkan masukan nomor telepon'],
        minLength: [11, 'Nomor telepon tidak valid'],
        maxLength: [15, 'Nomor telepon tidak valid']
    },
    profileImage: {
        type: String,
        default: 'https://placeimg.com/100/100/people'
    },
    registerAt: {
        type: Date,
        default: Date.now
    },
    roomFavorites: [String],
    type: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: [true, 'Silahkan masukan nama pengguna'],
        minLength: [8, 'Nama pengguna minimal 8 karakter']
    }
}, {versionKey: false})

userSchema.pre('save', function(next) {
    this.password = bcrypt.hashSync(this.password, 10)
    next()
})

export default mongoose.model('user', userSchema)