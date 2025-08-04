import { NavLink } from 'react-router-dom'

export function AppHeader() {
  return (
    <header>
      <div className="logo-container">
        <img src="/pixieshelf-logo.png" alt="PixieShelf Logo" />
      </div>
      
      <nav>
        <NavLink to="/" className="nav-link">Home</NavLink>
        <NavLink to="/products" className="nav-link">Products</NavLink>
      </nav>
      
      <div className="auth-container">
        <NavLink to="/login" className="nav-link">Login</NavLink>
      </div>
    </header>
  )
}

