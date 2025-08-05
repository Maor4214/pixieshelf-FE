import { useState } from 'react'
import { ProductManagement } from '../cmps/ProductManagement'
import { ProductFilters } from '../cmps/ProductFilters'
import { ProductList } from '../cmps/ProductList'
import { ProductModal } from '../cmps/ProductModal'

export function ProductIndex() {
  const [products, setProducts] = useState([
    {
      id: "1",
      name: "Ceramic Coffee Mug",
      sku: "CCM-004",
      price: 12.99,
      category: "Home & Kitchen",
      stock: 78,
      status: "active",
      dateAdded: "22.1.2024",
      description: "Handcrafted ceramic coffee mug with unique design"
    },
    {
      id: "2",
      name: "Leather Wallet",
      sku: "LW-006",
      price: 67.99,
      category: "Accessories",
      stock: 15,
      status: "inactive",
      dateAdded: "12.1.2024",
      description: "Genuine leather wallet with RFID protection"
    },
    {
      id: "3",
      name: "Organic Cotton T-Shirt",
      sku: "OCT-002",
      price: 24.99,
      category: "Clothing",
      stock: 120,
      status: "active",
      dateAdded: "20.1.2024",
      description: "Comfortable organic cotton t-shirt in various colors"
    },
    {
      id: "4",
      name: "Smart Fitness Tracker",
      sku: "SFT-003",
      price: 159.99,
      category: "Electronics",
      stock: 0,
      status: "out-of-stock",
      dateAdded: "18.1.2024",
      description: "Advanced fitness tracker with heart rate monitoring"
    },
    {
      id: "5",
      name: "Wireless Bluetooth Headphones",
      sku: "WBH-001",
      price: 89.99,
      category: "Electronics",
      stock: 45,
      status: "active",
      dateAdded: "15.1.2024",
      description: "High-quality wireless headphones with noise cancellation"
    },
    {
      id: "6",
      name: "Yoga Mat Premium",
      sku: "YMP-005",
      price: 49.99,
      category: "Sports",
      stock: 30,
      status: "active",
      dateAdded: "25.1.2024",
      description: "Non-slip premium yoga mat for all types of practice"
    }
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterBy, setFilterBy] = useState("Product Name")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [modalMode, setModalMode] = useState("add") // "add" or "edit"

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

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter(product => product.id !== productId))
  }

  const handleSaveProduct = (productData) => {
    if (modalMode === "add") {
      const newProduct = {
        ...productData,
        id: Date.now().toString(),
        dateAdded: new Date().toLocaleDateString()
      }
      setProducts([...products, newProduct])
    } else {
      setProducts(products.map(product => 
        product.id === editingProduct.id ? { ...product, ...productData } : product
      ))
    }
    setIsModalOpen(false)
    setEditingProduct(null)
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