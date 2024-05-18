import { useContext } from "react";
import { CartContext } from "../context/cart";

export const useCart = () =>{
    const context = useContext(CartContext)

    if(context === undefined){
        throw new Error('Esa parte de tu app, no esta envuelta en el provider.')
    }

    return context;
}