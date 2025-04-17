import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import SearchBar from '../../components/common/SearchBar'

describe('SearchBar Component', () => {
    it('renders correctly with empty query', () => {
        const handleChangeMock = vi.fn()
        const clearSearchMock = vi.fn()

        render(
            <SearchBar
                query=""
                onChange={handleChangeMock}
                onClear={clearSearchMock}
                placeholder="Search products..."
            />
        )

        // Check if placeholder is displayed
        expect(screen.getByPlaceholderText('Search products...')).toBeInTheDocument()

        // Clear button should not be visible with empty query
        expect(screen.queryByLabelText('Clear search')).not.toBeInTheDocument()
    })

    it('shows clear button when query is not empty', () => {
        const handleChangeMock = vi.fn()
        const clearSearchMock = vi.fn()

        render(
            <SearchBar
                query="test"
                onChange={handleChangeMock}
                onClear={clearSearchMock}
                placeholder="Search products..."
            />
        )

        // Clear button should be visible
        expect(screen.getByLabelText('Clear search')).toBeInTheDocument()
    })

    it('calls onChange when input value changes', () => {
        const handleChangeMock = vi.fn()
        const clearSearchMock = vi.fn()

        render(
            <SearchBar
                query=""
                onChange={handleChangeMock}
                onClear={clearSearchMock}
                placeholder="Search products..."
            />
        )

        // Get the input element
        const input = screen.getByPlaceholderText('Search products...')

        // Simulate typing in the input
        fireEvent.change(input, { target: { value: 'test' } })

        // Check if onChange was called
        expect(handleChangeMock).toHaveBeenCalledTimes(1)
    })

    it('calls onClear when clear button is clicked', () => {
        const handleChangeMock = vi.fn()
        const clearSearchMock = vi.fn()

        render(
            <SearchBar
                query="test"
                onChange={handleChangeMock}
                onClear={clearSearchMock}
                placeholder="Search products..."
            />
        )

        // Get the clear button
        const clearButton = screen.getByLabelText('Clear search')

        // Click the clear button
        fireEvent.click(clearButton)

        // Check if onClear was called
        expect(clearSearchMock).toHaveBeenCalledTimes(1)
    })
})