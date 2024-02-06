import axios from './axios.js'

export const createActivity = activity => axios.post('/api/createActivities', activity)
export const getAllActivities = token => axios.post('/api/activities', {token})
export const createExam = subject => axios.post('/api/createExam', subject)