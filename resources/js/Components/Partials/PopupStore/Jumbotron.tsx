import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import { FunctionComponent } from 'react'

dayjs.extend(relativeTime)

type Props = {
  store: App.Models.Store
}

const Jumbotron: FunctionComponent<Props> = ({ store }) => {
  return (
    <div className='grid grid-cols-1 rounded-md bg-gray-50 md:grid-cols-3 md:gap-5 md:p-12'>
      <div className='md:order-2'>
        <img
          src={store.user?.avatar as string}
          className='max-w-96 h-auto rounded-md'
          alt={store.user?.first_name}
        />
      </div>
      <div className='col-span-2 p-5 md:order-1 md:p-0'>
        <h3 className='text-gray-600 md:text-xl'>{store.fundraiser?.name}</h3>
        <h1 className='mb-3 text-3xl font-semibold text-gray-900 md:mb-8 md:text-4xl lg:text-5xl'>
          {store.user?.first_name} {store.user?.last_name}'s Pop-Up Store
        </h1>
        <p className='mb-5 leading-relaxed text-gray-900 md:text-xl'>
          Hey! Its that time of year! Your favorite JM player is asking for your
          support! Our fundraiser this fall is Popus popcorn! Thanks for your
          support!
        </p>
        <p className='mb-8 leading-relaxed text-gray-900 md:text-xl'>
          50% of each purchase benefits this fundraiser.
        </p>
        <div className='mb-5 w-full rounded-full bg-gray-200'>
          <div
            className='rounded-l-full bg-green-600 p-0.5 text-center text-xs font-medium leading-none text-green-100'
            style={{
              width: `${(store.progress.current / store.progress.goal) * 100}%`,
            }}>
            ${parseInt(store.progress.current)}
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <h3 className='text-gray-700'>
            <span className='text-2xl font-semibold text-gray-900'>
              ${parseInt(store.progress.current)}
            </span>{' '}
            sold of ${store.progress.goal} goal
          </h3>
          <h3 className='text-gray-700'>
            ends {dayjs(store.fundraiser?.end_date).fromNow()}
          </h3>
        </div>
      </div>
    </div>
  )
}

export default Jumbotron
