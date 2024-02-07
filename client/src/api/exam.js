import axios from './axios.js'

export const getAllExams = token => axios.post('/api/exams', {token})
export const createExam = subject => axios.post('/api/createExam', subject)