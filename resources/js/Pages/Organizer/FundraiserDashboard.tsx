import { InertiaProps } from '@/types'
import {
  CalendarIcon,
  ChevronRightIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/20/solid'
import { MapPinIcon } from '@heroicons/react/24/outline'
import {
  ReceiptPercentIcon,
  ShoppingCartIcon,
  UserGroupIcon,
  UsersIcon,
} from '@heroicons/react/24/solid'
import { Link, usePage } from '@inertiajs/inertia-react'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import route from 'ziggy-js'

import { FunctionComponent } from 'react'

import Navbar from '@/Components/Navbar'

import AppLayout from '@/Layouts/AppLayout'

dayjs.extend(localizedFormat)
dayjs.extend(relativeTime)

const transactions = [
  {
    id: 'AAPS0L',
    company: 'Chase & Co.',
    share: 'CAC',
    commission: '+$4.37',
    price: '$3,509.00',
    quantity: '12.00',
    netAmount: '$4,397.00',
  },
  // More transactions...
]

// org name, code, stores,

type Props = {
  fundraisers: App.Models.Fundraiser[]
  can_create_fundraiser: boolean
}

type StatusProps = {
  fundraiser: App.Models.Fundraiser
}

const FundraiserDashboard: FunctionComponent<Props> = ({
  fundraisers,
  can_create_fundraiser,
}) => {
  const { auth } = usePage().props as unknown as InertiaProps
  console.log(fundraisers)

  const StatusBadge: FunctionComponent<StatusProps> = ({ fundraiser }) => {
    // future
    if (
      dayjs(fundraiser.start_date).isAfter(dayjs()) &&
      dayjs(fundraiser.end_date).isAfter(dayjs())
    ) {
      return (
        <span className='inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800'>
          Starts in {dayjs(fundraiser.start_date).toNow(true)}
        </span>
      )
    }

    // in progress
    if (
      dayjs(fundraiser.start_date).isBefore(dayjs()) &&
      dayjs(fundraiser.end_date).isAfter(dayjs())
    ) {
      return (
        <span className='inline-flex items-center rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800'>
          Ends in {dayjs(fundraiser.end_date).toNow(true)}
        </span>
      )
    }

    return (
      <span className='inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800'>
        Ended {dayjs(fundraiser.end_date).toNow(true)}
      </span>
    )
  }
  return (
    <AppLayout enableFooter={false}>
      <div className='max-w-6xl mx-auto py-8 px-4'>
        <div className='pt-16 pb-8 md:flex md:items-start md:justify-between border-b border-gray-300'>
          <div className='min-w-0 flex-1'>
            <h2 className='text-4xl font-medium leading-10'>
              Hi, {auth.user?.first_name}!
            </h2>
          </div>
          <div className='mt-4 flex flex-shrink-0 md:mt-0 md:ml-4'>
            {can_create_fundraiser && (
              <Link
                href={route('create.fundraiser')}
                type='button'
                className='ml-3 inline-flex items-center rounded-md border border-transparent bg-gray-900 px-4 py-2 font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2'>
                Organize Event
              </Link>
            )}
          </div>
        </div>
        <div className='overflow-hidden bg-white shadow sm:rounded-md mt-5'>
          <ul role='list' className='divide-y divide-gray-200'>
            {fundraisers.map((fundraiser) => (
              <li key={fundraiser.uuid}>
                <Link
                  href={route('show.fundraiser', [fundraiser.uuid])}
                  className='block hover:bg-gray-50'>
                  <div className='px-4 py-4 sm:px-6'>
                    <div className='flex items-center justify-between'>
                      <p className='truncate text-sm font-medium text-sky-600'>
                        {fundraiser.name}
                      </p>
                      <div className='ml-2 flex flex-shrink-0'>
                        <StatusBadge fundraiser={fundraiser} />
                      </div>
                    </div>
                    <div className='mt-2 sm:flex sm:justify-between'>
                      <div className='sm:flex'>
                        <p className='flex items-center text-sm text-gray-500'>
                          <ShoppingCartIcon
                            className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400'
                            aria-hidden='true'
                          />
                          {fundraiser.stores_count} virtual stores
                        </p>
                        <p className='mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6'>
                          <ReceiptPercentIcon
                            className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400'
                            aria-hidden='true'
                          />
                          {fundraiser.total_orders} orders
                        </p>
                        <p className='mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6'>
                          <CurrencyDollarIcon
                            className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400'
                            aria-hidden='true'
                          />
                          Raised{' '}
                          <em className='mx-1 font-semibold'>
                            ${fundraiser.earnings?.toFixed(2)}
                          </em>{' '}
                          of $
                          {fundraiser.goal_amount *
                            fundraiser.participant_count}
                        </p>
                      </div>
                      <div className='mt-2 flex items-center text-sm text-gray-500 sm:mt-0'>
                        <CalendarIcon
                          className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400'
                          aria-hidden='true'
                        />
                        <p>
                          <span>
                            {new Date(
                              fundraiser.start_date
                            ).toLocaleDateString()}{' '}
                            -{' '}
                            {new Date(fundraiser.end_date).toLocaleDateString()}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AppLayout>
  )
}

export default FundraiserDashboard
