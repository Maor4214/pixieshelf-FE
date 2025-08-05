import { Navigate } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'
import { AccessDenied } from '../pages/AccessDenied'

export function ProtectedRoute({ children, requireAuth = false, requireAdmin = false }) {
  const { isLoggedIn, isAdmin, loading } = useUser()

  // Show loading while checking authentication
  if (loading) {
    return <div className="loading">Loading...</div>
  }

  // If route requires authentication but user is not logged in
  if (requireAuth && !isLoggedIn()) {
    return <Navigate to="/login" replace />
  }

  // If route requires admin but user is not admin
  if (requireAdmin && !isAdmin()) {
    return <AccessDenied />
  }

  return children
} 