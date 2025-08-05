import { useState, useEffect } from 'react'
import { showErrorMsg } from '../services/event-bus.service'

export function ProductModal({ isOpen, mode, product, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    stock: '',
    description: ''
  })
  const [initialFormData, setInitialFormData] = useState({
    name: '',
    category: '',
    stock: '',
    description: ''
  })
  const [showConfirmation, setShowConfirmation] = useState(false)

  useEffect(() => {
    if (product && mode === 'edit') {
      const newFormData = {
        name: product.name || '',
        category: product.category || '',
        stock: product.stock || '',
        description: product.description || ''
      }
      setFormData(newFormData)
      setInitialFormData(newFormData)
    } else {
      const emptyFormData = {
        name: '',
        category: '',
        stock: '',
        description: ''
      }
      setFormData(emptyFormData)
      setInitialFormData(emptyFormData)
    }
  }, [product, mode])

  const isFormDirty = () => {
    return (
      formData.name !== initialFormData.name ||
      formData.category !== initialFormData.category ||
      formData.stock !== initialFormData.stock ||
      formData.description !== initialFormData.description
    )
  }

  const handleCloseAttempt = () => {
    if (isFormDirty()) {
      setShowConfirmation(true)
    } else {
      onClose()
    }
  }

  const handleConfirmClose = () => {
    setShowConfirmation(false)
    onClose()
  }

  const handleCancelClose = () => {
    setShowConfirmation(false)
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validate required fields
    if (!formData.name.trim()) {
      showErrorMsg('Product name is required')
      return
    }
    
    if (!formData.category) {
      showErrorMsg('Please select a category')
      return
    }
    
    // Validate product name length
    if (formData.name.length > 50) {
      showErrorMsg('Product name cannot exceed 50 characters')
      return
    }
    
    const productData = {
      ...formData,
      stock: parseInt(formData.stock) || 0,
      marketDate: new Date().toISOString()
    }
    onSave(productData)
  }

  if (!isOpen) return null

  return (
    <div className="product-modal__overlay" onClick={handleCloseAttempt}>
      <div className="product-modal__content" onClick={(e) => e.stopPropagation()}>
        <div className="product-modal__header">
          <h2 className="product-modal__title">
            {mode === 'add' ? 'Add New Product' : 'Edit Product'}
          </h2>
          <button className="product-modal__close-button" onClick={handleCloseAttempt}>
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
            <button type="button" className="product-modal__button product-modal__button--cancel" onClick={handleCloseAttempt}>
              Cancel
            </button>
            <button type="submit" className="product-modal__button product-modal__button--save">
              {mode === 'add' ? 'Add Product' : 'Update Product'}
            </button>
          </div>
        </form>
      </div>
      
      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="confirmation-modal__overlay">
          <div className="confirmation-modal__content" onClick={(e) => e.stopPropagation()}>
            <div className="confirmation-modal__header">
              <h3 className="confirmation-modal__title">Unsaved Changes</h3>
            </div>
            <div className="confirmation-modal__body">
              <p className="confirmation-modal__message">
                You have unsaved changes. Are you sure you want to exit without saving?
              </p>
            </div>
            <div className="confirmation-modal__actions">
              <button 
                type="button" 
                className="confirmation-modal__button confirmation-modal__button--cancel"
                onClick={handleCancelClose}
              >
                Cancel
              </button>
              <button 
                type="button" 
                className="confirmation-modal__button confirmation-modal__button--confirm"
                onClick={handleConfirmClose}
              >
                Exit Without Saving
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 