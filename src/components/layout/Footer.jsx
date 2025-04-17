import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    const [storeInfo, setStoreInfo] = useState(null)
    const [year] = useState(new Date().getFullYear())

    // Fetch store information
    useEffect(() => {
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