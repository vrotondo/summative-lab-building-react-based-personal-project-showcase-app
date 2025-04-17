import { useState, useEffect, useContext, useId } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ProductContext } from '../context/ProductContext'
import LoadingSpinner from '../components/common/LoadingSpinner'
import apiService from '../services/apiService'

const initialFormState = {
    name: '',
    description: '',
    category: '',
    price: '',
    stock: '',
    image: ''
}

const ProductForm = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { products, setProducts } = useContext(ProductContext)
    const isEditMode = Boolean(id)

    // Generate unique IDs for form fields
    const nameId = useId()
    const descriptionId = useId()
    const categoryId = useId()
    const priceId = useId()
    const stockId = useId()
    const imageId = useId()

    // Form state
    const [formState, setFormState] = useState(initialFormState)
    const [loading, setLoading] = useState(false)
    const [initialLoading, setInitialLoading] = useState(isEditMode)
    const [error, setError] = useState(null)

    // Fetch product data if in edit mode
    useEffect(() => {
        if (isEditMode) {
            const fetchProduct = async () => {
                try {
                    setInitialLoading(true)
                    const productData = await apiService.getProduct(id)
                    setFormState(productData)
                } catch (err) {
                    setError(`Error loading product: ${err.message}`)
                    console.error('Error fetching product:', err)
                } finally {
                    setInitialLoading(false)
                }
            }

            fetchProduct()
        }
    }, [id, isEditMode])

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormState(prev => ({
            ...prev,
            [name]: name === 'price' || name === 'stock' ? parseFloat(value) || '' : value
        }))
    }

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const productData = {
                ...formState,
                price: parseFloat(formState.price),
                stock: parseInt(formState.stock, 10)
            }

            let response

            if (isEditMode) {
                // Update existing product
                response = await apiService.updateProduct(id, productData)

                // Update products in context
                setProducts(products.map(product =>
                    product.id === response.id ? response : product
                ))
            } else {
                // Create new product
                response = await apiService.createProduct(productData)

                // Add new product to context
                setProducts([...products, response])
            }

            // Navigate back to product list
            navigate('/')
        } catch (err) {
            setError(`Failed to ${isEditMode ? 'update' : 'create'} product: ${err.message}`)
            console.error('Error saving product:', err)
        } finally {
            setLoading(false)
        }
    }

    if (initialLoading) {
        return <LoadingSpinner />
    }

    return (
        <div className="product-form-container">
            <h1>{isEditMode ? 'Edit Product' : 'Add New Product'}</h1>

            {error && (
                <div className="error-message">
                    <p>{error}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="product-form">
                <div className="form-group">
                    <label htmlFor={nameId}>Product Name:</label>
                    <input
                        type="text"
                        id={nameId}
                        name="name"
                        value={formState.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor={descriptionId}>Description:</label>
                    <textarea
                        id={descriptionId}
                        name="description"
                        value={formState.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor={categoryId}>Category:</label>
                    <input
                        type="text"
                        id={categoryId}
                        name="category"
                        value={formState.category}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor={priceId}>Price ($):</label>
                    <input
                        type="number"
                        id={priceId}
                        name="price"
                        value={formState.price}
                        onChange={handleInputChange}
                        min="0"
                        step="0.01"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor={stockId}>Stock:</label>
                    <input
                        type="number"
                        id={stockId}
                        name="stock"
                        value={formState.stock}
                        onChange={handleInputChange}
                        min="0"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor={imageId}>Image URL:</label>
                    <input
                        type="url"
                        id={imageId}
                        name="image"
                        value={formState.image || ''}
                        onChange={handleInputChange}
                        placeholder="https://example.com/image.jpg"
                    />
                </div>

                <div className="form-actions">
                    <button
                        type="button"
                        className="btn btn-outline"
                        onClick={() => navigate('/')}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : isEditMode ? 'Update Product' : 'Add Product'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ProductForm