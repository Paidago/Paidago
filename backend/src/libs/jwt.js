import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config.js'
 
export function createAccessToken(payload){
    return new Promise( (resolve, reject) => {
        jwt.sign(
            payload, 
            JWT_SECRET,
            (error, token) => {
                if (error) reject(error)
                resolve(token)                
            }
        )
    })
}