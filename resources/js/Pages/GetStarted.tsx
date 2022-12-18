import { Inertia } from '@inertiajs/inertia'
import route from 'ziggy-js'

import { FormEvent, FunctionComponent, useState } from 'react'

import Button from '@/Components/Form/Button'
import Input from '@/Components/Form/Input'
import Navbar from '@/Components/Navbar'

const GetStarted: FunctionComponent = () => {
  // Create account (if not auth: show create email / password
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 3

  const isLastStep = totalSteps === currentStep

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!isLastStep) {
      return setCurrentStep(currentStep + 1)
    }
  }

  return (
    <>
      <main>
        <Navbar />
        <section>
          <div className='mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8'>
            <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-16'>
              <div className='hidden md:block relative h-64 rounded-lg sm:h-80 lg:order-last lg:h-full'>
                <img
                  alt='Baily Torres'
                  src='/images/bailey-torres-example.jpeg'
                  className='absolute inset-6 h-96 w-64 object-cover rounded-md shadow'
                />
                <img
                  alt='Kiana image'
                  src='/images/kiana-bosman-example.jpeg'
                  className='absolute inset-64 h-96 w-64 object-cover z-10 rounded-md shadow'
                />
              </div>
              <form onSubmit={handleSubmit}>
                <div className='lg:py-24'>
                  <h3 className='text-xs font-semibold tracking-wider uppercase text-gray-600'>
                    Step {currentStep} of {totalSteps}
                  </h3>
                  {currentStep === 1 && (
                    <>
                      <h2 className='text-3xl font-bold sm:text-4xl mb-3'>
                        What is the name of your team?
                      </h2>
                      <p className='my-4 text-gray-600'>
                        The team name will be displayed on each participant’s
                        Pop-Up Store.
                      </p>
                      <Input
                        id='name'
                        title='Team Name'
                        type='text'
                        required={true}
                      />
                    </>
                  )}

                  {currentStep === 2 && (
                    <>
                      <h2 className='text-3xl font-bold sm:text-4xl mb-3'>
                        When are you looking to start fundraising?
                      </h2>
                      <p className='my-4 text-gray-600'>
                        The team name will be displayed on each participant’s
                        Pop-Up Store.
                      </p>
                      <Input
                        id='name'
                        title='Team Name'
                        type='text'
                        required={true}
                      />
                    </>
                  )}

                  {currentStep === 3 && (
                    <>
                      <h2 className='text-3xl font-bold sm:text-4xl mb-3'>
                        How many people will participate in the fundraiser?
                      </h2>
                      <Input
                        id='participants'
                        title='Total Participants'
                        type='number'
                        required={true}
                      />
                    </>
                  )}

                  <div className='mt-5'>
                    <Button
                      type='submit'
                      className='text-white border-gray-700 border-2 px-5 py-3 rounded'
                      processing={false}>
                      {isLastStep ? 'Submit' : 'Continue'}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default GetStarted
