import { Router } from 'express'
import { removeUser, updateUser, verifyToken } from '../controllers/user.controller.js'
import { authRequired } from '../middlewares/validateToken.js'

const router = new Router()

router.post('/removeUser', removeUser)

router.post('/updateUser', authRequired, updateUser)

export default router;