import { Router } from 'express'
import { authRequired } from '../middlewares/validateToken.js'
import { getAllActivities, getActivityById, getActivitiesBySubject, createActivity, generateMindMap } from '../controllers/activity.controller.js'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { createActivitySchema } from '../schemas/activity.schema.js'
import multer from 'multer'

const router = new Router()
const upload = multer({ storage: multer.memoryStorage() });

router.post('/activities', authRequired, getAllActivities)

router.get('/activity/:id', authRequired, getActivityById)

router.post('/activitiesBySubject', authRequired, getActivitiesBySubject)

router.post('/createActivities', authRequired, validateSchema(createActivitySchema), createActivity)

router.post('/generateMindMap', authRequired, generateMindMap)


export default router