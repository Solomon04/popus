import { Link } from '@inertiajs/inertia-react'

import { FunctionComponent } from 'react'

const Navbar: FunctionComponent = () => {
  return (
    <nav className='bg-white p-2'>
      <div className='max-w-7xl mx-auto flex items-center justify-between '>
        <Link href='/'>
          <img
            src='/images/popus-dark.jpg'
            alt='logo'
            className='h-auto w-24'
          />
        </Link>
        <Link
          href='/'
          className='inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-800'>
          <span className='text-sm font-medium leading-none text-white'>
            DT
          </span>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
