export function ProductFilters({ searchTerm, filterBy, onSearchChange, onFilterChange }) {
  return (
    <div className="product-filters">
      <div className="product-filters__search-container">
        <span className="product-filters__search-icon">🔍</span>
        <input
          type="text"
          className="product-filters__search-input"
          placeholder="Search products by name or SKU..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <div className="product-filters__filter-container">
        <span className="product-filters__filter-icon">⚙</span>
        <select
          className="product-filters__filter-select"
          value={filterBy}
          onChange={(e) => onFilterChange(e.target.value)}
        >
          <option value="Product Name">Product Name</option>
          <option value="SKU">SKU</option>
        </select>
      </div>
    </div>
  )
} 