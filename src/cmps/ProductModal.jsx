import { useState, useEffect } from 'react'

export function ProductModal({ isOpen, mode, product, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    price: '',
    category: '',
    stock: '',
    status: 'active',
    description: ''
  })

  useEffect(() => {
    if (product && mode === 'edit') {
      setFormData({
        name: product.name || '',
        sku: product.sku || '',
        price: product.price || '',
        category: product.category || '',
        stock: product.stock || '',
        status: product.status || 'active',
        description: product.description || ''
      })
    } else {
      setFormData({
        name: '',
        sku: '',
        price: '',
        category: '',
        stock: '',
        status: 'active',
        description: ''
      })
    }
  }, [product, mode])

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.name && formData.sku && formData.price && formData.category) {
      onSave({
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock) || 0
      })
    }
  }

  const handleCancel = () => {
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="product-modal__overlay" onClick={handleCancel}>
      <div className="product-modal__content" onClick={(e) => e.stopPropagation()}>
        <div className="product-modal__header">
          <h2 className="product-modal__title">
            {mode === 'add' ? 'Add New Product' : 'Edit Product'}
          </h2>
          <button className="product-modal__close-button" onClick={handleCancel}>
            ✕
          </button>
        </div>
        
        <form className="product-modal__form" onSubmit={handleSubmit}>
          <div className="product-modal__form-grid">
            <div className="product-modal__form-group">
              <label className="product-modal__label">Product Name</label>
              <input
                type="text"
                className="product-modal__input"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter product name"
                required
              />
            </div>
            
            <div className="product-modal__form-group">
              <label className="product-modal__label">SKU</label>
              <input
                type="text"
                className="product-modal__input"
                value={formData.sku}
                onChange={(e) => handleInputChange('sku', e.target.value)}
                placeholder="Enter SKU"
                required
              />
            </div>
            
            <div className="product-modal__form-group">
              <label className="product-modal__label">Price</label>
              <input
                type="number"
                step="0.01"
                className="product-modal__input"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                placeholder="0.00"
                required
              />
            </div>
            
            <div className="product-modal__form-group">
              <label className="product-modal__label">Stock Quantity</label>
              <input
                type="number"
                className="product-modal__input"
                value={formData.stock}
                onChange={(e) => handleInputChange('stock', e.target.value)}
                placeholder="0"
                required
              />
            </div>
            
            <div className="product-modal__form-group">
              <label className="product-modal__label">Category</label>
              <select
                className="product-modal__select"
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                required
              >
                <option value="">Select category</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Home & Kitchen">Home & Kitchen</option>
                <option value="Sports">Sports</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>
            
            <div className="product-modal__form-group">
              <label className="product-modal__label">Status</label>
              <select
                className="product-modal__select"
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                required
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="out-of-stock">Out of Stock</option>
              </select>
            </div>
          </div>
          
          <div className="product-modal__form-group">
            <label className="product-modal__label">Description</label>
            <textarea
              className="product-modal__textarea"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Enter product description"
              rows="3"
            />
          </div>
          
          <div className="product-modal__actions">
            <button type="button" className="product-modal__button product-modal__button--cancel" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className="product-modal__button product-modal__button--save">
              {mode === 'add' ? 'Add Product' : 'Update Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 