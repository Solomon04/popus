import {
  ArrowTrendingUpIcon,
  CloudIcon,
  CurrencyDollarIcon,
  ShoppingCartIcon,
} from '@heroicons/react/24/outline'

import { FunctionComponent } from 'react'

const FeatureSection: FunctionComponent = () => {
  return (
    <section className='bg-offwhite px-4 pb-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:pb-20'>
      <div className='container px-6 py-10 mx-auto'>
        <h1 className='text-3xl font-semibold text-gray-800 capitalize lg:text-4xl'>
          The right way to <br /> raise funds
        </h1>
        <div className='mt-2'>
          <span className='inline-block w-40 h-1 bg-rose-500 rounded-full' />
          <span className='inline-block w-3 h-1 ml-1 bg-rose-500 rounded-full' />
          <span className='inline-block w-1 h-1 ml-1 bg-rose-500 rounded-full' />
        </div>
        <div className='mt-8 xl:mt-12 lg:flex lg:items-center'>
          <div className='grid w-full grid-cols-1 gap-8 lg:w-1/2 xl:gap-16 md:grid-cols-2'>
            <div className='space-y-3'>
              <span className='inline-block p-3 text-rose-500 bg-rose-100 rounded-xl'>
                <CloudIcon className='w-6 h-6' />
              </span>
              <h1 className='text-2xl font-semibold text-gray-700 capitalize'>
                100% VIRTUAL
              </h1>
              <p className='text-gray-500'>
                Everything is online so you can raise funds from anywhere.
              </p>
            </div>
            <div className='space-y-3'>
              <span className='inline-block p-3 text-rose-500 bg-rose-100 rounded-xl'>
                <ArrowTrendingUpIcon className='w-6 h-6' />
              </span>
              <h1 className='text-2xl font-semibold text-gray-700 capitalize'>
                Profit splitting
              </h1>
              <p className='text-gray-500'>
                You keep 50% of what you sell. No fees and no minimums to meet.
              </p>
            </div>
            <div className='space-y-3'>
              <span className='inline-block p-3 text-rose-500 bg-rose-100 rounded-xl'>
                <CurrencyDollarIcon className='w-6 h-6' />
              </span>
              <h1 className='text-2xl font-semibold text-gray-700 capitalize '>
                Quick Payouts
              </h1>
              <p className='text-gray-500 '>
                Fundraising Events are a week long. So you get your paid faster.
              </p>
            </div>
            <div className='space-y-3'>
              <span className='inline-block p-3 text-rose-500 bg-rose-100 rounded-xl'>
                <ShoppingCartIcon className='w-6 h-6' />
              </span>
              <h1 className='text-2xl font-semibold text-gray-700 capitalize '>
                No popcorn to handle
              </h1>
              <p className='text-gray-500 '>
                We package and ship all orders right to the customers, anywhere
                in the USA.
              </p>
            </div>
          </div>
          <div className='hidden lg:flex lg:w-1/2 lg:justify-center'>
            <img
              className='w-[28rem] h-[28rem] flex-shrink-0 object-cover xl:w-[34rem] xl:h-[34rem] rounded-full'
              src='images/kiana-bosman-example.jpeg'
              alt='Bailey Torres fundraise example'
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeatureSection
