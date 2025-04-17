import { useState, useEffect, useContext, useId } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ProductContext } from '../context/ProductContext'
import LoadingSpinner from '../components/common/LoadingSpinner'

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
    const [formState, setFormState] = useState({
        name: '',
        description: '',
        category: '',
        price: '',
        stock: '',
        image: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    // Fetch product data if in edit mode
    useEffect(() => {
        if (isEditMode) {
            const fetchProduct = async () => {
                try {
                    setLoading(true)
                    const response = await fetch(`http://localhost:3000/products/${id}`)
                    if (!response.ok) {
                        throw new Error('Failed to fetch product')
                    }
                    const productData = await response.json()
                    setFormState(productData)
                } catch (err) {
                    setError(err.message)
                    console.error('Error fetching product:', err)
                } finally {
                    setLoading(false)
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
                response = await fetch(`http://localhost:3000/products/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(productData)
                })

                if (!response.ok) {
                    throw new Error('Failed to update product')
                }

                const updatedProduct = await response.json()

                // Update products in context
                setProducts(products.map(product =>
                    product.id === updatedProduct.id ? updatedProduct : product
                ))
            } else {
                // Create new product
                response = await fetch('http://localhost:3000/products', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(productData)
                })

                if (!response.ok) {
                    throw new Error('Failed to create product')
                }

                const newProduct = await response.json()

                // Add new product to context
                setProducts([...products, newProduct])
            }

            // Navigate back to product list
            navigate('/')
        } catch (err) {
            setError(err.message)
            console.error('Error saving product:', err)
        } finally {
            setLoading(false)
        }
    }

    if (loading && isEditMode) {
        return <LoadingSpinner />
    }

    return (
        <div className="product-form-container">
            <h1>{isEditMode ? 'Edit Product' : 'Add New Product'}</h1>

            {error && (
                <div className="error-message">Error: {error}</div>
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
                        value={formState.image}
                        onChange={handleInputChange}
                        placeholder="https://example.com/image.jpg"
                    />
                </div>

                <div className="form-actions">
                    <button
                        type="button"
                        className="btn btn-secondary"
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