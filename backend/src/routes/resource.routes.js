import { Router } from 'express'
import { getPosts } from '../controllers/resource.controller.js'

const router = new Router()

router.get('/getPosts', getPosts)


export default router