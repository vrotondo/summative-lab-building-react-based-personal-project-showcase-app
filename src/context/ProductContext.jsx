import { createContext } from 'react'

export const ProductContext = createContext({
    // Product data
    products: [],
    setProducts: () => { },

    // Store information
    storeInfo: null,
    setStoreInfo: () => { },

    // Application state
    loading: true,
    error: null
})