import Axios from 'axios'

// Determine the base URL based on the current environment
const getBaseUrl = () => {
  if (window.location.port === '5173') {
    return 'http://localhost:3035/api/'
  }
  return import.meta.env.VITE_API_URL || '/api/'
}

const BASE_URL = getBaseUrl()
const axios = Axios.create({ 
  withCredentials: true,
  baseURL: BASE_URL
})

// Add request interceptor to include auth token
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Add response interceptor to handle auth errors
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Clear auth data
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')
      
      // Redirect based on error response
      const redirectPath = error.response?.data?.redirect || '/login'
      window.location.href = redirectPath
    }
    return Promise.reject(error)
  }
)

export const httpService = {
  get(endpoint, data) {
    return ajax(endpoint, 'GET', data)
  },
  post(endpoint, data) {
    return ajax(endpoint, 'POST', data)
  },
  put(endpoint, data) {
    return ajax(endpoint, 'PUT', data)
  },
  delete(endpoint, data) {
    return ajax(endpoint, 'DELETE', data)
  },
}

async function ajax(endpoint, method = 'GET', data = null) {
  const url = `${BASE_URL}${endpoint}`
  const params = method === 'GET' ? data : null

  const options = { url, method, data, params }

  try {
    const res = await axios(options)
    return res.data
  } catch (err) {
    console.error(
      `❌ Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: `,
      data
    )
    console.error(`❌ Full URL was:`, url)
    console.dir(err)
    throw err
  }
}
