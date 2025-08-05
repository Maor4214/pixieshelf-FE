import React from 'react'

export function AppFooter() {
  return (
    <footer className="app-footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">PixieShelf</h3>
            <p className="footer-description">
              Your ultimate product management solution for efficient inventory control.
            </p>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-subtitle">Contact Us</h4>
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <span className="contact-text">support@pixieshelf.com</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <span className="contact-text">+972 54-664-6733</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <span className="contact-text">Golda meir 44, Modiin</span>
              </div>
            </div>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-subtitle">Quick Links</h4>
            <div className="footer-links">
              <a href="/" className="footer-link">Home</a>
              <a href="/products" className="footer-link">Products</a>
              <a href="/login" className="footer-link">Login</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              © 2025 PixieShelf. All rights reserved.
            </p>
            <div className="footer-bottom-links">
              <a href="/privacy" className="footer-bottom-link">Privacy Policy</a>
              <a href="/terms" className="footer-bottom-link">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 