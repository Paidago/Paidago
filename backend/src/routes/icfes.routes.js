import { Router } from 'express'
import { authRequired } from '../middlewares/validateToken.js'
import { getAllIcfes, getIcfesById, getIcfesBySubject, createIcfes } from '../controllers/icfes.controller.js'

const router = Router();

router.get('/icfes', authRequired, getAllIcfes)

router.get('/icfes/:id', authRequired, getIcfesById)

router.post('/icfesBySubject', authRequired, getIcfesBySubject)

router.post('/createIcfes', authRequired, createIcfes)


export default router