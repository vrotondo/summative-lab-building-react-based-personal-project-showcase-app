// src/hooks/useSearch.js
import { useState, useEffect, useContext, useCallback } from 'react'
import { ProductContext } from '../context/ProductContext'

/**
 * Custom hook for searching products
 * @param {string} initialQuery - Initial search query
 * @returns {Object} - Search state and handlers
 */
const useSearch = (initialQuery = '') => {
    const [query, setQuery] = useState(initialQuery)
    const [results, setResults] = useState([])
    const [isSearching, setIsSearching] = useState(false)
    const { products } = useContext(ProductContext)

    // Handle search logic
    useEffect(() => {
        if (!query.trim()) {
            setResults([])
            setIsSearching(false)
            return
        }

        // Don't search if products aren't loaded yet
        if (!products || products.length === 0) {
            return
        }

        setIsSearching(true)

        // Simulate search delay to avoid too many updates during typing
        const timer = setTimeout(() => {
            const searchTerm = query.toLowerCase().trim()

            const filtered = products.filter(product =>
                (product.name && product.name.toLowerCase().includes(searchTerm)) ||
                (product.description && product.description.toLowerCase().includes(searchTerm)) ||
                (product.category && product.category.toLowerCase().includes(searchTerm))
            )

            setResults(filtered)
            setIsSearching(false)
        }, 300)

        return () => clearTimeout(timer)
    }, [query, products])

    // Handle input change
    const handleSearchChange = useCallback((e) => {
        setQuery(e.target.value)
    }, [])

    // Clear search
    const clearSearch = useCallback(() => {
        setQuery('')
        setResults([])
    }, [])

    return {
        query,
        results,
        isSearching,
        handleSearchChange,
        clearSearch,
        setQuery // Expose setQuery for direct updates
    }
}

export default useSearch