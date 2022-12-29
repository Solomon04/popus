import { Dialog, Transition } from '@headlessui/react'
import {
  CalendarIcon,
  QueueListIcon,
  ShoppingCartIcon,
  UserCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { Link } from '@inertiajs/inertia-react'
import route from 'ziggy-js'

import React, { Fragment, FunctionComponent, useState } from 'react'

import ResponsiveNavLink from '@/Components/ResponsiveNavLink'

type Props = {
  user: App.Models.User | null
}

const menu = [
  {
    name: 'User Settings',
  },
]

type MenuProps = {
  user: App.Models.User
}

const Navbar: FunctionComponent<Props> = ({ user }) => {
  const [open, setOpen] = useState(false)

  const Menu: FunctionComponent<MenuProps> = ({ user }) => {
    return (
      <>
        <div className='flex items-center justify-start px-4 sm:px-6 pb-5'>
          <div className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 mr-3'>
            <span className='text-sm font-medium leading-none text-gray-900'>
              {user.first_name.substring(0, 1) + user.last_name.substring(0, 1)}
            </span>
          </div>
          <Dialog.Title className='text-lg font-medium text-gray-900'>
            {user?.full_name}
          </Dialog.Title>
        </div>

        <div className='w-full px-3'>
          <div className='flow-root'>
            <nav
              aria-label='Main Nav'
              className='-my-2 flex flex-col divide-y divide-gray-100'>
              <ul className='space-y-2'>
                <li>
                  <button
                    type='button'
                    onClick={() => console.log('change')}
                    className='w-full flex items-center rounded-lg px-4 py-2 font-medium text-gray-700 bg-gray-50 hover:text-gray-600'>
                    <UserCircleIcon className='w-5 h-5 mr-2' />
                    My Settings
                  </button>
                </li>
                <li>
                  <Link
                    href={route('fundraisers')}
                    className='w-full flex items-center rounded-lg px-4 py-2 font-medium text-gray-700 bg-gray-50 hover:text-gray-600'>
                    <QueueListIcon className='w-5 h-5 mr-2' />
                    My Fundraisers
                  </Link>
                </li>
                <li>
                  <Link
                    href={route('stores')}
                    className='w-full flex items-center rounded-lg px-4 py-2 font-medium text-gray-700 bg-gray-50 hover:text-gray-600'>
                    <ShoppingCartIcon className='w-5 h-5 mr-2' />
                    My Stores
                  </Link>
                </li>
              </ul>
              <div className='py-2 mt-2'>
                <Link
                  method='post'
                  href={route('logout')}
                  as='button'
                  className='block w-full rounded-lg px-4 py-2 text-left text-sm font-medium text-red-500 hover:bg-gray-100 hover:text-red-600'>
                  Log Out
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </>
    )
  }

  return (
    <nav className='bg-white p-2'>
      <div className='max-w-7xl mx-auto flex items-center justify-between '>
        <Link href='/'>
          <img src='/popus-text-logo.png' alt='logo' className='h-auto w-24' />
        </Link>
        {user ? (
          <>
            <button
              onClick={() => setOpen(true)}
              className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-50'>
              <span className='text-sm font-medium leading-none text-gray-900'>
                {user.first_name.substring(0, 1) +
                  user.last_name.substring(0, 1)}
              </span>
            </button>
            <Transition.Root show={open} as={Fragment}>
              <Dialog as='div' className='relative z-10' onClose={setOpen}>
                <Transition.Child
                  as={Fragment}
                  enter='ease-in-out duration-500'
                  enterFrom='opacity-0'
                  enterTo='opacity-100'
                  leave='ease-in-out duration-500'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'>
                  <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
                </Transition.Child>

                <div className='fixed inset-0 overflow-hidden'>
                  <div className='absolute inset-0 overflow-hidden'>
                    <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
                      <Transition.Child
                        as={Fragment}
                        enter='transform transition ease-in-out duration-500 sm:duration-700'
                        enterFrom='translate-x-full'
                        enterTo='translate-x-0'
                        leave='transform transition ease-in-out duration-500 sm:duration-700'
                        leaveFrom='translate-x-0'
                        leaveTo='translate-x-full'>
                        <Dialog.Panel className='pointer-events-auto relative w-screen max-w-md'>
                          <Transition.Child
                            as={Fragment}
                            enter='ease-in-out duration-500'
                            enterFrom='opacity-0'
                            enterTo='opacity-100'
                            leave='ease-in-out duration-500'
                            leaveFrom='opacity-100'
                            leaveTo='opacity-0'>
                            <div className='absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4'>
                              <button
                                type='button'
                                className='rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white'
                                onClick={() => setOpen(false)}>
                                <span className='sr-only'>Close panel</span>
                                <XMarkIcon
                                  className='h-6 w-6'
                                  aria-hidden='true'
                                />
                              </button>
                            </div>
                          </Transition.Child>
                          <div className='flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl'>
                            <Menu user={user} />
                          </div>
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </div>
                </div>
              </Dialog>
            </Transition.Root>
          </>
        ) : (
          <Link
            href={route('login')}
            className='text-sm font-medium leading-none text-sky-500'>
            Sign In &rarr;
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar
