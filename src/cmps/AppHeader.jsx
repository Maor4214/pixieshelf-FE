import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { Logo } from './Logo'
import { useUser } from '../contexts/UserContext'
import { authService } from '../services/auth.service'

export function AppHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, isLoggedIn, isAdmin, logout } = useUser()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const handleLogout = async () => {
    try {
      await authService.logout()
      logout()
      closeMenu()
    } catch (err) {
      console.error('Logout failed:', err)
      // Still logout locally even if API fails
      logout()
      closeMenu()
    }
  }

  return (
    <header className="app-header">
      <div className="header-container">
        <Logo />
        
        {/* Desktop Navigation */}
        <nav className="nav-container desktop-nav">
          <NavLink to="/" className="nav-link" onClick={closeMenu}>Home</NavLink>
          <NavLink to="/products" className="nav-link" onClick={closeMenu}>Products</NavLink>
          
          {/* Show Create Users only for admins */}
          {isAdmin() && (
            <NavLink to="/create-user" className="nav-link" onClick={closeMenu}>Create Users</NavLink>
          )}
          
          {/* Show Login/Logout based on authentication */}
          {isLoggedIn() ? (
            <div className="user-section">
              <span className="user-info">
                {user.email} ({user.userType})
              </span>
              <button className="nav-link logout-button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <NavLink to="/login" className="nav-link login-button" onClick={closeMenu}>Login</NavLink>
          )}
        </nav>

        {/* Mobile Hamburger Button */}
        <button 
          className={`hamburger-button ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* Mobile Navigation Overlay */}
        <div className={`mobile-nav-overlay ${isMenuOpen ? 'active' : ''}`} onClick={closeMenu}>
          <nav className="mobile-nav" onClick={(e) => e.stopPropagation()}>
            <NavLink to="/" className="mobile-nav-link" onClick={closeMenu}>Home</NavLink>
            <NavLink to="/products" className="mobile-nav-link" onClick={closeMenu}>Products</NavLink>
            
            {/* Show Create Users only for admins */}
            {isAdmin() && (
              <NavLink to="/create-user" className="mobile-nav-link" onClick={closeMenu}>Create Users</NavLink>
            )}
            
            {/* Show Login/Logout based on authentication */}
            {isLoggedIn() ? (
              <>
                <div className="mobile-user-info">
                  {user.email} ({user.userType})
                </div>
                <button className="mobile-nav-link logout-button" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <NavLink to="/login" className="mobile-nav-link login-button" onClick={closeMenu}>Login</NavLink>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}

