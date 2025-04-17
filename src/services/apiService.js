/**
 * API service utility for fetching data from the backend
 */

const API_URL = 'http://localhost:3000'

/**
 * Make a request to the API
 * @param {string} endpoint - API endpoint
 * @param {object} options - Fetch options
 * @returns {Promise<any>} - Response data
 */
async function apiRequest(endpoint, options = {}) {
    const url = `${API_URL}${endpoint}`

    const defaultHeaders = {
        'Content-Type': 'application/json'
    }

    const config = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers
        }
    }

    try {
        const response = await fetch(url, config)

        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`)
        }

        return await response.json()
    } catch (error) {
        console.error('API request failed:', error)
        throw error
    }
}

// API endpoints
const apiService = {
    // Store info
    getStoreInfo: async () => {
        return apiRequest('/store_info')
    },

    // Products
    getProducts: async () => {
        return apiRequest('/products')
    },

    getProduct: async (id) => {
        return apiRequest(`/products/${id}`)
    },

    createProduct: async (productData) => {
        return apiRequest('/products', {
            method: 'POST',
            body: JSON.stringify(productData)
        })
    },

    updateProduct: async (id, productData) => {
        return apiRequest(`/products/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(productData)
        })
    },

    deleteProduct: async (id) => {
        return apiRequest(`/products/${id}`, {
            method: 'DELETE'
        })
    }
}

export default apiService