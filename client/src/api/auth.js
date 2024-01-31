import axios from './axios.js'

export const register = user => axios.post('/api/register', user)
export const login = user => axios.post('/api/login', user)
export const logout = () => axios.get('/api/logout')
export const verifyToken = token => axios.post('/api/auth/verify', token)