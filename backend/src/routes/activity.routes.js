import { Router } from 'express'
import { authRequired } from '../middlewares/validateToken.js'
import { getAllActivities, getActivityById, getActivitiesBySubject, createActivity, createExamBySubject } from '../controllers/activity.controller.js'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { createActivitySchema } from '../schemas/activity.schema.js'

const router = new Router()

router.get('/activities', authRequired, getAllActivities)

router.get('/activity/:id', authRequired, getActivityById)

router.get('/activity/:subject', authRequired, getActivitiesBySubject)

//router.get('/activity/:subject', authRequired, createExamBySubject)

router.post('/createActivities', authRequired, validateSchema(createActivitySchema), createActivity)


export default router