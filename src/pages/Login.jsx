export function Login() {
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Sign in to your PixieShelf account</p>
        </div>
        
        <form className="login-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              className="form-input"
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
              placeholder="Enter your password"
              required
            />
          </div>
          
          <button type="submit" className="login-button">
            Sign In
          </button>
          
          <div className="form-footer">
            <a href="#" className="forgot-password">
              Forgot your password?
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}