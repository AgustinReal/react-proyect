import { products as initialProducts} from './mocks/productos.json'
import { Products } from './components/Products'
import { Header } from './components/Header'
import './App.css'
import { useState } from 'react'
import { Footer } from './components/Footer'
import { IS_DEVOLOPMENT } from './config'
import { useFilters } from './hooks/useFilters.js'
import { Cart } from './components/Cart.jsx'
import { CartPrevider } from './context/cart.jsx'

function App() {
  const [products] = useState(initialProducts)
  const {filterProducts} = useFilters()

  const filteredProducts = filterProducts(products)

  return (
    <CartPrevider>
      <Header/>
      <Cart/>
      <Products products={filteredProducts}/>
      {IS_DEVOLOPMENT && <Footer/>} 
    </CartPrevider>
  )
}

export default App
