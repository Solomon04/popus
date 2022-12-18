import CartContext, { CartContextProps } from '@/Context/CartContext'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Cookies from 'js-cookie'
import _ from 'lodash'

import { FunctionComponent, PropsWithChildren, useState } from 'react'

import Footer from '@/Components/Footer'
import Navbar from '@/Components/Navbar'

// const stripePromise = loadStripe('pk_test_Jp3kv7BJibBz4ANCtbTISq6q00V7NZXMcQ')

const PopupStoreLayout: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<any[]>([])

  const remove = (priceID: string) => {
    let i = _.reject(cartItems, function (item: any) {
      return item.id === priceID
    })
    setCartItems(i)
    Cookies.set('items', JSON.stringify(i))
  }

  const add = (product: any) => {
    let i = _.union(cartItems, [product])
    setCartItems(i)
    Cookies.set('items', JSON.stringify(i))
  }

  const get = () => {
    return JSON.parse(Cookies.get('items') as string)
  }

  const cartContext: CartContextProps = {
    items: get(),
    add: add,
    remove: remove,
  }

  return (
    <CartContext.Provider value={cartContext}>
      {/*<Elements stripe={stripePromise}>*/}
      <main>
        {/* Nav */}
        <Navbar />
        {/*Body*/}
        {children}
        {/*  Footer*/}
        <Footer />
      </main>
      {/*</Elements>*/}
    </CartContext.Provider>
  )
}

export default PopupStoreLayout
