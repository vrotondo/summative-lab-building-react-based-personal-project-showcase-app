import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ProductContext } from '../context/ProductContext'
import LoadingSpinner from '../components/common/LoadingSpinner'
import apiService from '../services/apiService'

const ProductDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { products, setProducts } = useContext(ProductContext)

    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [isDeleting, setIsDeleting] = useState(false)

    // Fetch product data
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true)
                const data = await apiService.getProduct(id)
                setProduct(data)
            } catch (err) {
                setError(`Error loading product: ${err.message}`)
                console.error('Error fetching product details:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchProduct()
    }, [id])

    // Handle product deletion
    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this product?')) {
            return
        }

        try {
            setIsDeleting(true)
            await apiService.deleteProduct(id)

            // Update products in context
            setProducts(products.filter(p => p.id !== parseInt(id)))
            navigate('/', { replace: true })
        } catch (err) {
            setError(`Failed to delete product: ${err.message}`)
            console.error('Error deleting product:', err)
            setIsDeleting(false)
        }
    }

    if (loading) {
        return <LoadingSpinner />
    }

    if (error) {
        return (
            <div className="error-message">
                <h2>Error</h2>
                <p>{error}</p>
                <Link to="/" className="btn btn-primary">
                    Back to Products
                </Link>
            </div>
        )
    }

    if (!product) {
        return (
            <div className="not-found">
                <h2>Product Not Found</h2>
                <p>The product you're looking for doesn't exist or has been removed.</p>
                <Link to="/" className="btn btn-primary">
                    Back to Products
                </Link>
            </div>
        )
    }

    return (
        <div className="product-detail-container">
            <div className="product-detail">
                <div className="product-image">
                    {product.image ? (
                        <img src={product.image} alt={product.name} />
                    ) : (
                        <div className="no-image">No image available</div>
                    )}
                </div>

                <div className="product-info">
                    <h1>{product.name}</h1>

                    <div className="product-meta">
                        <span className="product-category">{product.category}</span>
                        <span className="product-price">${product.price.toFixed(2)}</span>
                        <span className={`product-stock ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                        </span>
                    </div>

                    <p className="product-description">{product.description}</p>

                    <div className="product-actions">
                        <Link to={`/products/${id}/edit`} className="btn btn-secondary">
                            Edit Product
                        </Link>
                        <button
                            className="btn btn-danger"
                            onClick={handleDelete}
                            disabled={isDeleting}
                        >
                            {isDeleting ? 'Deleting...' : 'Delete Product'}
                        </button>
                        <Link to="/" className="btn btn-outline">
                            Back to Products
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail