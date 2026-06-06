import axios from 'axios'

//create an axios instance with a base URL
const api = axios.create({
  baseURL: 'http://localhost:5000/api'
})

// attach token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api