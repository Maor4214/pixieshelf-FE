import { createContext, useContext, useState, useEffect } from 'react'

const UserContext = createContext()

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('user')
    const savedToken = localStorage.getItem('authToken')
    
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = (userData, token) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
    if (token) {
      localStorage.setItem('authToken', token)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    localStorage.removeItem('authToken')
    // Redirect to home page
    window.location.href = '/'
  }

  const isLoggedIn = () => !!user
  const isAdmin = () => user?.userType === 'admin'
  const isMember = () => user?.userType === 'regular'
  const isGuest = () => !user

  const value = {
    user,
    login,
    logout,
    isLoggedIn,
    isAdmin,
    isMember,
    isGuest,
    loading
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
} 