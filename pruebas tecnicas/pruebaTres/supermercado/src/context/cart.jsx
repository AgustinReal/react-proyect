import { createContext, useReducer } from "react";

// 1- Crear el contexto
export const CartContext = createContext()

const cartInitialState = JSON.parse(window.localStorage.getItem('cart')) || []

//actulizar localStorage para el carrito
export const updateLocalStorege = state => {
    window.localStorage.setItem('cart', JSON.stringify(state))
}

//Cuando usamos reducer: se usa cuando tengamos muchos useState()
const reducer = (state, action) => {
    const {type: actionType, payload: actionPayLoad} = action

    switch(actionType)
    {
        case 'ADD_TO_CART': {
            const {id} = actionPayLoad
            const productInCartIndex = state.findIndex(item => item.id === id)

            if(productInCartIndex >= 0)
            {
                const newState = structuredClone(state)
                newState[productInCartIndex].quantity += 1
                updateLocalStorege(newState)
                return newState
            }

            
            const newState = [
                ...state,
                {
                    ...actionPayLoad,
                    quantity: 1
                }
            ]

            updateLocalStorege(newState)
            return newState
        }

        case 'REMOVE_FROM_CART': {
            const {id} = actionPayLoad
            const newState = state.filter(item => item.id !== id)
            updateLocalStorege(newState)
            return newState
        }

        case 'CLEAR_CART': {
            updateLocalStorege([])
            return []
        }
    }

    return state
}

// 2- Crear el provider, para proveer el contexto
export function CartPrevider({ children })
{
    const [state, dispatch] = useReducer(reducer, cartInitialState)

    const addToCart = product => dispatch({
        type: 'ADD_TO_CART',
        payload: product
    })

    const removeToCart = product => dispatch({
        type: 'REMOVE_FROM_CART',
        payload: product
    })

    const clearToCart = () => dispatch({type: 'CLEAR_CART'})

    return(
        <CartContext.Provider value={{
            cart: state,
            addToCart,
            removeToCart,
            clearToCart
        }}>
            {children}
        </CartContext.Provider>
    )
}