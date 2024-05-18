import { useId } from 'react'
import {CartIcon, RemoveFromCartIcon, ClearCartIcon} from './Icons'
import './Cart.css'
import { useCart } from '../hooks/useCart'

export function CartItem({price, title, quantity, thumbnail, addToCart})
{
    return(
        <li>
        <img
        src={thumbnail} 
        alt={title} 
        />

        <div>
            <strong>{title}</strong> - ${price}
        </div>

        <footer>
            <small>
                Cant: {quantity}
            </small>
            <button onClick={addToCart}>+</button>
        </footer>
    </li>
    )
}

export function Cart(){
    const cartCheckboxId = useId()
    const {cart, addToCart, clearToCart}= useCart()

    return(
        <>
            <label htmlFor={cartCheckboxId} className='cart-button'>
                <CartIcon/>
            </label>
            <input type="checkbox" id={cartCheckboxId} hidden/>

            <aside className='cart'>
                <ul>
                   {cart.map(product => (
                    <CartItem 
                        key={product.id} 
                        addToCart={() => addToCart(product)}
                        {...product}
                    />
                   ))}
                </ul>

                <button onClick={clearToCart}>
                    <ClearCartIcon/>
                </button>
            </aside>
        </>
    )
}