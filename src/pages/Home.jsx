import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { ProductContext } from '../context/ProductContext'
import useSearch from '../hooks/useSearch'
import ProductCard from '../components/products/ProductCard'
import SearchBar from '../components/common/SearchBar'
import LoadingSpinner from '../components/common/LoadingSpinner'

const Home = () => {
    const { products, loading, error } = useContext(ProductContext)
    const { query, results, isSearching, handleSearchChange, clearSearch } = useSearch()
    const [storeInfo, setStoreInfo] = useState(null)

    // Fetch store information
    useState(() => {
        const fetchStoreInfo = async () => {
            try {
                const response = await fetch('http://localhost:3000/store_info')
                if (!response.ok) {
                    throw new Error('Failed to fetch store information')
                }
                const data = await response.json()
                setStoreInfo(data[0])
            } catch (err) {
                console.error('Error fetching store info:', err)
            }
        }

        fetchStoreInfo()
    }, [])

    if (loading) {
        return <LoadingSpinner />
    }

    if (error) {
        return <div className="error-message">Error: {error}</div>
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
                        {query ? 'No products match your search' : 'No products available'}
                    </div>
                )}
            </section>
        </div>
    )
}

export default Home