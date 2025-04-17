import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { ProductContext } from '../../context/ProductContext';
import useSearch from '../../hooks/useSearch';

// Mock product data
const mockProducts = [
    {
        id: 1,
        name: 'Smart Watch',
        description: 'A smart watch with fitness tracking',
        category: 'Wearables',
        price: 199.99,
        stock: 10
    },
    {
        id: 2,
        name: 'Wireless Headphones',
        description: 'Premium sound quality',
        category: 'Audio',
        price: 149.99,
        stock: 15
    },
    {
        id: 3,
        name: 'Bluetooth Speaker',
        description: 'Portable bluetooth speaker with deep bass',
        category: 'Audio',
        price: 79.99,
        stock: 20
    }
]

// Mock event object
const mockEvent = (value) => ({
    target: { value }
})

// Setup wrapper for testing with context
const wrapper = ({ children }) => (
    <ProductContext.Provider value={{ products: mockProducts }}>
        {children}
    </ProductContext.Provider>
)

describe('useSearch Custom Hook', () => {
    beforeEach(() => {
        vi.useFakeTimers()
    })

    it('initializes with empty results and provided initial query', () => {
        const { result } = renderHook(() => useSearch('initial'), { wrapper })

        expect(result.current.query).toBe('initial')
        expect(result.current.results).toEqual([])
        expect(result.current.isSearching).toBe(false)
    })

    it('updates query when handleSearchChange is called', () => {
        const { result } = renderHook(() => useSearch(), { wrapper })

        act(() => {
            result.current.handleSearchChange(mockEvent('watch'))
        })

        expect(result.current.query).toBe('watch')
        expect(result.current.isSearching).toBe(true)
    })

    it('filters products based on search query after delay', async () => {
        const { result } = renderHook(() => useSearch(), { wrapper })

        act(() => {
            result.current.handleSearchChange(mockEvent('smart'))
        })

        expect(result.current.isSearching).toBe(true)

        // Fast-forward timer to complete search delay
        act(() => {
            vi.runAllTimers()
        })

        await waitFor(() => {
            expect(result.current.isSearching).toBe(false)
            expect(result.current.results).toHaveLength(1)
            expect(result.current.results[0].id).toBe(1) // Smart Watch
        })
    })

    it('matches products by name, description, or category', async () => {
        const { result } = renderHook(() => useSearch(), { wrapper })

        // Search in category
        act(() => {
            result.current.handleSearchChange(mockEvent('audio'))
        })

        act(() => {
            vi.runAllTimers()
        })

        await waitFor(() => {
            expect(result.current.results).toHaveLength(2) // Both Audio category products
        })

        // Search in description
        act(() => {
            result.current.handleSearchChange(mockEvent('bass'))
        })

        act(() => {
            vi.runAllTimers()
        })

        await waitFor(() => {
            expect(result.current.results).toHaveLength(1) // Only the bluetooth speaker
            expect(result.current.results[0].id).toBe(3)
        })
    })

    it('clears search results when clearSearch is called', () => {
        const { result } = renderHook(() => useSearch('audio'), { wrapper })

        // Fast-forward timer to complete initial search
        act(() => {
            vi.runAllTimers()
        })

        act(() => {
            result.current.clearSearch()
        })

        expect(result.current.query).toBe('')
        expect(result.current.results).toEqual([])
    })

    it('returns empty results for empty query', async () => {
        const { result } = renderHook(() => useSearch('audio'), { wrapper })

        // Fast-forward timer to complete initial search
        act(() => {
            vi.runAllTimers()
        })

        // Set empty query
        act(() => {
            result.current.handleSearchChange(mockEvent(''))
        })

        expect(result.current.query).toBe('')
        expect(result.current.results).toEqual([])
    })
})