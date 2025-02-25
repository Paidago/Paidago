import axios from './axios.js'

export const createActivity = activity => axios.post('/api/createActivities', activity)
export const getAllActivities = token => axios.post('/api/activities', {token})
export const getActivitiesBySubject = ({subject, token}) => axios.post(`/api/activitiesBySubject`, {subject, token})
export const generateMindMap = ({classText, token}) => axios.post(`/api/generateMindMap`, {classText, token})