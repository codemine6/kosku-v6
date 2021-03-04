import jwt from 'jsonwebtoken'

export const authRoute = (req, res, next) => {
    const token = req.cookies[process.env.COOKIE]
    if (token) {
        const credentials = jwt.verify(token, process.env.SECRET_KEY)
        if (credentials) {
            req.user = credentials
            next()
        } else {
            res.status(401).json({message: 'Silahkan login'})
        }
    } else {
        res.status(401).json({message: 'Silahkan login'})
    }
}

export const ownerRoute = (req, res, next) => {
    const token = req.cookies[process.env.COOKIE]
    if (token) {
        const credentials = jwt.verify(token, process.env.SECRET_KEY)
        if (credentials && credentials.type === 'owner') {
            req.user = credentials
            next()
        } else {
            res.status(401).json({message: 'Silahkan login sebagai pemilik'})
        }
    } else {
        res.status(401).json({message: 'Silahkan login sebagai pemilik'})
    }
}

export const customerRoute = (req, res, next) => {
    const token = req.cookies[process.env.COOKIE]
    if (token) {
        const credentials = jwt.verify(token, process.env.SECRET_KEY)
        if (credentials && credentials.type === 'customer') {
            req.user = credentials
            next()
        } else {
            res.status(401).json({message: 'Silahkan login sebagai penyewa'})
        }
    } else {
        res.status(401).json({message: 'Silahkan login sebagai penyewa'})
    }
}