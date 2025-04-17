import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ProductContext } from './context/ProductContext'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import ProductForm from './pages/ProductForm'
import ProductDetail from './pages/ProductDetail'
import NotFound from './pages/NotFound'
import apiService from './services/apiService'
import './App.css'

function App() {
  const [products, setProducts] = useState([])
  const [storeInfo, setStoreInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true)
        // Fetch products and store info concurrently for better performance
        const [productsData, storeInfoData] = await Promise.all([
          apiService.getProducts(),
          apiService.getStoreInfo()
        ])

        setProducts(productsData)
        setStoreInfo(storeInfoData[0]) // Store info is in an array
      } catch (err) {
        setError(err.message)
        console.error('Error fetching initial data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchInitialData()
  }, [])

  return (
    <ProductContext.Provider value={{
      products,
      setProducts,
      storeInfo,
      setStoreInfo,
      loading,
      error
    }}>
      <Router>
        <div className="app-container">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products/new" element={<ProductForm />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/products/:id/edit" element={<ProductForm />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ProductContext.Provider>
  )
}

export default App