import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { Link } from '@inertiajs/inertia-react'

import { FunctionComponent } from 'react'

import Navbar from '@/Components/Navbar'

const stats = [
  { name: 'Event Total', stat: '$9,780' },
  { name: 'Event Earnings', stat: '$4,940' },
  { name: '# of Supporters', stat: '132' },
]

const leaderboard = [
  {
    name: 'Matthew Hurt',
    image:
      'https://cdn1.sportngin.com/attachments/photo/ee0f-121282811/Matthew_Hurt_large.JPG',
    total: 1304,
  },
  {
    name: 'Michael Hurt',
    image:
      'https://a.espncdn.com/combiner/i?img=/i/headshots/mens-college-basketball/players/full/4066389.png',
    total: 1210,
  },
  {
    name: 'Dedoch Chan',
    image:
      'https://d1mnbasketball.com/wp-content/uploads/2020/01/Dedoch-Chan-600-x-22-350x263.png',
    total: 1103,
  },
  {
    name: 'Isaiah Walden',
    image: 'https://winonastatewarriors.com/images/2017/9/15/IWalden.jpg',
    total: 1021,
  },
  {
    name: 'Ray Adams',
    image:
      'https://static.hudl.com/users/prod/6894199_450a6a6a0449446491423f5cc0a9862c.jpg',
    total: 1001,
  },
  {
    name: 'DAngelo Tines',
    image:
      'https://www.austindailyherald.com/wp-content/uploads/sites/15/2015/12/1213.AustinBoysBasketball-4.jpg',
    total: 974,
  },
  {
    name: 'Emerson Gonyea',
    image: 'https://pbs.twimg.com/media/CyOVvBVUcAAT5jd?format=jpg&name=large',
    total: 852,
  },
  {
    name: 'Brandon Kriegel',
    image:
      'https://cdn2.sportngin.com/attachments/roster_player_info/3458/7893/JM_BB_2014--028_medium.jpg',
    total: 757,
  },
  {
    name: 'Eric Stai',
    image:
      'https://pbs.twimg.com/profile_images/871589415088525312/gnk4i1rF_400x400.jpg',
    total: 696,
  },
  {
    name: 'Solomon Antoine',
    image:
      'https://static.hudl.com/users/temp/5605422_761e6c1caab64c34898d359493feaf8d.PNG',
    total: 621,
  },
]

const FundraiserDetail: FunctionComponent = () => {
  return (
    <>
      <main className='bg-gray-50'>
        {/* Nav */}
        <Navbar />
        <div className='bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-200 via-white to-white'>
          <div className='max-w-6xl mx-auto px-6 py-16 sm:px-0'>
            <div>
              <nav aria-label='Back'>
                <Link
                  href='/dashboard'
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
                <h2 className='text-4xl font-extrabold leading-10'>
                  John Marshall Basketball
                </h2>
                <h4 className='text-lg font-medium text-gray-600 mt-4'>
                  Organized by D'Angelo Tines
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
                  Share Event Code: JFW EIC
                </button>
              </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-8 items-start mt-5'>
              {/*Event Start / End time */}
              <div className='col-span-1'>
                <h4 className='text-lg font-medium text-gray-600'>
                  Event Ends In
                </h4>
                <h2 className='text-2xl font-bold leading-10 mt-1'>
                  Event has ended
                </h2>
              </div>

              <div className='col-span-1'>
                <dl className='mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3'>
                  {stats.map((item) => (
                    <div key={item.name} className='overflow-hidden py-2 '>
                      <dt className='truncate text-sm font-medium text-gray-500'>
                        {item.name}
                      </dt>
                      <dd className='mt-1 text-3xl font-semibold tracking-tight text-gray-900'>
                        {item.stat}
                      </dd>
                    </div>
                  ))}
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
                        Thursday, October 06, 2022
                      </p>
                    </li>
                    <li className='flex items-center justify-between'>
                      <h3 className='text-gray-600 font-medium'>End Date</h3>
                      <p className='text-gray-900 font-semibold'>
                        Thursday, October 13, 2022
                      </p>
                    </li>
                    <li className='flex items-center justify-between'>
                      <h3 className='text-gray-600 font-medium'>Category</h3>
                      <p className='text-gray-900 font-semibold'>
                        Sports & Athletics
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
                    {leaderboard.map((member, place) => (
                      <li className='py-4' key={place}>
                        <Link
                          href='/foo'
                          className='flex items-center space-x-4'>
                          <h3>{place + 1}</h3>
                          <div className='flex-shrink-0'>
                            <img
                              className='h-8 w-8 rounded-full'
                              src={member.image}
                              alt={member.name}
                            />
                          </div>
                          <div className='min-w-0 flex-1'>
                            <p className='truncate text-lg font-medium text-gray-900'>
                              {member.name}
                            </p>
                          </div>
                          <div>
                            <h3 className='font-semibold'>${member.total}</h3>
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
      </main>
    </>
  )
}

export default FundraiserDetail
