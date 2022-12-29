import { InertiaProps } from '@/types'
import {
  CalendarDaysIcon,
  CalendarIcon,
  ClockIcon,
  CurrencyDollarIcon,
  ReceiptPercentIcon,
  TrophyIcon,
} from '@heroicons/react/24/solid'
import { Link, usePage } from '@inertiajs/inertia-react'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'

import { FunctionComponent, useState } from 'react'

import AppLayout from '@/Layouts/AppLayout'

dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)

type Props = {
  stores: App.Models.Store[]
}

type BadgeProps = {
  fundraiser: App.Models.Fundraiser
}

const StoreDashboard: FunctionComponent<Props> = ({ stores }) => {
  const [loading, setLoading] = useState(false)
  const { auth } = usePage().props as unknown as InertiaProps

  const Badge: FunctionComponent<BadgeProps> = ({ fundraiser }) => {
    // future
    if (
      dayjs(fundraiser.start_date).isAfter(dayjs()) &&
      dayjs(fundraiser.end_date).isAfter(dayjs())
    ) {
      return (
        <p className='absolute top-0 bg-emerald-300 text-gray-800 font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg'>
          Starts in {dayjs(fundraiser.start_date).toNow(true)}
        </p>
      )
    }

    // in progress
    if (
      dayjs(fundraiser.start_date).isBefore(dayjs()) &&
      dayjs(fundraiser.end_date).isAfter(dayjs())
    ) {
      return (
        <p className='absolute top-0 bg-yellow-300 text-gray-800 font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg'>
          Ends in {dayjs(fundraiser.end_date).toNow(true)}
        </p>
      )
    }

    return (
      <p className='absolute top-0 bg-red-300 text-gray-800 font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg'>
        Ended {dayjs(fundraiser.end_date).toNow(true)} ago
      </p>
    )
  }

  // place out of leaderboard / total orders / dates / fundraiser
  return (
    <AppLayout loading={loading} enableFooter={false}>
      <div className='max-w-6xl mx-auto py-16 px-4'>
        <div className='min-w-0 flex-1'>
          <h2 className='text-4xl font-medium leading-10 mb-10 pb-5 border-b border-gray-100'>
            My Stores
          </h2>
        </div>
        <div className='md:px-4 md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 space-y-4 md:space-y-0'>
          {stores.map((store) => (
            <a onClick={() => console.log('foo')} type='button'>
              <div className='max-w-sm bg-white px-6 pt-6 pb-2 rounded-xl shadow-lg transform hover:scale-105 transition duration-500'>
                <div className='relative'>
                  <img
                    className='w-full rounded-xl'
                    src={store.avatar}
                    alt={store.user?.first_name}
                  />
                  {store.fundraiser && <Badge fundraiser={store.fundraiser} />}
                </div>
                <h1 className='mt-4 text-gray-800 text-2xl font-bold cursor-pointer'>
                  {store.fundraiser?.name}
                </h1>
                <div className='my-4'>
                  <div className='flex space-x-1 items-center my-2'>
                    <span>
                      <CalendarDaysIcon className='h-6 w-6 text-sky-600' />
                    </span>
                    <p>
                      {' '}
                      {dayjs(store.fundraiser?.start_date).format('L')} -{' '}
                      {dayjs(store.fundraiser?.end_date).format('L')}
                    </p>
                  </div>
                  <div className='flex space-x-1 items-center my-2'>
                    <span>
                      <ReceiptPercentIcon className='h-6 w-6 text-sky-600' />
                    </span>
                    <p>{store.orders_count} orders</p>
                  </div>
                  <div className='flex space-x-1 items-center my-2'>
                    <span>
                      <CurrencyDollarIcon className='h-6 w-6 text-sky-600' />
                    </span>
                    <p>
                      ${store.progress.current.toFixed(2)} of $
                      {store.fundraiser?.goal_amount.toFixed(2)} raised
                    </p>
                  </div>
                  <div className='flex space-x-1 items-center my-2'>
                    <div className='w-full rounded-full bg-gray-200'>
                      <div
                        className='rounded-l-full bg-green-600 p-0.5 text-center text-xs font-medium leading-none text-green-100'
                        style={{
                          width: `${
                            (store.progress.current /
                              store.progress.goal_amount) *
                            100
                          }%`,
                        }}>
                        ${parseInt(store.progress.current)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}

export default StoreDashboard
