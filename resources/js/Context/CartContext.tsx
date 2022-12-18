import { createContext } from 'react'

export type CartContextProps = {
  items?: App.Models.Product[]
  remove?: (id: string) => void
  add?: (product: App.Models.Product) => void
}

const cartContextProps: CartContextProps = {}

const CartContext = createContext(cartContextProps)

export default CartContext
