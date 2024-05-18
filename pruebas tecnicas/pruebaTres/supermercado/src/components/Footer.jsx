import { useCart } from '../hooks/useCart'
import { useFilters } from '../hooks/useFilters'
import './Footer.css'

export function Footer(){

    const {filters} = useFilters()
    const {cart} = useCart()

    return(
        <footer className='footer'>
            {
                JSON.stringify(filters, null, 2)
            }
            {
                // JSON.stringify(cart, null, 2)
            }
            {/* <h4>Prueba técnica</h4>
            <span>@Agus</span>
            <h5>Shooping cart</h5> */}
        </footer>
    )
}