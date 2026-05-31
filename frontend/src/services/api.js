import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api'
})

api.interceptors.request.use((config) => {
    
    const token = localStorage.getItem('token')
    
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export const login = (data) => api.post('/auth/login', data)

export const getProducts = () => api.get('/products')
export const createProduct = (data) => api.post('/products', data)
export const updateProduct = (id, data) => api.put(`/products/${id}`, data)
export const deleteProduct = (id) => api.delete(`/products/${id}`)

export const createTransaction = (data) => api.post('/transactions', data)
export const getHistory = () => api.get('/transactions')

export const getDashboard = () => api.get('/transactions/dashboard')

export default api