import { FunctionComponent } from 'react'

import AppLayout from '@/Layouts/AppLayout'

const stats = [
  { label: 'Founded', value: '2022' },
  { label: 'Employees', value: '12' },
  { label: 'Beta Users', value: '17' },
  { label: 'Raised', value: '$12K' },
]

const About: FunctionComponent = () => {
  return (
    <AppLayout>
      <div className='relative bg-white py-16 sm:py-24'>
        <div className='lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-2 lg:items-start lg:gap-24 lg:px-8'>
          <div className='relative sm:py-16 lg:py-0'>
            <div className='relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-none lg:px-0 lg:py-20'>
              {/* Testimonial card*/}
              <div className='space-y-4'>
                <img
                  className='object-cover h-full w-full rounded-xl'
                  src='/images/founder.jpeg'
                  alt='founder image'
                />

                <img
                  className='object-cover h-full w-full rounded-xl hidden sm:block'
                  src='/images/store.jpeg'
                  alt='store image'
                />
              </div>
            </div>
          </div>

          <div className='relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0'>
            {/* Content area */}
            <div className='pt-12 sm:pt-16 lg:pt-20'>
              <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                On a mission to make fundraising easier
              </h2>
              <div className='mt-6 space-y-6 text-gray-500'>
                <p className='text-lg'>
                  At Popus Gives, we believe there is a better way to do
                  fundraising. A more organized, less time consuming way which
                  gives our customers more time to focus on their organizations.
                  We are extremely passionate about fundraising, and our mission
                  is to help people achieve their goals. We don’t want
                  organizations missing out on opportunities due to lack of
                  funding. We believe our online fundraising platform can bridge
                  the money gap and create more opportunities.
                </p>
                <p className='text-base leading-7'>
                  Organization leaders are able to sign up for online
                  fundraising at no cost. After signing up they are presented
                  with a dashboard that keeps the fundraiser organized. From
                  that dashboard, the organizer will be able to give a code to
                  each fundraising participant. With that code, the fundraising
                  participant can create their own “Pop-up shop.” Participants
                  can add a photo and put a biography in the pop-up so family
                  and friends know who it is. Each Pop-up shop will have their
                  own link that can be emailed, texted, and also posted on
                  social media. 50% of every purchase made through this link by
                  your family and friends will go directly to your organization.
                  During the fundraiser organizers will have access to the main
                  dashboard to manage the fundraiser. From the dashboard they
                  will be able to keep track of each participant's earnings, and
                  set up their payout information. The online fundraiser lasts 7
                  days.
                </p>
              </div>
            </div>

            {/* Stats section */}
            <div className='mt-10'>
              <dl className='grid grid-cols-2 gap-x-4 gap-y-8'>
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className='border-t-2 border-gray-100 pt-6'>
                    <dt className='text-base font-medium text-gray-500'>
                      {stat.label}
                    </dt>
                    <dd className='text-3xl font-bold tracking-tight text-gray-900'>
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default About
