import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import ProductCard from '../../components/products/ProductCard'

// Mock product data
const mockProduct = {
    id: 1,
    name: 'Test Product',
    description: 'This is a test product',
    category: 'Test Category',
    price: 99.99,
    stock: 10,
    image: 'https://example.com/test.jpg'
}

// Setup provider wrapper for testing
const renderWithRouter = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route)

    return {
        ...render(ui, { wrapper: BrowserRouter })
    }
}

describe('ProductCard Component', () => {
    it('renders product information correctly', () => {
        renderWithRouter(<ProductCard product={mockProduct} />)

        // Check if product name is displayed
        expect(screen.getByText('Test Product')).toBeInTheDocument()

        // Check if product category is displayed
        expect(screen.getByText('Test Category')).toBeInTheDocument()

        // Check if product price is displayed correctly
        expect(screen.getByText('$99.99')).toBeInTheDocument()

        // Check if stock information is displayed
        expect(screen.getByText('10 in stock')).toBeInTheDocument()

        // Check if actions buttons are present
        expect(screen.getByText('View Details')).toBeInTheDocument()
        expect(screen.getByText('Edit')).toBeInTheDocument()
    })

    it('displays out of stock message when stock is 0', () => {
        const outOfStockProduct = {
            ...mockProduct,
            stock: 0
        }

        renderWithRouter(<ProductCard product={outOfStockProduct} />)

        // Check if out of stock message is displayed
        expect(screen.getByText('Out of stock')).toBeInTheDocument()
    })

    it('renders no image placeholder when image is not provided', () => {
        const productWithoutImage = {
            ...mockProduct,
            image: ''
        }

        renderWithRouter(<ProductCard product={productWithoutImage} />)

        // Check if no image placeholder is displayed
        expect(screen.getByText('No image')).toBeInTheDocument()
    })
})