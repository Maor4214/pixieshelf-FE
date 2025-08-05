import { useState, useEffect } from 'react'
import { ProductManagement } from '../cmps/ProductManagement'
import { ProductFilters } from '../cmps/ProductFilters'
import { ProductList } from '../cmps/ProductList'
import { ProductModal } from '../cmps/ProductModal'
import { productService } from '../services/prodcut.service.js'

export function ProductIndex() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [searchTerm, setSearchTerm] = useState("")
  const [filterBy, setFilterBy] = useState("Product Name")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [modalMode, setModalMode] = useState("add") // "add" or "edit"

  // Fetch products from backend API
  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      const products = await productService.query()
      setProducts(products)
    } catch (err) {
      console.error('Failed to load products:', err)
      setError('Failed to load products from database')
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  const handleSearchChange = (value) => {
    setSearchTerm(value)
  }

  const handleFilterChange = (value) => {
    setFilterBy(value)
  }

  const handleAddProduct = () => {
    setModalMode("add")
    setEditingProduct(null)
    setIsModalOpen(true)
  }

  const handleEditProduct = (product) => {
    setModalMode("edit")
    setEditingProduct(product)
    setIsModalOpen(true)
  }

  const handleDeleteProduct = async (productId) => {
    try {
      await productService.remove(productId)
      setProducts(products.filter(product => product._id !== productId))
    } catch (err) {
      console.error('Failed to delete product:', err)
      setError('Failed to delete product')
    }
  }

  const handleSaveProduct = async (productData) => {
    try {
      if (modalMode === "add") {
        const newProduct = await productService.add(productData)
        setProducts([...products, newProduct])
      } else {
        const updatedProduct = await productService.update(editingProduct._id, productData)
        setProducts(products.map(product => 
          product._id === editingProduct._id ? updatedProduct : product
        ))
      }
      setIsModalOpen(false)
      setEditingProduct(null)
    } catch (err) {
      console.error('Failed to save product:', err)
      setError('Failed to save product')
    }
  }

  const filteredProducts = products.filter(product => {
    const searchLower = searchTerm.toLowerCase()
    if (filterBy === "Product Name") {
      return product.name.toLowerCase().includes(searchLower)
    } else if (filterBy === "SKU") {
      return product.sku.toLowerCase().includes(searchLower)
    }
    return product.name.toLowerCase().includes(searchLower) || product.sku.toLowerCase().includes(searchLower)
  })

  const totalProducts = products.length
  const activeProducts = products.filter(p => p.status === "active").length
  const lowStockProducts = products.filter(p => p.stock < 20).length
  const outOfStockProducts = products.filter(p => p.status === "out-of-stock").length

  if (loading) {
    return <div className="loading">Loading products from database...</div>
  }

  if (error) {
    return (
      <div className="error">
        <h3>Error: {error}</h3>
        <button onClick={loadProducts}>Retry</button>
      </div>
    )
  }

  return (
    <div className="product-index">
      <ProductManagement 
        totalProducts={totalProducts}
        activeProducts={activeProducts}
        lowStockProducts={lowStockProducts}
        totalValue={outOfStockProducts}
        onAddProduct={handleAddProduct}
      />
      
      <ProductFilters 
        searchTerm={searchTerm}
        filterBy={filterBy}
        onSearchChange={handleSearchChange}
        onFilterChange={handleFilterChange}
      />
      
      <ProductList 
        products={filteredProducts}
        onEditProduct={handleEditProduct}
        onDeleteProduct={handleDeleteProduct}
      />
      
      {isModalOpen && (
        <ProductModal 
          isOpen={isModalOpen}
          mode={modalMode}
          product={editingProduct}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveProduct}
        />
      )}
    </div>
  )
} 