import axios from './axios.js'

export const completeOrder = ids => axios.put(`/complete-order`, ids)