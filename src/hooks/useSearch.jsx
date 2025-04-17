// src/hooks/useSearch.js
import { useState, useEffect, useContext } from 'react'
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

        setIsSearching(true)

        // Simulate search delay
        const timer = setTimeout(() => {
            const filtered = products.filter(product =>
                product.name.toLowerCase().includes(query.toLowerCase()) ||
                product.description.toLowerCase().includes(query.toLowerCase()) ||
                product.category.toLowerCase().includes(query.toLowerCase())
            )
            setResults(filtered)
            setIsSearching(false)
        }, 300)

        return () => clearTimeout(timer)
    }, [query, products])

    // Handle input change
    const handleSearchChange = (e) => {
        setQuery(e.target.value)
    }

    // Clear search
    const clearSearch = () => {
        setQuery('')
        setResults([])
    }

    return {
        query,
        results,
        isSearching,
        handleSearchChange,
        clearSearch
    }
}

export default useSearch