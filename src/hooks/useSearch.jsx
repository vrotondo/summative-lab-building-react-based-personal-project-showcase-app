// src/hooks/useSearch.jsx
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
    const [isSearching, setIsSearching] = useState(initialQuery ? true : false)
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

        // Cleanup function to clear the timeout if the component unmounts
        // or if the effect runs again before the timeout completes
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
        setIsSearching(false)
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