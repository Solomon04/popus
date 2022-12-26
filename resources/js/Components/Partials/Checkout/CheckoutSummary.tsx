import CartContext from '@/Context/CartContext'
import { ShippingRate } from '@/types'
import _ from 'lodash'

import { FunctionComponent, useContext, useMemo } from 'react'
import CountUp from 'react-countup'

type Props = {
  items: App.Models.CartItem[]
  rate: ShippingRate | undefined
}

const CheckoutSummary: FunctionComponent<Props> = ({ items, rate }) => {
  const [subtotal, shipping, taxes, total] = useMemo(() => {
    let subtotal = _.sumBy(items, (item) => {
      if (!item.product) {
        return 0
      }

      return item.product.price * item.quantity
    })

    let shipping = rate ? Number(rate.amount) : null
    let taxes = shipping ? Number(subtotal * 0.0725) : null
    let total = shipping && taxes ? Number(shipping + taxes + subtotal) : null

    return [subtotal, shipping, taxes, total]
  }, [items, rate])
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
                  {items.map((item, index) => (
                    <li key={item.id} className='flex py-6 px-4'>
                      <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-slate-100 border border-slate-100'>
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
                          <p className='mt-1 text-xs text-gray-500'>
                            {item.product?.title}
                          </p>
                        </div>
                        <div className='flex flex-1 items-end justify-between text-xs'>
                          <p className='text-gray-900'>Qty {item.quantity}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <dl className='space-y-3 border-t border-gray-200 py-6 px-4 sm:px-6'>
                  <div className='flex items-center justify-between'>
                    <dt className='text-sm'>Subtotal</dt>
                    <dd className='text-sm font-medium text-gray-900'>
                      ${subtotal.toFixed(2)}
                    </dd>
                  </div>
                  <div className='flex items-center justify-between'>
                    <dt className='text-sm'>Shipping</dt>
                    <dd className='text-sm font-medium text-gray-900'>
                      {shipping ? (
                        <CountUp
                          start={0}
                          end={shipping}
                          duration={0.5}
                          decimals={2}
                          decimal='.'
                          prefix='$'
                        />
                      ) : (
                        'TBD'
                      )}
                    </dd>
                  </div>
                  <div className='flex items-center justify-between'>
                    <dt className='text-sm'>Taxes</dt>
                    <dd className='text-sm font-medium text-gray-900'>
                      {taxes ? `$${taxes.toFixed(2)}` : 'TBD'}
                    </dd>
                  </div>
                  <div className='flex items-center justify-between border-t border-gray-200 pt-6'>
                    <dt className='text-base font-medium'>Total</dt>
                    <dd className='text-base font-medium text-gray-900'>
                      {total ? (
                        <CountUp
                          start={subtotal}
                          end={total}
                          duration={0.5}
                          decimals={2}
                          decimal='.'
                          prefix='$'
                        />
                      ) : (
                        'TBD'
                      )}
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
