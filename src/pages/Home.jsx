import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ProductContext } from '../context/ProductContext'
import useSearch from '../hooks/useSearch'
import ProductCard from '../components/products/ProductCard'
import SearchBar from '../components/common/SearchBar'
import LoadingSpinner from '../components/common/LoadingSpinner'

const Home = () => {
    const { products, storeInfo, loading, error } = useContext(ProductContext)
    const { query, results, isSearching, handleSearchChange, clearSearch } = useSearch()

    if (loading) {
        return <LoadingSpinner />
    }

    if (error) {
        return (
            <div className="error-message">
                <h2>Error Loading Data</h2>
                <p>{error}</p>
                <p>Please try refreshing the page or contact support if the problem persists.</p>
            </div>
        )
    }

    // Determine which products to display
    const displayProducts = query ? results : products

    return (
        <div className="home-container">
            <section className="hero">
                <div className="hero-content">
                    <h1>{storeInfo?.name || 'Tech Gadgets Hub'}</h1>
                    <p className="store-description">
                        {storeInfo?.description || 'Your one-stop shop for all the latest tech gadgets and accessories'}
                    </p>
                    <Link to="/products/new" className="btn btn-primary">
                        Add New Product
                    </Link>
                </div>
            </section>

            <section className="search-section">
                <h2>Manage Products</h2>
                <SearchBar
                    query={query}
                    onChange={handleSearchChange}
                    onClear={clearSearch}
                    placeholder="Search products by name, description, or category..."
                />
            </section>

            <section className="products-section">
                {isSearching ? (
                    <LoadingSpinner />
                ) : displayProducts.length > 0 ? (
                    <div className="products-grid">
                        {displayProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="no-products">
                        {query ? (
                            <p>No products match your search criteria. Try a different search term.</p>
                        ) : (
                            <p>No products available. Click "Add New Product" to create one.</p>
                        )}
                    </div>
                )}
            </section>
        </div>
    )
}

export default Home