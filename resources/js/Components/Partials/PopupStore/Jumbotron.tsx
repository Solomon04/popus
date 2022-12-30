import { PencilSquareIcon } from '@heroicons/react/24/solid'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import { FunctionComponent } from 'react'
import CountUp from 'react-countup'

dayjs.extend(relativeTime)

type Props = {
  store: App.Models.Store
  canEdit: boolean
}

const Jumbotron: FunctionComponent<Props> = ({ store, canEdit = false }) => {
  return (
    <div className='grid grid-cols-1 rounded-md bg-gray-50 md:grid-cols-3 md:gap-5 md:p-12'>
      <div className='md:order-2'>
        <div className='aspect-w-12 aspect-h-12'>
          <img
            src={store.avatar}
            className='object-cover shadow sm:rounded-md'
            alt={store.user?.first_name}
          />
        </div>
      </div>
      <div className='col-span-2 p-5 md:order-1 md:p-0'>
        <div className='flex items-start justify-between'>
          <div>
            <h3 className='text-gray-600 md:text-xl'>
              {store.fundraiser?.name}
            </h3>
            <h1 className='mb-3 text-3xl font-semibold text-gray-900 md:mb-8 md:text-4xl lg:text-5xl'>
              {store.user?.first_name}'s Pop-Up Store
            </h1>
          </div>

          {canEdit && (
            <button className='flex items-center justify-center bg-gray-900 hover:bg-gray-800 focus:ring-2 ring-gray-500 py-2 px-2 rounded-md text-white'>
              Edit
              <PencilSquareIcon className='ml-1 w-5 h-5' />
            </button>
          )}
        </div>

        <p className='mb-5 leading-relaxed text-gray-900 md:text-xl'>
          {store.description}
        </p>
        <p className='mb-8 leading-relaxed text-gray-900 md:text-xl'>
          50% of each purchase benefits this fundraiser.
        </p>
        <div className='mb-5 w-full rounded-full bg-gray-200'>
          <div
            className='rounded-l-full bg-green-600 p-0.5 text-center text-xs font-medium leading-none text-green-100'
            style={{
              width: `${
                (store.progress.current / store.progress.goal_amount) * 100
              }%`,
            }}>
            ${parseInt(store.progress.current)}
          </div>
        </div>
        <div className='sm:flex items-center justify-between'>
          <h3 className='text-gray-700'>
            <span className='text-2xl font-semibold text-gray-900'>
              <CountUp
                start={0}
                end={store.progress.current}
                duration={0.5}
                decimals={2}
                decimal='.'
                prefix='$'
              />
            </span>{' '}
            sold of ${store.progress.goal_amount} goal
          </h3>
          {/*{store.fundraiser && <Badge fundraiser={store.fundraiser} />}*/}
          {/*<h3 className='text-gray-700 mt-5 sm:mt-0'>*/}
          {/*  ends {dayjs(store.fundraiser?.end_date).fromNow()}*/}
          {/*</h3>*/}
        </div>
      </div>
    </div>
  )
}

export default Jumbotron
