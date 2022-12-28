import { Link } from '@inertiajs/inertia-react'
import route from 'ziggy-js'

import { FunctionComponent } from 'react'

import Button from '@/Components/Form/Button'

const CTASection: FunctionComponent = () => {
  return (
    <section>
      <div className='bg-gray-50'>
        <div className='mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-16 lg:px-8'>
          <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
            <span className='block'>Ready to raise funds?</span>
            <span className='text-transparent bg-clip-text leading-12 bg-gradient-to-r from-rose-600 via-orange-400 to-pink-500'>
              Start your fundraiser today.
            </span>
          </h2>
          <div className='mt-8 flex lg:mt-0 lg:flex-shrink-0'>
            <div className='inline-flex rounded-md shadow'>
              <Button
                type='button'
                className='bg-gradient-to-r from-rose-600 via-orange-600 to-pink-500 px-5 py-3'
                processing={false}>
                <Link href={route('create.fundraiser')}>Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTASection
