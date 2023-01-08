import { CheckIcon } from '@heroicons/react/20/solid'

import { FunctionComponent, useState } from 'react'

const PopupExplainerSection: FunctionComponent = () => {
  const [activeSection, setActiveSection] = useState('organizer')

  const OrganizerSection = () => (
    <div className='grid row-gap-10 lg:grid-cols-2 bg-neutral-900 text-white rounded-md shadow-lg'>
      <div className='lg:py-12 lg:px-16'>
        <div className='flex'>
          <div className='flex flex-col items-center mr-4'>
            <div>
              <div className='flex items-center justify-center w-10 h-10 border rounded-full'>
                <CheckIcon className='w-4 text-gray-100' />
              </div>
            </div>
            <div className='w-px h-full bg-gray-300' />
          </div>
          <div className='pt-1 pb-8'>
            <p className='mb-2 font-semibold'>1. Schedule your fundraiser</p>
            <p className='text-gray-100 text-sm'>
              Select the date and time you’d like your week long fundraiser to
              begin.
            </p>
          </div>
        </div>
        <div className='flex'>
          <div className='flex flex-col items-center mr-4'>
            <div>
              <div className='flex items-center justify-center w-10 h-10 border rounded-full'>
                <CheckIcon className='w-4 text-gray-100' />
              </div>
            </div>
            <div className='w-px h-full bg-gray-300' />
          </div>
          <div className='pt-1 pb-8'>
            <p className='mb-2 font-semibold'>2. Share the fundraiser</p>
            <p className='text-gray-100 text-sm'>
              You’ll get a 6-letter Event Code to distribute to your team so
              they can join and participate in your fundraising Event.
            </p>
          </div>
        </div>
        <div className='flex'>
          <div className='flex flex-col items-center mr-4'>
            <div>
              <div className='flex items-center justify-center w-10 h-10 border rounded-full'>
                <CheckIcon className='w-4 text-gray-100' />
              </div>
            </div>
            <div className='w-px h-full bg-gray-300' />
          </div>
          <div className='pt-1 pb-8'>
            <p className='mb-2 font-semibold'>3. Setup Stripe Connect</p>
            <p className='text-gray-100 text-sm'>
              If you are the Event organizer, you can set up how you would like
              to receive the funds. Funds are distributed via Stripe Connect
              after your Event ends.
            </p>
          </div>
        </div>
        <div className='flex'>
          <div className='flex flex-col items-center mr-4'>
            <div>
              <div className='flex items-center justify-center w-10 h-10 border rounded-full'>
                <CheckIcon className='w-4 text-gray-100' />
              </div>
            </div>
          </div>
          <div className='pt-1'>
            <p className='mb-2 font-semibold'>4. Get Paid!</p>
            <p className='text-gray-100 text-sm' />
          </div>
        </div>
      </div>
      <div className='relative'>
        <img
          className='inset-0 object-cover object-bottom w-full rounded-r-md shadow-lg h-96 lg:absolute lg:h-full'
          src='/images/organizer-image.jpeg'
          alt='organizer image'
        />
      </div>
    </div>
  )

  const ParticipantSection = () => (
    <div className='grid row-gap-10 lg:grid-cols-2 bg-neutral-900 text-white rounded-md shadow-lg'>
      <div className='lg:py-12 lg:px-16'>
        <div className='flex'>
          <div className='flex flex-col items-center mr-4'>
            <div>
              <div className='flex items-center justify-center w-10 h-10 border rounded-full'>
                <CheckIcon className='w-4 text-gray-100' />
              </div>
            </div>
            <div className='w-px h-full bg-gray-300' />
          </div>
          <div className='pt-1 pb-8'>
            <p className='mb-2 font-semibold'>1. Join your Event</p>
            <p className='text-gray-100 text-sm'>
              Use the 6-letter Event Code provided by your Organizer to join
              your team’s fundraising Event.
            </p>
          </div>
        </div>
        <div className='flex'>
          <div className='flex flex-col items-center mr-4'>
            <div>
              <div className='flex items-center justify-center w-10 h-10 border rounded-full'>
                <CheckIcon className='w-4 text-gray-100' />
              </div>
            </div>
            <div className='w-px h-full bg-gray-300' />
          </div>
          <div className='pt-1 pb-8'>
            <p className='mb-2 font-semibold'>2. Create your popup store</p>
            <p className='text-gray-100 text-sm'>
              Upload a photo or take a selfie to help your supporters know who
              they’re purchasing from.
            </p>
          </div>
        </div>
        <div className='flex'>
          <div className='flex flex-col items-center mr-4'>
            <div>
              <div className='flex items-center justify-center w-10 h-10 border rounded-full'>
                <CheckIcon className='w-4 text-gray-100' />
              </div>
            </div>
            <div className='w-px h-full bg-gray-300' />
          </div>
          <div className='pt-1 pb-8'>
            <p className='mb-2 font-semibold'>3. SHARE YOUR POP-UP STORE</p>
            <p className='text-gray-100 text-sm'>
              Once the Event starts you’ll have up to 7 days to share your
              personal Pop-Up Store link with friends and family through text
              messaging, social media and email.
            </p>
          </div>
        </div>
        <div className='flex'>
          <div className='flex flex-col items-center mr-4'>
            <div>
              <div className='flex items-center justify-center w-10 h-10 border rounded-full'>
                <CheckIcon className='w-4 text-gray-100' />
              </div>
            </div>
          </div>
          <div className='pt-1'>
            <p className='mb-2 font-semibold'>4. Get Paid!</p>
            <p className='text-gray-100 text-sm' />
          </div>
        </div>
      </div>
      <div className='relative'>
        <img
          className='inset-0 object-cover object-bottom w-full rounded shadow-lg h-96 lg:absolute lg:h-full'
          src='/images/bailey-torres-example.jpeg'
          alt='participant image'
        />
      </div>
    </div>
  )

  return (
    <section className='bg-offwhite py-8'>
      <div className='mx-auto max-w-5xl' id='explainer'>
        <div className='px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20'>
          <h1 className='mb-8 mt-2 text-2xl text-center font-extrabold leading-none tracking-normal text-gray-900 md:text-4xl md:tracking-tight'>
            How Virtual Fundraising Works
          </h1>
          <div className='mb-8 flex items-center justify-center'>
            <div
              className='inline-flex rounded-full bg-light shadow-md hover:shadow-lg focus:shadow-lg'
              role='group'>
              <button
                type='button'
                onClick={() => setActiveSection('organizer')}
                className={`inline-block rounded-full px-6 py-2.5 text-xs font-medium uppercase leading-tight hover:opacity-80 focus:outline-none focus:ring-0 ${
                  activeSection === 'organizer'
                    ? 'bg-gray-800 text-white active:bg-gray-800'
                    : 'text-gray-800'
                } transition duration-600 ease-in-out`}>
                Organizers
              </button>
              <button
                type='button'
                onClick={() => setActiveSection('participant')}
                className={`inline-block rounded-full px-6 py-2.5 text-xs font-medium uppercase leading-tight hover:opacity-80 focus:outline-none focus:ring-0 ${
                  activeSection === 'participant'
                    ? 'bg-gray-800 text-white active:bg-dark'
                    : 'text-gray-800'
                } transition duration-600 ease-in-out`}>
                Participants
              </button>
            </div>
          </div>

          {activeSection === 'organizer' ? (
            <OrganizerSection />
          ) : (
            <ParticipantSection />
          )}
        </div>
      </div>
    </section>
  )
}

export default PopupExplainerSection
