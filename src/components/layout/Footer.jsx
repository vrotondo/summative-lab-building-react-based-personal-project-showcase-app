import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { ProductContext } from '../../context/ProductContext'

const Footer = () => {
    const { storeInfo } = useContext(ProductContext)
    const [year] = useState(new Date().getFullYear())

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3 className="footer-heading">Tech Gadgets Hub</h3>
                        <p className="footer-description">
                            {storeInfo?.description || 'Your one-stop shop for all the latest tech gadgets and accessories'}
                        </p>
                    </div>

                    <div className="footer-section">
                        <h3 className="footer-heading">Quick Links</h3>
                        <ul className="footer-links">
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/products/new">Add Product</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h3 className="footer-heading">Contact</h3>
                        <address className="footer-contact">
                            {storeInfo?.phone_number && (
                                <p>
                                    <span className="contact-label">Phone:</span>{' '}
                                    <a href={`tel:${storeInfo.phone_number}`}>{storeInfo.phone_number}</a>
                                </p>
                            )}
                            {storeInfo?.email && (
                                <p>
                                    <span className="contact-label">Email:</span>{' '}
                                    <a href={`mailto:${storeInfo.email}`}>{storeInfo.email}</a>
                                </p>
                            )}
                        </address>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="copyright">
                        &copy; {year} Tech Gadgets Hub. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer