export function AppHeader() {
  return (
    <header>
      <div className="logo-container">
        <img src="/pixieshelf-logo.png" alt="PixieShelf Logo" />
      </div>
      
      <nav>
        <button>Home</button>
        <button>Products</button>
      </nav>
      
      <div className="auth-container">
        <button>Login</button>
      </div>
    </header>
  )
}

