import axios from './axios.js'

export const createIcfes = icfes => axios.post('/api/createIcfes', icfes)
export const getAllIcfes = token => axios.post('/api/fcfes', {token})
export const getIcfesBySubject = ({subject, token}) => axios.post(`/api/icfesBySubject`, {subject, token})