import axios from 'axios'

const { VITE_BACKEND_URL_DEV, VITE_BACKEND_URL_PROD, VITE_ENV } = import.meta.env
const URL = VITE_ENV === 'dev' ? VITE_BACKEND_URL_DEV : VITE_BACKEND_URL_PROD

const instance = axios.create({
    baseURL: URL,
    withCredentials: true,
})

export default instance