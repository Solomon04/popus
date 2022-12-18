import { FunctionComponent } from 'react'

const TestimonialSection: FunctionComponent = () => {
  return (
    <section className='bg-offwhite px-4 pb-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:pb-20'>
      <div className='mx-auto max-w-5xl px-4 py-8'>
        <section className='rounded-lg bg-gray-100 p-8'>
          <div className='grid grid-cols-1 gap-12 sm:grid-cols-3 sm:items-center'>
            <img
              alt='testimonial'
              src='/images/testimonial.webp'
              className='aspect-square w-full rounded-lg object-cover'
            />

            <blockquote className='sm:col-span-2'>
              <p className='text-xl font-medium sm:text-2xl'>
                I was looking for a fun and tasty way to raise money for our
                training program. That's when I discovered Popus. Not only did
                our supporters say the popcorn tasted amazing, but the team at
                Popus was incredibly helpful and supportive throughout the
                entire process. We were able to raise a significant amount of
                funds and I would definitely use Popus again in the future.
              </p>

              <cite className='mt-8 inline-flex items-center not-italic'>
                <span className='hidden h-px w-6 bg-gray-400 sm:inline-block'></span>
                <p className='text-sm uppercase text-gray-500 sm:ml-3'>
                  <strong>Lydell Young</strong>, Practice Perfect Training
                </p>
              </cite>
            </blockquote>
          </div>
        </section>
      </div>
    </section>
  )
}

export default TestimonialSection
