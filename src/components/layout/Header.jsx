import { useState, useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import useSearch from '../../hooks/useSearch'
import { ProductContext } from '../../context/ProductContext'
import SearchBar from '../common/SearchBar'

const Header = () => {
    const [isNavOpen, setIsNavOpen] = useState(false)
    const [isSearchVisible, setIsSearchVisible] = useState(false)
    const { query, results, handleSearchChange, clearSearch } = useSearch()
    const { loading } = useContext(ProductContext)

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen)
    }

    const toggleSearch = () => {
        setIsSearchVisible(!isSearchVisible)
        if (isSearchVisible) {
            clearSearch()
        }
    }

    return (
        <header className="header">
            <div className="header-container">
                <div className="logo">
                    <Link to="/">Tech Gadgets Hub</Link>
                </div>

                <div className="header-actions">
                    {/* Search toggle button (mobile) */}
                    <button
                        className="search-toggle"
                        onClick={toggleSearch}
                        aria-label="Toggle search"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </button>

                    {/* Mobile menu toggle */}
                    <button
                        className={`nav-toggle ${isNavOpen ? 'active' : ''}`}
                        onClick={toggleNav}
                        aria-label="Toggle navigation"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>

                {/* Search bar - desktop */}
                <div className="search-container desktop">
                    <SearchBar
                        query={query}
                        onChange={handleSearchChange}
                        onClear={clearSearch}
                        placeholder="Search products..."
                    />

                    {query && results.length > 0 && (
                        <div className="search-results">
                            <ul>
                                {results.slice(0, 5).map(product => (
                                    <li key={product.id}>
                                        <Link
                                            to={`/products/${product.id}`}
                                            onClick={() => {
                                                clearSearch()
                                                setIsSearchVisible(false)
                                            }}
                                        >
                                            {product.name}
                                        </Link>
                                    </li>
                                ))}
                                {results.length > 5 && (
                                    <li className="view-all">
                                        <Link
                                            to="/"
                                            onClick={() => {
                                                setIsSearchVisible(false)
                                            }}
                                        >
                                            View all {results.length} results
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Search bar - mobile */}
                {isSearchVisible && (
                    <div className="search-container mobile">
                        <SearchBar
                            query={query}
                            onChange={handleSearchChange}
                            onClear={() => {
                                clearSearch()
                                setIsSearchVisible(false)
                            }}
                            placeholder="Search products..."
                        />

                        {query && results.length > 0 && (
                            <div className="search-results">
                                <ul>
                                    {results.slice(0, 5).map(product => (
                                        <li key={product.id}>
                                            <Link
                                                to={`/products/${product.id}`}
                                                onClick={() => {
                                                    clearSearch()
                                                    setIsSearchVisible(false)
                                                }}
                                            >
                                                {product.name}
                                            </Link>
                                        </li>
                                    ))}
                                    {results.length > 5 && (
                                        <li className="view-all">
                                            <Link
                                                to="/"
                                                onClick={() => {
                                                    setIsSearchVisible(false)
                                                }}
                                            >
                                                View all {results.length} results
                                            </Link>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        )}
                    </div>
                )}

                {/* Navigation */}
                <nav className={`navigation ${isNavOpen ? 'open' : ''}`}>
                    <ul className="nav-links">
                        <li>
                            <NavLink to="/" onClick={() => setIsNavOpen(false)}>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/products/new" onClick={() => setIsNavOpen(false)}>
                                Add Product
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header