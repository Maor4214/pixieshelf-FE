import { useState, useEffect } from 'react'

export function ProductModal({ isOpen, mode, product, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    stock: '',
    description: ''
  })

  useEffect(() => {
    if (product && mode === 'edit') {
      setFormData({
        name: product.name || '',
        category: product.category || '',
        stock: product.stock || '',
        description: product.description || ''
      })
    } else {
      setFormData({
        name: '',
        category: '',
        stock: '',
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
    
    // Validate product name length
    if (formData.name.length > 50) {
      alert('Product name cannot exceed 50 characters')
      return
    }
    
    if (formData.name && formData.category) {
      const productData = {
        ...formData,
        stock: parseInt(formData.stock) || 0,
        marketDate: new Date().toISOString()
      }
      onSave(productData)
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
                maxLength="50"
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
                <option value="Fruit">Fruit</option>
                <option value="Vegetable">Vegetable</option>
                <option value="Dairy">Dairy</option>
                <option value="Meat">Meat</option>
                <option value="Bakery">Bakery</option>
                <option value="Beverages">Beverages</option>
                <option value="Snacks">Snacks</option>
                <option value="Frozen">Frozen</option>
                <option value="Canned">Canned</option>
                <option value="Organic">Organic</option>
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