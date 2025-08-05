import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { HomePage } from './pages/HomePage'
import { ProductIndex } from './pages/ProductIndex'
import { Login } from './pages/Login'
import { Routes, Route } from 'react-router-dom'
import './assets/styles/main.scss'

export function App() {
  return (
    <div className="app">
      <AppHeader />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductIndex />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <AppFooter />
    </div>
  )
}


