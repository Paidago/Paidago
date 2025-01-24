import { Router } from 'express'
import { authRequired } from '../middlewares/validateToken.js'
import { createExamBySubject, getExams } from '../controllers/exam.controller.js'

const router = new Router()

router.post('/createExam', authRequired, createExamBySubject)
router.get('/exams', authRequired, getExams)

export default router