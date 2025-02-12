import User  from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { createAccessToken } from '../libs/jwt.js'
import { JWT_SECRET } from '../config.js'

export const register = async (req, res) => {
    const { username, email, password } = req.body

    try {

        const userFound = await User.findOne({ email })
        
        if (userFound) return res.status(401).json(['El email ya está registrado'])

        const passwordHash = await bcrypt.hash(password, 10)
        const firstLetter = username.trim().charAt(0).toUpperCase()
        const user = new User({
            username,
            email,
            password: passwordHash,
            profilePicture: `https://ui-avatars.com/api/?name=${firstLetter}`,
            paymentID: ''
        })

        const userSaved = await user.save()

        const token = await createAccessToken({ id: userSaved._id });

        
        return res.status(201).json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            paymentID: userSaved.paymentID,
            profilePicture: userSaved.profilePicture,
            token,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body

    try {

        const userFound = await User.findOne({ email })


        if (!userFound) return res.status(401).json({ message: 'Credencailes invalidas' })
        
        const isMatch = await bcrypt.compare(password, userFound.password)

        if (!isMatch) return res.status(401).json({ message: 'Credencailes invalidas' })

        const token = await createAccessToken({ id: userFound });

        
        return res.status(201).json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            paymentID: userFound.paymentID,
            token,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

export const logout = (req, res) => {
    res.cookie('token', '', {
        expires: new Date(0)
    })
    return res.status(200).json({
        message: 'Logged out'
    })
}

export const profile = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        if (!user) return res.status(404).json({ message: 'User not found' })
        return res.status(200).json({
            id: user._id,
            username: user.username,
            email: user.email,
            paymentID: user.paymentID,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const verifyToken = async (req, res) => {
    try {
        const { token } = req.body

        if (!token) return res.status(401).json({ message: 'No autorizado' })

        jwt.verify(token, JWT_SECRET, async (err, decoded) => {
            if (err) return res.status(401).json({ message: 'No autorizado' })
            
            const user = await User.findById(decoded.id)
            if (!user) return res.status(404).json({ message: 'Usuario no encontrado' })
            return res.status(200).json({
                id: user._id,
                username: user.username,
                email: user.email,
                paymentID: user.paymentID,
            })
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}