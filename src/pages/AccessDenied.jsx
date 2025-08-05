import { useNavigate } from 'react-router-dom'

export function AccessDenied() {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1) // Go back to previous page
  }

  const handleGoHome = () => {
    navigate('/')
  }

  return (
    <div className="access-denied-page">
      <div className="access-denied-container">
        <div className="access-denied-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" fill="#e74c3c"/>
          </svg>
        </div>
        
        <h1 className="access-denied-title">Access Denied</h1>
        
        <p className="access-denied-message">
          Sorry, you don't have permission to access this page.
        </p>
        
        <p className="access-denied-subtitle">
          This page is restricted to administrators only.
        </p>
        
        <div className="access-denied-actions">
          <button 
            className="btn btn-secondary" 
            onClick={handleGoBack}
          >
            ← Go Back
          </button>
          
          <button 
            className="btn btn-primary" 
            onClick={handleGoHome}
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  )
} 