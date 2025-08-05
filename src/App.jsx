import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { HomePage } from './pages/HomePage'
import { ProductIndex } from './pages/ProductIndex'
import { Login } from './pages/Login'
import { CreateUser } from './pages/CreateUser'
import { Routes, Route } from 'react-router-dom'
import { UserProvider } from './contexts/UserContext'
import { ProtectedRoute } from './cmps/ProtectedRoute'
import { UserMsg } from './cmps/UserMsg'

import './assets/styles/main.scss'

export function App() {
  return (
    <UserProvider>
      <div className="app">
        <AppHeader />
        <UserMsg />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductIndex />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/create-user" 
              element={
                <ProtectedRoute requireAdmin={true}>
                  <CreateUser />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
        <AppFooter />
      </div>
    </UserProvider>
  )
}


