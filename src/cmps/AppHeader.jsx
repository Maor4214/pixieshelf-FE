import { NavLink } from 'react-router-dom'
import { Logo } from './Logo'

export function AppHeader() {
  return (
    <header className="app-header">
      <div className="header-container">
        <Logo />
        
        <nav className="nav-container">
          <NavLink to="/" className="nav-link">Home</NavLink>
          <NavLink to="/products" className="nav-link">Products</NavLink>
          <NavLink to="/login" className="nav-link login-button">Login</NavLink>
        </nav>
      </div>
    </header>
  )
}

