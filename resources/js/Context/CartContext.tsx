import {createContext} from "react";

export type CartContextProps = {
    items?: any[]
    remove?: (id: string) => void
    add?: (product: any) => void
}

const cartContextProps: CartContextProps = {}

const CartContext = createContext(cartContextProps);

export default CartContext;
