import { CalendarIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { ShoppingCartIcon, UserGroupIcon } from '@heroicons/react/24/solid'
import { Link } from '@inertiajs/inertia-react'

import { FunctionComponent } from 'react'

import Navbar from '@/Components/Navbar'

const fundraisers = [
  {
    id: 1,
    title: 'John Marshall Basketball',
    department: 'Engineering',
    closeDate: '2020-01-07',
    closeDateFull: 'January 7, 2020',
    applicants: [
      {
        name: 'Dries Vincent',
        email: 'dries.vincent@example.com',
        imageUrl:
          'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
        name: 'Lindsay Walton',
        email: 'lindsay.walton@example.com',
        imageUrl:
          'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
        name: 'Courtney Henry',
        email: 'courtney.henry@example.com',
        imageUrl:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
        name: 'Tom Cook',
        email: 'tom.cook@example.com',
        imageUrl:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    ],
    total: 2300,
    goal: 4000,
  },
  {
    id: 2,
    title: 'MN Lace Up Basketball',
    department: 'Engineering',
    closeDate: '2020-01-07',
    closeDateFull: 'January 7, 2020',
    applicants: [
      {
        name: 'Whitney Francis',
        email: 'whitney.francis@example.com',
        imageUrl:
          'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
        name: 'Leonard Krasner',
        email: 'leonard.krasner@example.com',
        imageUrl:
          'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
        name: 'Floyd Miles',
        email: 'floy.dmiles@example.com',
        imageUrl:
          'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    ],
    total: 1653,
    goal: 2500,
  },
  {
    id: 3,
    title: 'User Interface Designer',
    department: 'Design',
    closeDate: '2020-01-14',
    closeDateFull: 'January 14, 2020',
    applicants: [
      {
        name: 'Emily Selman',
        email: 'emily.selman@example.com',
        imageUrl:
          'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
        name: 'Kristin Watson',
        email: 'kristin.watson@example.com',
        imageUrl:
          'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
        name: 'Emma Dorsey',
        email: 'emma.dorsey@example.com',
        imageUrl:
          'https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    ],
    total: 1234,
    goal: 3000,
  },
]

const Dashboard: FunctionComponent = () => {
  return (
    <>
      <main className='bg-rose-50 min-h-screen'>
        {/* Nav */}
        <Navbar />
        <div className='max-w-6xl mx-auto py-8'>
          <div className='pt-16 pb-8 md:flex md:items-start md:justify-between border-b border-gray-300'>
            <div className='min-w-0 flex-1'>
              <h2 className='text-4xl font-extrabold leading-10'>
                Hi, D'Angelo!
              </h2>
            </div>
            <div className='mt-4 flex flex-shrink-0 md:mt-0 md:ml-4'>
              <button
                type='button'
                className='ml-3 inline-flex items-center rounded-md border border-transparent bg-black px-4 py-2 text-lg font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2'>
                Organize Event
              </button>
            </div>
          </div>
          <div className='grid lg:grid-cols-3 gap-12 mt-5'>
            {fundraisers.map((fundraiser) => (
              <Link
                href='/fundraiser'
                className='block rounded-lg bg-white shadow-lg shadow-rose-100 transform hover:scale-110 transition ease-in-out delay-150'>
                <img
                  alt='Home'
                  src='/images/popcorn-background.jpg'
                  className='h-56 w-full rounded-t-md object-cover'
                />
                <div className='mt-2 p-2'>
                  <dl>
                    <div>
                      <dt className='sr-only'>Progress</dt>
                      <dd className='text-sm text-gray-500'>
                        Raised <strong>${fundraiser.total}</strong> of{' '}
                        <strong>${fundraiser.goal}</strong>
                      </dd>
                    </div>
                    <div>
                      <dt className='sr-only'>Name</dt>
                      <dd className='font-semibold text-lg'>
                        {fundraiser.title}
                      </dd>
                    </div>
                  </dl>
                  <div className='mt-4 space-y-3 text-sm'>
                    <div className='flex sm:shrink-0 sm:items-center'>
                      <ShoppingCartIcon className='h-4 w-4 text-rose-600' />
                      <div className='mt-1.5 sm:ml-3 sm:mt-0'>
                        <p className='text-gray-500'># of Orders</p>
                        <p className='font-medium'>12 orders</p>
                      </div>
                    </div>
                    <div className='flex sm:shrink-0 sm:items-center'>
                      <UserGroupIcon className='h-4 w-4 text-rose-600' />
                      <div className='mt-1.5 sm:ml-3 sm:mt-0'>
                        <p className='text-gray-500'># of Participants</p>
                        <p className='font-medium'>10 participants</p>
                      </div>
                    </div>
                    <div className='flex sm:shrink-0 sm:items-center'>
                      <UserGroupIcon className='h-4 w-4 text-rose-600' />
                      <div className='mt-1.5 sm:ml-3 sm:mt-0'>
                        <p className='text-gray-500'>End Date</p>
                        <p className='font-medium'>
                          {fundraiser.closeDateFull}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

export default Dashboard
