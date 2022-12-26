import { createContext } from 'react'

export type CartContextProps = {
  items?: App.Models.CartItem[]
  remove?: (product: App.Models.Product) => void
  add?: (product: App.Models.Product, quantity: number) => void
  subtotal?: number
}

const cartContextProps: CartContextProps = {}

const CartContext = createContext(cartContextProps)

export default CartContext
