import { supporters } from '@/static-data'
import { InertiaProps } from '@/types'
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid'
import { Inertia } from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-react'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import route from 'ziggy-js'

import { FunctionComponent, useMemo, useState } from 'react'

import Cart from '@/Components/Partials/PopupStore/Cart'
import Jumbotron from '@/Components/Partials/PopupStore/Jumbotron'
import Leaderboard from '@/Components/Partials/PopupStore/Leaderboard'
import ProductList from '@/Components/Partials/PopupStore/ProductList'
import Supporters from '@/Components/Partials/PopupStore/Supporters'

import AppLayout from '@/Layouts/AppLayout'
import PopupStoreLayout from '@/Layouts/PopupStoreLayout'

dayjs.extend(localizedFormat)
type Props = {
  products: App.Models.Product[]
  store: App.Models.Store
  cart: App.Models.Cart
  can_edit: boolean
}

const StoreDetail: FunctionComponent<Props> = ({
  products,
  store,
  cart,
  can_edit,
}) => {
  const [loading, setLoading] = useState(false)
  const { auth } = usePage().props as unknown as InertiaProps

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

  const [canEdit] = useMemo(() => {
    return [auth.user?.id === store.user?.id]
  }, [auth.user])

  const [isBuyable] = useMemo(() => {
    return [cart.items && store.is_active]
  }, [cart.items, store])

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
    <AppLayout loading={loading}>
      <div className='max-w-7xl mx-auto py-4'>
        {!store.is_active && (
          <div className='rounded-md bg-red-50 p-4'>
            <div className='flex'>
              <div className='flex-shrink-0'>
                <ExclamationTriangleIcon
                  className='h-5 w-5 text-red-400'
                  aria-hidden='true'
                />
              </div>
              <div className='ml-3'>
                <div className='text-sm text-red-700'>
                  <p>
                    This store is only available from{' '}
                    <strong>
                      {new Date(
                        store.fundraiser?.start_time_iso8601
                      ).toLocaleDateString()}
                    </strong>{' '}
                    -{' '}
                    <strong>
                      {new Date(
                        store.fundraiser?.end_time_iso8601
                      ).toLocaleDateString()}
                    </strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Profile Jumbotron */}
        <Jumbotron store={store} canEdit={canEdit} />
        <div className='grid grid-cols-1 rounded-md md:grid-cols-3 md:gap-8 md:p-12'>
          {/* Product List */}
          <ProductList
            onAdd={addToCart}
            products={products}
            active={store.is_active}
          />

          <div className='col-span-1 p-5 md:p-0'>
            {/* Leaderboard List + Leaderboard Slideover */}
            {store.leaderboard && (
              <Leaderboard leaderboard={store.leaderboard} />
            )}
            {/* Supporters List + Support Slideover */}
            <Supporters supporters={store.orders ?? []} />
          </div>
        </div>
      </div>
      {cart.items && store.is_active ? (
        <Cart
          onRemove={removeFromCart}
          items={cart.items}
          store_uuid={store.uuid}
        />
      ) : null}
    </AppLayout>
  )
}

export default StoreDetail
