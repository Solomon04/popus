import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { Link } from '@inertiajs/inertia-react'
import route from 'ziggy-js'

import { FunctionComponent } from 'react'

import Button from '@/Components/Form/Button'

const HeroSection: FunctionComponent = () => {
  return (
    <section className='px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20'>
      <div className='flex flex-col items-center justify-between w-full mb-10 lg:flex-row'>
        <div className='mb-16 lg:mb-0 lg:max-w-lg lg:pr-5'>
          <div className='max-w-xl mb-6'>
            <div>
              <p className='inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider uppercase bg-rose-100 text-rose-600 rounded-full'>
                Virtual Fundraising
              </p>
            </div>
            <h2 className='font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none max-w-lg mb-6'>
              A delicious way to
              <br className='hidden md:block' />
              <span className='block w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-rose-600 via-orange-400 to-pink-500 lg:inline'>
                fundraise
              </span>
            </h2>
            <p className='text-gray-700 text-base md:text-lg'>
              <strong>Popus Gives</strong> is a tasty way to raise funds for
              your cause by selling popcorn through your very own virtual store.
            </p>
          </div>
          <div className='flex items-center space-x-3'>
            <Button
              type='button'
              className='bg-gradient-to-r from-rose-600 via-orange-600 to-pink-500'
              processing={false}>
              <Link href={route('get.started')}>Get Started</Link>
            </Button>
            <Button
              type='button'
              className='text-white border-gray-700 border-2'
              processing={false}>
              <a href='#explainer'>Learn More</a>
            </Button>
          </div>
        </div>
        <div className='flex items-center justify-center lg:w-2/3'>
          <div className='w-full'>
            <img
              className='object-cover'
              src='/images/macbook-popup.png'
              alt=''
            />
          </div>
        </div>
      </div>
      <a
        href='#explainer'
        aria-label='Scroll down'
        className='flex items-center justify-center w-10 h-10 mx-auto text-gray-600 hover:text-deep-purple-accent-400 hover:border-deep-purple-accent-400 duration-300 transform border border-gray-400 rounded-full hover:shadow hover:scale-110'>
        <ChevronDownIcon className='w-4 h-4' />
      </a>
    </section>
  )
}

export default HeroSection
