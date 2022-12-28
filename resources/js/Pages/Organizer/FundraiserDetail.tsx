import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { Link } from '@inertiajs/inertia-react'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import route from 'ziggy-js'

import { FunctionComponent, useMemo } from 'react'
import CountUp from 'react-countup'

import Navbar from '@/Components/Navbar'

import AppLayout from '@/Layouts/AppLayout'

dayjs.extend(localizedFormat)
dayjs.extend(relativeTime)

type Props = {
  fundraiser: App.Models.Fundraiser
  leaderboard: App.Models.Store[]
  stats: {
    revenue: number
    earnings: number
    total_orders: number
  }
}

const FundraiserDetail: FunctionComponent<Props> = ({
  fundraiser,
  leaderboard,
  stats,
}) => {
  const [status] = useMemo(() => {
    if (
      dayjs(fundraiser.start_date).isAfter(dayjs()) &&
      dayjs(fundraiser.end_date).isAfter(dayjs())
    ) {
      return ['Event starts in ' + dayjs(fundraiser.start_date).toNow(true)]
    }

    if (
      dayjs(fundraiser.start_date).isBefore(dayjs()) &&
      dayjs(fundraiser.end_date).isAfter(dayjs())
    ) {
      return ['Event ends in ' + dayjs(fundraiser.end_date).fromNow(true)]
    }

    return ['Event has ended']
  }, [])

  return (
    <AppLayout>
      <div className='bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-200 via-white to-white'>
        <div className='max-w-6xl mx-auto px-6 py-16 sm:px-0'>
          <div>
            <nav aria-label='Back'>
              <Link
                href={route('fundraisers')}
                className='flex items-center text-sm font-medium text-gray-500 hover:text-gray-700'>
                <ChevronLeftIcon
                  className='-ml-1 mr-1 h-5 w-5 flex-shrink-0 text-gray-400'
                  aria-hidden='true'
                />
                Back
              </Link>
            </nav>
          </div>
          <div className='py-16 md:flex md:items-start md:justify-between'>
            <div className='min-w-0 flex-1'>
              <h2 className='text-3xl font-extrabold leading-10'>
                {fundraiser.name}
              </h2>
              <h4 className='text-lg font-medium text-gray-600 mt-2'>
                Organized by {fundraiser.organizer?.full_name}
              </h4>
            </div>
            <div className='mt-4 flex flex-shrink-0 md:mt-0 md:ml-4'>
              <button
                type='button'
                className='inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-lg font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2'>
                Edit
              </button>
              <button
                type='button'
                className='ml-3 inline-flex items-center rounded-md border border-transparent bg-black px-4 py-2 text-lg font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2'>
                Share Event Code: {fundraiser.code.toLocaleUpperCase()}
              </button>
            </div>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-8 items-start mt-5'>
            {/*Event Start / End time */}
            <div className='col-span-1'>
              <h4 className='text-lg font-medium text-gray-600'>
                Event Status
              </h4>
              <h2 className='text-2xl font-bold leading-10 mt-1'>
                {status}
                {/*{dayjs(fundraiser.end_date).fromNow()}*/}
              </h2>
            </div>

            <div className='col-span-1'>
              <dl className='mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3'>
                <div className='overflow-hidden py-2 '>
                  <dt className='truncate text-sm font-medium text-gray-500'>
                    Event Total
                  </dt>
                  <dd className='mt-1 text-3xl font-semibold tracking-tight text-gray-900'>
                    <CountUp
                      start={0}
                      end={stats.revenue}
                      duration={0.5}
                      decimals={2}
                      decimal='.'
                      prefix='$'
                    />
                  </dd>
                </div>

                <div className='overflow-hidden py-2 '>
                  <dt className='truncate text-sm font-medium text-gray-500'>
                    Event Revenue
                  </dt>
                  <dd className='mt-1 text-3xl font-semibold tracking-tight text-gray-900'>
                    <CountUp
                      start={0}
                      end={stats.earnings}
                      duration={0.5}
                      decimals={2}
                      decimal='.'
                      prefix='$'
                    />
                  </dd>
                </div>

                <div className='overflow-hidden py-2 '>
                  <dt className='truncate text-sm font-medium text-gray-500'>
                    Total Orders
                  </dt>
                  <dd className='mt-1 text-3xl font-semibold tracking-tight text-gray-900'>
                    <CountUp
                      start={0}
                      end={stats.total_orders}
                      duration={0.5}
                    />
                  </dd>
                </div>
              </dl>
            </div>

            <div className='col-span-1'>
              <div className='max-w-md'>
                <h2 className='text-2xl font-bold leading-10 mt-1 border-b border-gray-200 pb-2'>
                  Details
                </h2>

                <ul className='mt-8 space-y-8'>
                  <li className='flex items-center justify-between'>
                    <h3 className='text-gray-600 font-medium'>Start Date</h3>
                    <p className='text-gray-900 font-semibold'>
                      {dayjs(fundraiser.start_date).format('LL')}
                    </p>
                  </li>
                  <li className='flex items-center justify-between'>
                    <h3 className='text-gray-600 font-medium'>End Date</h3>
                    <p className='text-gray-900 font-semibold'>
                      {dayjs(fundraiser.end_date).format('LL')}
                    </p>
                  </li>
                  <li className='flex items-center justify-between'>
                    <h3 className='text-gray-600 font-medium'>Category</h3>
                    <p className='text-gray-900 font-semibold'>
                      {fundraiser.activity?.name}
                    </p>
                  </li>
                </ul>
              </div>
            </div>

            <div className='col-span-1'>
              <div className='max-w-md'>
                <h2 className='text-2xl font-bold leading-10 mt-1 border-b border-gray-200 pb-2'>
                  Leaderboard
                </h2>

                <ul role='list' className='space-y-1'>
                  {leaderboard.map((store, place) => (
                    <li className='py-4' key={place}>
                      <Link
                        target='_blank'
                        href={route('popup.store', [store.uuid])}
                        className='flex items-center space-x-4'>
                        <h3>{place + 1}</h3>
                        <div className='flex-shrink-0'>
                          <img
                            className='h-8 w-8 rounded-full'
                            src={store.user?.avatar as string}
                            alt={store.user?.full_name}
                          />
                        </div>
                        <div className='min-w-0 flex-1'>
                          <p className='truncate text-lg font-medium text-gray-900'>
                            {store.user?.full_name}
                          </p>
                        </div>
                        <div>
                          <h3 className='font-semibold'>
                            <CountUp
                              start={0}
                              end={store.progress.current}
                              duration={0.5}
                              decimals={2}
                              decimal='.'
                              prefix='$'
                            />
                          </h3>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default FundraiserDetail
