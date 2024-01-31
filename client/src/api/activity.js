import axios from './axios.js'

export const createActivity = activity => axios.post('/api/createActivities', activity)