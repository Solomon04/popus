import { CheckCircleIcon } from '@heroicons/react/20/solid'
import dayjs from 'dayjs'

import { FunctionComponent } from 'react'

import OrderSummary from '@/Components/Partials/Summary/OrderSummary'

import AppLayout from '@/Layouts/AppLayout'
import PopupStoreLayout from '@/Layouts/PopupStoreLayout'

type Props = {
  store: App.Models.Store
  order: App.Models.Order
}

const Summary: FunctionComponent<Props> = ({ store, order }) => {
  return (
    <AppLayout>
      <div className='bg-gray-50'>
        <div className='mx-auto max-w-3xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8'>
          <div className='lg:grid lg:grid-cols-5 lg:gap-x-12 xl:gap-x-16'>
            <div className='col-span-3'>
              <div className='mb-3'>
                <h3 className='text-gray-600 font-medium text-sm tracking-tight'>
                  Order Number
                </h3>
                <h2 className='text-gray-600 font-semibold text-lg'>
                  {order.uuid}
                </h2>
              </div>
              <h1 className='font-bold text-3xl md:text-4xl lg:text-5xl leading-10'>
                Thanks for your order!
              </h1>

              {/*Popcorn Tracker Card*/}
              <div className='w-full border rounded border-slate-200 p-5 mt-5'>
                <h1 className='font-bold text-xl md:text-2xl lg:text-3xl leading-10'>
                  Order Tracker
                </h1>

                <div className='lg:py-6 lg:pr-16'>
                  <div className='flex'>
                    <div className='flex flex-col items-center mr-4'>
                      <div>
                        <CheckCircleIcon className='text-emerald-400 h-4 w-4' />
                      </div>
                      <div className='w-px h-full bg-gray-300' />
                    </div>
                    <div className='pt-1 pb-3'>
                      <p className='mb-1 text-lg font-bold'>Order Confirmed</p>
                      <p className='mb-2 text-gray-900 font-medium'>
                        {dayjs(order.created_at).format('L')}
                      </p>
                      <p className='text-gray-700'>
                        We have received your order and will ship soon!
                      </p>
                    </div>
                  </div>
                </div>

                <div className='border-t border-slate-200 px-1 pt-4'>
                  <p className='mb-1 text-gray-600 font-bold'>
                    Tracking Number
                  </p>
                  <p className='mb-2 text-gray-900 font-medium'>
                    {order.cart?.rate?.tracking_number ??
                      'Available once shipped'}
                  </p>
                </div>
              </div>

              {/*Share Popup Store Card*/}
              <div className='w-full border rounded border-slate-200 p-5 mt-5'>
                <h1 className='mb-2 font-bold text-xl md:text-2xl lg:text-3xl leading-10'>
                  Share Popup Store
                </h1>
                <p className='mb-2 text-gray-600 font-medium'>
                  Sharing a popup store on Facebook can help 10x sales.
                </p>
                <button className='inline-block rounded-full bg-gradient-to-r from-pink-400 via-rose-600 to-yellow-400 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75'>
                  <span className='block rounded-full bg-white px-8 py-3 text-sm font-medium hover:bg-transparent'>
                    Share Popup Store
                  </span>
                </button>
              </div>
            </div>

            <div className='col-span-2'>
              <OrderSummary order={order} />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default Summary
