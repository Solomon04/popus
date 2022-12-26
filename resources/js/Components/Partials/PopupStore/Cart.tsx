import CartContext from '@/Context/CartContext'
import { Inertia } from '@inertiajs/inertia'
import { Link } from '@inertiajs/inertia-react'
import _ from 'lodash'
import route from 'ziggy-js'

import {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import Slideover from '@/Components/Slideover'

type Props = {
  items: App.Models.CartItem[]
  onRemove: (product: App.Models.Product) => void
  store_uuid: string
}

const Cart: FunctionComponent<Props> = ({ items, onRemove, store_uuid }) => {
  const [showCartSlideover, setShowCartSlideover] = useState(false)

  const [subtotal] = useMemo(() => {
    let cartTotal = _.sumBy(items, (item) => {
      if (!item.product) {
        return 0
      }

      return item.product.price * item.quantity
    })

    return [Number(cartTotal).toFixed(2)]
  }, [items])

  const closeCartSlideover = () => {
    setShowCartSlideover(false)
  }

  const removeFromCart = (product: App.Models.Product) => {
    onRemove(product)
  }

  return (
    <>
      {items && items.length > 0 ? (
        <>
          <div className='fixed bottom-0 w-full z-10'>
            <div className='flex items-center justify-between max-w-7xl mx-auto py-3 px-3  sm:px-6 lg:px-8 h-16 bg-white shadow-xl'>
              <h3 className='font-semibold hidden sm:block'>
                You're just a few taps from supporting this fundraiser.
              </h3>
              <button
                onClick={() => setShowCartSlideover(true)}
                type='button'
                className='w-full sm:w-1/3 inline-flex items-center justify-center px-3 sm:px-6 py-2 border border-transparent text-lg font-semibold rounded-full shadow-sm text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>
                View Cart ${subtotal}
              </button>
            </div>
          </div>

          <Slideover
            title={'Shopping Cart'}
            open={showCartSlideover}
            setOpen={closeCartSlideover}>
            <h3 className='font-medium text-gray-700 text-lg mb-5'>
              50% of each purchase benefits this fundraiser.
            </h3>
            <div className='mt-8'>
              <div className='flow-root'>
                <ul role='list' className='-my-6 divide-y divide-gray-200'>
                  {items.map((item) => (
                    <li key={item.id} className='flex py-6 px-4'>
                      <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-gray-200 border border-gray-200'>
                        <img
                          src={item.product?.image}
                          alt={item.product?.title}
                          className='h-full w-full object-contain object-center'
                        />
                      </div>

                      <div className='ml-4 flex flex-1 flex-col'>
                        <div>
                          <div className='flex justify-between text-base font-medium text-gray-900'>
                            <h3>
                              <a href='#'>{item.product?.title}</a>
                            </h3>
                            <p className='ml-4'>
                              $
                              {Number(
                                (item.product?.price as number) * item.quantity
                              )}
                            </p>
                          </div>
                          <p className='mt-1 text-sm text-gray-500'>
                            {item.product?.title}
                          </p>
                        </div>
                        <div className='flex flex-1 items-end justify-between text-sm'>
                          <p className='text-gray-500'>Qty {item.quantity}</p>

                          <div className='flex'>
                            <button
                              onClick={() =>
                                removeFromCart(
                                  item.product as App.Models.Product
                                )
                              }
                              type='button'
                              className='font-medium text-gray-900 hover:text-gray-700 focus:outline focus:ring-gray-900'>
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className='border-t border-gray-200 mt-6 py-6 px-4 sm:px-6'>
                <div className='flex justify-between text-base font-medium text-gray-900'>
                  <p>Subtotal</p>
                  <p>${subtotal}</p>
                </div>
                <p className='mt-0.5 text-sm text-gray-500 mb-4'>
                  Shipping and taxes calculated at checkout.
                </p>

                <Link
                  href={route('show.checkout', [store_uuid])}
                  className='w-full flex items-center justify-center rounded-md border border-transparent bg-gray-800 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-900'
                  preserveState>
                  Checkout
                </Link>
              </div>
            </div>
          </Slideover>
        </>
      ) : null}
    </>
  )
}

export default Cart
