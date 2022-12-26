import CartContext from '@/Context/CartContext'
import { formatPhoneNumber } from '@/utils'
import _ from 'lodash'

import { FunctionComponent, useContext } from 'react'

type Props = {
  order: App.Models.Order
}

const OrderSummary: FunctionComponent<Props> = ({ order }) => {
  return (
    <>
      <div className='w-full p-5 rounded bg-slate-100 shadow-sm'>
        <div>
          <h2 className='font-medium text-xl md:text-3xl leading-10'>
            Order Summary
          </h2>

          <div className='mt-4'>
            <h3 className='sr-only'>Items in your cart</h3>
            {order.cart?.items && (
              <>
                <ul role='list' className='divide-y divide-slate-200'>
                  {order.cart?.items.map((item) => (
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
                        </div>
                        <div className='flex flex-1 items-end justify-between text-sm'>
                          <p className='text-gray-500'>Qty {item.quantity}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <dl className='space-y-1.5 border-t border-slate-200 py-6'>
                  <div className='flex items-center justify-between px-2'>
                    <dt className='text-sm'>Subtotal</dt>
                    <dd className='text-sm font-medium text-gray-900'>
                      ${order.sub_total.toFixed(2)}
                    </dd>
                  </div>
                  <div className='flex items-center justify-between px-2'>
                    <dt className='text-sm'>Shipping</dt>
                    <dd className='text-sm font-medium text-gray-900'>
                      ${order.shipping_total.toFixed(2)}
                    </dd>
                  </div>
                  <div className='flex items-center justify-between px-2'>
                    <dt className='text-sm'>Taxes</dt>
                    <dd className='text-sm font-medium text-gray-900'>
                      ${order.tax_total.toFixed(2)}
                    </dd>
                  </div>
                  <div className='flex items-center justify-between border-t border-slate-200 pt-6 px-2'>
                    <dt className='text-base font-medium'>Total</dt>
                    <dd className='text-base font-medium text-gray-900'>
                      ${order.total.toFixed(2)}
                    </dd>
                  </div>
                </dl>
              </>
            )}
          </div>
        </div>

        <div className='mt-5'>
          <h2 className='font-bold text-xl md:text-3xl leading-10'>
            Customer Information
          </h2>

          <div className='space-y-1 mt-6'>
            <h3 className='mb-1 font-semibold text-lg text-gray-700'>
              Contact Information
            </h3>
            <p className='font-medium text-gray-600 text-sm'>
              {order.customer?.name}
            </p>
            <p className='font-medium text-gray-600 text-sm'>
              {order.customer?.email}
            </p>
            <p className='font-medium text-gray-600 text-sm'>
              {formatPhoneNumber(order.customer?.phone as string)}
            </p>
          </div>

          <div className='space-y-1 mt-6'>
            <h3 className='mb-1 font-semibold text-lg text-gray-700'>
              Shipping Address
            </h3>
            <p className='font-medium text-gray-600 text-sm'>
              {order?.customer?.name}
            </p>
            <p className='font-medium text-gray-600 text-sm'>
              {order.cart?.address?.address} {order.cart?.address?.unit}
            </p>
            <p className='font-medium text-gray-600 text-sm'>
              {order.cart?.address?.city}, {order.cart?.address?.state}{' '}
              {order.cart?.address?.postal}
            </p>
          </div>

          <div className='space-y-1 mt-6'>
            <h3 className='mb-1 font-semibold text-lg text-gray-700'>
              Payment Method
            </h3>
            <p className='font-medium text-gray-600 text-sm capitalize'>
              {order.cart?.payment_method?.brand} ending in{' '}
              {order.cart?.payment_method?.last4}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default OrderSummary
