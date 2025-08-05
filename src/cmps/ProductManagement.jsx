export function ProductManagement({ totalProducts, activeProducts, lowStockProducts, totalValue, onAddProduct }) {
  const outOfStockProducts = totalValue // Using totalValue prop for out of stock count
  
  return (
    <div className="product-management">
      <div className="product-management__header">
        <div className="product-management__title-section">
          <h1 className="product-management__title">
            <span className="product-management__icon">📦</span>
            Product Management
          </h1>
          <p className="product-management__subtitle">
            Manage your inventory with precision and style
          </p>
        </div>
        <button className="product-management__add-button" onClick={onAddProduct}>
          <span className="product-management__add-icon">+</span>
          Add Product
        </button>
      </div>
      
      <div className="product-management__stats">
        <div className="product-management__stat-item">
          <div className="product-management__stat-icon">📦</div>
          <div className="product-management__stat-content">
            <div className="product-management__stat-value">{totalProducts}</div>
            <div className="product-management__stat-label">Total Products</div>
          </div>
        </div>
        
        <div className="product-management__stat-item">
          <div className="product-management__stat-icon product-management__stat-icon--active">✓</div>
          <div className="product-management__stat-content">
            <div className="product-management__stat-value">{activeProducts}</div>
            <div className="product-management__stat-label">Active</div>
          </div>
        </div>
        
        <div className="product-management__stat-item">
          <div className="product-management__stat-icon product-management__stat-icon--warning">⚠</div>
          <div className="product-management__stat-content">
            <div className="product-management__stat-value">{lowStockProducts}</div>
            <div className="product-management__stat-label">Low Stock</div>
          </div>
        </div>
        
        <div className="product-management__stat-item">
          <div className="product-management__stat-icon product-management__stat-icon--out-of-stock">🚫</div>
          <div className="product-management__stat-content">
            <div className="product-management__stat-value">{outOfStockProducts}</div>
            <div className="product-management__stat-label">Out of Stock</div>
          </div>
        </div>
      </div>
    </div>
  )
} 