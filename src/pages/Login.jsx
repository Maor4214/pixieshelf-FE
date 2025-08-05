import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'
import { authService } from '../services/auth.service'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'

export function Login() {
  const navigate = useNavigate()
  const { login } = useUser()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await authService.login(formData)
      login(response.user, response.token)
      showSuccessMsg('Login successful! Welcome back.')
      navigate('/products')
    } catch (err) {
      let errorMessage = 'Login failed. Please try again.'
      
      if (err.response?.status === 401) {
        errorMessage = 'Invalid email or password'
      } else if (err.response?.status === 400) {
        errorMessage = err.response.data?.error || 'Missing email or password'
      }
      
      setError(errorMessage)
      showErrorMsg(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Sign in to your PixieShelf account</p>
        </div>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              className="form-input"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-input"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
          
          <div className="form-footer">
            <p className="demo-info">
              <strong>Need an account?</strong><br />
              Contact an admin to create your user account.
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}