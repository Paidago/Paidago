import { Router } from 'express'
import { authRequired } from '../middlewares/validateToken.js'
import { getAllActivities, getActivityById, getActivitiesBySubject, createActivity } from '../controllers/activity.controller.js'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { createActivitySchema } from '../schemas/activity.schema.js'

const router = new Router()

router.post('/activities', authRequired, getAllActivities)

router.get('/activity/:id', authRequired, getActivityById)

router.post('/activitiesBySubject', authRequired, getActivitiesBySubject)

router.post('/createActivities', authRequired, validateSchema(createActivitySchema), createActivity)


export default router