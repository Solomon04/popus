import CartContext from '@/Context/CartContext'
import _ from 'lodash'

import { FunctionComponent, useContext, useMemo } from 'react'

const CheckoutSummary: FunctionComponent = () => {
  const { items, remove } = useContext(CartContext)

  const subtotal = () => {
    return _.sumBy(items, (i) => {
      return i.price
    })
  }

  const shipping = () => {
    // todo copy DoubleGood shipping structure
    return 5
  }

  const taxes = () => {
    // todo get info from Stripe
    return 5
  }

  const total = () => {
    return subtotal() + shipping() + taxes()
  }

  return (
    <>
      {items && items.length > 0 ? (
        <div className='mt-10 lg:mt-0'>
          <h2 className='text-lg font-medium text-gray-900'>Order Summary</h2>

          <h4 className='sm:text-lg text-gray-900 mt-5'>
            50% of each purchase benefits this fundraiser.
          </h4>

          <div className='mt-4'>
            <h3 className='sr-only'>Items in your cart</h3>
            {items ? (
              <>
                <ul role='list' className='divide-y divide-gray-200'>
                  {items.map((product, index) => (
                    <li key={index} className='flex py-6 px-4'>
                      <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-slate-100 border border-slate-100'>
                        <img
                          src={product.image}
                          alt={product.title}
                          className='h-full w-full object-contain object-center'
                        />
                      </div>

                      <div className='ml-4 flex flex-1 flex-col'>
                        <div>
                          <div className='flex justify-between text-base font-medium text-gray-900'>
                            <h3>
                              <a href='#'>{product.title}</a>
                            </h3>
                            <p className='ml-4'>${product.price}</p>
                          </div>
                          <p className='mt-1 text-xs text-gray-500'>
                            {product.title}
                          </p>
                        </div>
                        <div className='flex flex-1 items-end justify-between text-xs'>
                          <p className='text-gray-900'>Qty 1</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <dl className='space-y-3 border-t border-gray-200 py-6 px-4 sm:px-6'>
                  <div className='flex items-center justify-between'>
                    <dt className='text-sm'>Subtotal</dt>
                    <dd className='text-sm font-medium text-gray-900'>
                      ${subtotal().toFixed(2)}
                    </dd>
                  </div>
                  <div className='flex items-center justify-between'>
                    <dt className='text-sm'>Shipping</dt>
                    <dd className='text-sm font-medium text-gray-900'>
                      ${shipping().toFixed(2)}
                    </dd>
                  </div>
                  <div className='flex items-center justify-between'>
                    <dt className='text-sm'>Taxes</dt>
                    <dd className='text-sm font-medium text-gray-900'>
                      ${taxes().toFixed(2)}
                    </dd>
                  </div>
                  <div className='flex items-center justify-between border-t border-gray-200 pt-6'>
                    <dt className='text-base font-medium'>Total</dt>
                    <dd className='text-base font-medium text-gray-900'>
                      ${total().toFixed(2)}
                    </dd>
                  </div>
                </dl>
              </>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  )
}

export default CheckoutSummary
