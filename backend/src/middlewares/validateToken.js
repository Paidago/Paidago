import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config.js'

export const authRequired = (req, res, next) => {
    console.log(req.body.token)
    if (!req.body.token) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    jwt.verify(req.body.token, JWT_SECRET, (err, decoded) => {

        if (err) return res.status(401).json({ message: 'Invalid token' })

        req.userId = decoded.id
        next()
    })
}
