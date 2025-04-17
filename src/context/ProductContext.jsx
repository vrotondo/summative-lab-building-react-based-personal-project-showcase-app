import { createContext } from 'react'

export const ProductContext = createContext({
    products: [],
    setProducts: () => { },
    loading: true,
    error: null
})