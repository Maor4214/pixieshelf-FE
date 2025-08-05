export function HomePage() {
  return (
    <div className="home-page">
      <section className="hero-section">
        <h1 className="hero-title">Welcome to PixieShelf</h1>
        <p className="hero-subtitle">Your ultimate product management solution</p>
        <button className="cta-button">Get Started</button>
      </section>
      
      <section className="features-section">
        <div className="features-container">
          <h2 className="features-title">Key Features</h2>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">📦</div>
              <h3 className="feature-title">Product Management</h3>
              <p className="feature-description">Efficiently organize and manage your product inventory</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🔍</div>
              <h3 className="feature-title">Easy Navigation</h3>
              <p className="feature-description">Intuitive interface for seamless product browsing</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🔒</div>
              <h3 className="feature-title">Secure Access</h3>
              <p className="feature-description">Protected login system for authorized users</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 