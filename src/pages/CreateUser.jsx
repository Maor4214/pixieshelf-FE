import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userService } from '../services/user.service'

export function CreateUser() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'regular'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

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
    setSuccess('')

    try {
      await userService.add(formData)
      setSuccess('User created successfully!')
      setFormData({
        email: '',
        password: '',
        userType: 'regular'
      })
      
      // Navigate back to products after a short delay
      setTimeout(() => {
        navigate('/products')
      }, 2000)
    } catch (err) {
      if (err.response?.status === 409) {
        setError('A user with this email already exists')
      } else if (err.response?.status === 400) {
        setError(err.response.data || 'Invalid input data')
      } else {
        setError('Failed to create user. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="create-user-page">
      <div className="create-user-container">
        <div className="create-user-header">
          <h1 className="create-user-title">Create New User</h1>
          <p className="create-user-subtitle">Add a new user to the system</p>
        </div>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        {success && (
          <div className="success-message">
            {success}
          </div>
        )}
        
        <form className="create-user-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              className="form-input"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Enter user email"
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
              placeholder="Enter password"
              required
              minLength="6"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="userType" className="form-label">User Type</label>
            <select
              id="userType"
              className="form-select"
              value={formData.userType}
              onChange={(e) => handleInputChange('userType', e.target.value)}
              required
            >
              <option value="regular">Regular</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          
          <div className="form-actions">
            <button 
              type="button" 
              className="cancel-button"
              onClick={() => navigate('/products')}
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="create-button"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 