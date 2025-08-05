import { httpService } from './http.service'

export const authService = {
  login,
  signup,
  logout,
}

async function login(credentials) {
  return httpService.post('auth/login', credentials)
}

async function signup(userData) {
  return httpService.post('auth/signup', userData)
}

async function logout() {
  try {
    await httpService.post('auth/logout')
  } catch (err) {
    console.error('Logout error:', err)
  } finally {
    // Always clear local storage even if API call fails
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
  }
} 