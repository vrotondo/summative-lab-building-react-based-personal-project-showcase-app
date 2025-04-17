// src/components/common/SearchBar.jsx
import PropTypes from 'prop-types'

const SearchBar = ({ query, onChange, onClear, placeholder }) => {
    return (
        <div className="search-bar">
            <div className="search-input-container">
                <svg
                    className="search-icon"
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
                <input
                    type="text"
                    placeholder={placeholder || "Search..."}
                    value={query}
                    onChange={onChange}
                    className="search-input"
                />
                {query && (
                    <button
                        type="button"
                        className="search-clear-button"
                        onClick={onClear}
                        aria-label="Clear search"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                )}
            </div>
        </div>
    )
}

SearchBar.propTypes = {
    query: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onClear: PropTypes.func.isRequired,
    placeholder: PropTypes.string
}

export default SearchBar