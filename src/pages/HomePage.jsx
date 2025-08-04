export function HomePage() {
  return (
    <div className="home-page">
      <section className="hero-section">
        <h1>Welcome to PixieShelf</h1>
        <p>Your ultimate product management solution</p>
      </section>
      
      <section className="features-section">
        <h2>Key Features</h2>
        <div className="features-grid">
          <div className="feature-item">
            <h3>Product Management</h3>
            <p>Efficiently organize and manage your product inventory</p>
          </div>
          <div className="feature-item">
            <h3>Easy Navigation</h3>
            <p>Intuitive interface for seamless product browsing</p>
          </div>
          <div className="feature-item">
            <h3>Secure Access</h3>
            <p>Protected login system for authorized users</p>
          </div>
        </div>
      </section>
      
      <section className="cta-section">
        <h2>Get Started</h2>
        <p>Explore our products and discover what PixieShelf can do for you</p>
      </section>
    </div>
  )
} 