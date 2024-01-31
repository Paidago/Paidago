import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config.js'

export const authRequired = (req, res, next) => {
    console.log(req.cookies.token)
    if (!req.cookies.token) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    jwt.verify(req.cookies.token, JWT_SECRET, (err, decoded) => {

        if (err) return res.status(401).json({ message: 'Invalid token' })

        req.userId = decoded.id
        next()
    })
}
