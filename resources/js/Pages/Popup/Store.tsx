import { supporters } from '@/static-data'
import { Inertia } from '@inertiajs/inertia'
import route from 'ziggy-js'

import { FunctionComponent, useState } from 'react'

import Cart from '@/Components/Partials/PopupStore/Cart'
import Jumbotron from '@/Components/Partials/PopupStore/Jumbotron'
import Leaderboard from '@/Components/Partials/PopupStore/Leaderboard'
import ProductList from '@/Components/Partials/PopupStore/ProductList'
import Supporters from '@/Components/Partials/PopupStore/Supporters'

import PopupStoreLayout from '@/Layouts/PopupStoreLayout'

type Props = {
  products: App.Models.Product[]
  store: App.Models.Store
  cart: App.Models.Cart
}

const Store: FunctionComponent<Props> = ({ products, store, cart }) => {
  const [loading, setLoading] = useState(false)
  const addToCart = (product: App.Models.Product, quantity: number) => {
    Inertia.post(
      route('add.to.cart', [store.uuid]),
      {
        product_id: product.id,
        quantity: quantity,
      },
      {
        only: ['cart'],
        onBefore: () => setLoading(true),
        onFinish: () => setLoading(false),
      }
    )
  }

  const removeFromCart = (product: App.Models.Product) => {
    Inertia.patch(
      route('remove.from.cart', [store.uuid]),
      {
        product_id: product.id,
      },
      {
        only: ['cart'],
        onBefore: () => setLoading(true),
        onFinish: () => setLoading(false),
      }
    )
  }

  return (
    <PopupStoreLayout store={store} loading={loading}>
      <div className='max-w-7xl mx-auto py-4'>
        {/* Profile Jumbotron */}
        <Jumbotron store={store} />
        <div className='grid grid-cols-1 rounded-md md:grid-cols-3 md:gap-8 md:p-12'>
          {/* Product List */}
          <ProductList onAdd={addToCart} products={products} />

          <div className='col-span-1 p-5 md:p-0'>
            {/* Leaderboard List + Leaderboard Slideover */}
            {store.leaderboard && (
              <Leaderboard leaderboard={store.leaderboard} />
            )}
            {/* Supporters List + Support Slideover */}
            <Supporters supporters={supporters} />
          </div>
        </div>
      </div>
      {cart.items && (
        <Cart
          onRemove={removeFromCart}
          items={cart.items}
          store_uuid={store.uuid}
        />
      )}
    </PopupStoreLayout>
  )
}

export default Store
