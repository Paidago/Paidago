import axios from './axios.js'

export const getPosts = () => axios.get('/api/getPosts')