import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import { FunctionComponent } from 'react'
import CountUp from 'react-countup'

dayjs.extend(relativeTime)

type Props = {
  store: App.Models.Store
}

const Jumbotron: FunctionComponent<Props> = ({ store }) => {
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
        <h3 className='text-gray-600 md:text-xl'>{store.fundraiser?.name}</h3>
        <h1 className='mb-3 text-3xl font-semibold text-gray-900 md:mb-8 md:text-4xl lg:text-5xl'>
          {store.user?.first_name}'s Pop-Up Store
        </h1>
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
