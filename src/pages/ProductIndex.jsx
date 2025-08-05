import { useState, useEffect } from 'react'
import { ProductManagement } from '../cmps/ProductManagement'
import { ProductFilters } from '../cmps/ProductFilters'
import { ProductList } from '../cmps/ProductList'
import { ProductModal } from '../cmps/ProductModal'
import { productService } from '../services/prodcut.service.js'
import { useUser } from '../contexts/UserContext'

export function ProductIndex() {
  const { isLoggedIn } = useUser()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [searchTerm, setSearchTerm] = useState("")
  const [filterBy, setFilterBy] = useState("Product Name")
  const [isDescending, setIsDescending] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [modalMode, setModalMode] = useState("add") // "add" or "edit"

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

  const handleSearchChange = (value) => setSearchTerm(value)
  const handleFilterChange = (value) => setFilterBy(value)
  const handleDescendingChange = (value) => setIsDescending(value)

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
      const productName = (product.name || '').toLowerCase()
      return productName.includes(searchLower)
    } else if (filterBy === "SKU") {
      const productSku = (product.sku || '').toLowerCase()
      return productSku.includes(searchLower)
    } else if (filterBy === "Category") {
      const productCategory = (product.category || '').toLowerCase()
      return productCategory.includes(searchLower)
    } else if (filterBy === "Stock") {
      const productStock = (product.stock || 0).toString()
      return productStock.includes(searchLower)
    } else if (filterBy === "Description") {
      const productDescription = (product.description || '').toLowerCase()
      return productDescription.includes(searchLower)
    }

    return true
  }).sort((a, b) => {
    let aValue, bValue

    if (filterBy === "Product Name") {
      aValue = a.name || ''
      bValue = b.name || ''
    } else if (filterBy === "SKU") {
      aValue = a.sku || ''
      bValue = b.sku || ''
    } else if (filterBy === "Category") {
      aValue = a.category || ''
      bValue = b.category || ''
    } else if (filterBy === "Stock") {
      aValue = a.stock || 0
      bValue = b.stock || 0
      return isDescending ? bValue - aValue : aValue - bValue
    } else if (filterBy === "Description") {
      aValue = a.description || ''
      bValue = b.description || ''
    } else {
      aValue = a.name || ''
      bValue = b.name || ''
    }

    const comparison = aValue.toString().localeCompare(bValue.toString())
    return isDescending ? -comparison : comparison
  })

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
      <div className="product-index__header">
        <h1 className="product-index__title">Product Management</h1>
      </div>

      {isLoggedIn() && (
        <ProductManagement products={products} onAddProduct={handleAddProduct} />
      )}

      <ProductFilters
        searchTerm={searchTerm}
        filterBy={filterBy}
        isDescending={isDescending}
        onSearchChange={handleSearchChange}
        onFilterChange={handleFilterChange}
        onDescendingChange={handleDescendingChange}
      />

      <ProductList
        products={filteredProducts}
        onEditProduct={handleEditProduct}
        onDeleteProduct={handleDeleteProduct}
        showActions={isLoggedIn()}
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
