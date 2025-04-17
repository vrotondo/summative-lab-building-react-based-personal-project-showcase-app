import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const ProductCard = ({ product }) => {
    return (
        <div className="product-card">
            <div className="product-card-image">
                {product.image ? (
                    <img src={product.image} alt={product.name} />
                ) : (
                    <div className="no-image">No image</div>
                )}
            </div>

            <div className="product-card-content">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-category">{product.category}</p>
                <p className="product-price">${product.price.toFixed(2)}</p>
                <p className={`product-stock ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </p>
            </div>

            <div className="product-card-actions">
                <Link to={`/products/${product.id}`} className="btn btn-primary">
                    View Details
                </Link>
                <Link to={`/products/${product.id}/edit`} className="btn btn-secondary">
                    Edit
                </Link>
            </div>
        </div>
    )
}

ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        stock: PropTypes.number.isRequired,
        image: PropTypes.string
    }).isRequired
}

export default ProductCard