import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    proxy: import.meta.env.VITE_AXIOS_PROXY ?? {
        protocol: import.meta.env.VITE_AXIOS_PROXY_PROTOCOL,
        host: import.meta.env.VITE_AXIOS_PROXY_HOST,
        port: import.meta.env.VITE_AXIOS_PROXY_PORT
    }
})

export default api