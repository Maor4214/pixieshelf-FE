export function ProductList({ products, onEditProduct, onDeleteProduct }) {
  const getStatusInfo = (status) => {
    switch (status) {
      case "active":
        return { class: "product-list__status--active", text: "Active" }
      case "inactive":
        return { class: "product-list__status--inactive", text: "Inactive" }
      case "out-of-stock":
        return { class: "product-list__status--out-of-stock", text: "Out of Stock" }
      default:
        return { class: "", text: "Available" }
    }
  }

  const getStockColor = (stock) => {
    if (stock === 0) return "product-list__stock--zero"
    if (stock < 20) return "product-list__stock--low"
    return "product-list__stock--normal"
  }

  if (products.length === 0) {
    return (
      <div className="product-list__empty">
        <div className="product-list__empty-icon">📦</div>
        <h3 className="product-list__empty-title">No products found</h3>
        <p className="product-list__empty-text">
          Try adjusting your search terms or add a new product to get started.
        </p>
      </div>
    )
  }

  return (
    <div className="product-list">
      {products.map((product) => {
        const statusInfo = getStatusInfo(product.status)
        const stockColorClass = getStockColor(product.stock || 0)
        
        return (
          <div key={product._id || product.id} className="product-list__card">
            <div className="product-list__card-header">
              <div className="product-list__card-title-section">
                <h3 className="product-list__card-title">{product.name}</h3>
                <p className="product-list__card-sku">{product.sku}</p>
              </div>
              <div className="product-list__card-actions">
                <button 
                  className="product-list__action-button product-list__action-button--edit"
                  onClick={() => onEditProduct(product)}
                  title="Edit"
                >
                  ✏
                </button>
                <button 
                  className="product-list__action-button product-list__action-button--delete"
                  onClick={() => onDeleteProduct(product._id || product.id)}
                  title="Delete"
                >
                  🗑
                </button>
              </div>
            </div>
            
            <div className="product-list__card-content">
              <div className="product-list__card-main">
                {product.price && (
                  <div className="product-list__price">${product.price.toFixed(2)}</div>
                )}
                <div className={`product-list__status ${statusInfo.class}`}>
                  {statusInfo.text}
                </div>
              </div>
              
              <div className="product-list__card-divider"></div>
              
              <div className="product-list__card-details">
                <div className="product-list__detail-row">
                  <span className="product-list__detail-label">Category</span>
                  <span className="product-list__category-tag">{product.category}</span>
                </div>
                <div className="product-list__detail-row">
                  <span className="product-list__detail-label">Stock</span>
                  <span className={`product-list__stock ${stockColorClass}`}>
                    {product.stock || 0} units
                  </span>
                </div>
                <div className="product-list__detail-row">
                  <span className="product-list__detail-label">Added</span>
                  <span className="product-list__date">
                    {product.marketDate ? new Date(product.marketDate).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
              </div>
              
              <div className="product-list__card-description">
                <p className="product-list__description-text">{product.description}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
} 