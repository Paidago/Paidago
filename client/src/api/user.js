import axios from './axios.js'

export const removeUser = id => axios.post('/api/removeUser', id)
export const updateUser = newUser => axios.post('/api/updateUser', newUser)