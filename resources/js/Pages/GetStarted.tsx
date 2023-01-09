import { activities } from '@/static-data'
import { InertiaProps } from '@/types'
import { formatPhoneNumberWhileTyping } from '@/utils'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { Inertia } from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-react'
import dayjs from 'dayjs'
import route from 'ziggy-js'

import React, { FormEvent, FunctionComponent, useMemo, useState } from 'react'

import LoginForm from '@/Components/Auth/LoginForm'
import RegisterForm from '@/Components/Auth/RegisterForm'
import Button from '@/Components/Form/Button'
import Input from '@/Components/Form/Input'
import Select from '@/Components/Form/Select'
import InputError from '@/Components/InputError'
import Navbar from '@/Components/Navbar'

import AppLayout from '@/Layouts/AppLayout'

type Props = {
  activities: App.Models.Activity[]
}

const GetStarted: FunctionComponent<Props> = ({ activities }) => {
  // Create account (if not auth: show create email / password
  const [loading, setLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [showLogin, setShowLogin] = useState(false)
  const totalSteps = 4
  const { auth } = usePage().props as unknown as InertiaProps
  const [organizationName, setOrganizationName] = useState('')
  const [activity, setActivity] = useState<undefined | string>()
  const [postalCode, setPostalCode] = useState('')
  const [startDate, setStartDate] = useState('')
  const [participantCount, setParticipantCount] = useState(1)
  const [goalAmount, setGoalAmount] = useState(100)
  const [formErrors, setFormErrors] = useState<any>()

  const [activityOptions] = useMemo(() => {
    const options = activities.map((activity) => {
      return {
        value: activity.id,
        name: activity.name,
      }
    })
    return [options]
  }, [activities])

  const [isLastStep] = useMemo(() => {
    return [totalSteps === currentStep]
  }, [currentStep])

  const [endDate] = useMemo(() => {
    const end = dayjs(startDate).add(1, 'week').format('YYYY-MM-DD')
    return [end]
  }, [startDate])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!isLastStep) {
      return setCurrentStep(currentStep + 1)
    }

    Inertia.post(
      route('store.fundraiser'),
      {
        organization_name: organizationName,
        activity_id: activity as string,
        start_date: startDate,
        postal_code: postalCode,
        participant_count: participantCount,
        goal_amount: goalAmount,
      },
      {
        onBefore: () => setLoading(true),
        onFinish: () => setLoading(false),
      }
    )
  }

  return (
    <AppLayout enableFooter={false} loading={loading}>
      <div className='mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 mb-32'>
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
          {auth.user ? (
            <form onSubmit={handleSubmit}>
              <div className='lg:py-24'>
                <h3 className='text-xs font-semibold tracking-wider uppercase text-gray-600'>
                  Step {currentStep} of {totalSteps}
                </h3>
                {currentStep === 1 && (
                  <>
                    <h2 className='text-3xl font-bold sm:text-4xl mb-3'>
                      What is the name of your organizer?
                    </h2>
                    <p className='my-4 text-gray-600'>
                      The organization name will be displayed on each
                      participant’s profile
                    </p>
                    <Input
                      id='name'
                      label='Team Name'
                      type='text'
                      required={true}
                      name='name'
                      value={organizationName}
                      onChange={(e) => setOrganizationName(e.target.value)}
                    />
                  </>
                )}

                {currentStep === 2 && (
                  <>
                    <h2 className='text-3xl font-bold sm:text-4xl mb-3'>
                      What is your affiliation?
                    </h2>
                    <p className='my-4 text-gray-600'>
                      Tell us more about your organization (e.g. High School
                      Basketball)
                    </p>
                    <div className='mt-5'>
                      <Select
                        id='activity'
                        label='Activity'
                        placeholder='Select an activity'
                        options={activityOptions}
                        required={true}
                        value={activity}
                        onChange={(e) => {
                          setActivity(e.target.value as string)
                        }}
                      />
                    </div>

                    <div className='mt-5'>
                      <Input
                        id='postal'
                        label='Postal Code'
                        type='text'
                        required={true}
                        name='postal'
                        maxLength={5}
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                      />
                    </div>
                  </>
                )}

                {currentStep === 3 && (
                  <>
                    <h2 className='text-3xl font-bold sm:text-4xl mb-3'>
                      How many people will participate in the fundraiser?
                    </h2>
                    <div>
                      <Input
                        id='participants'
                        label='Total Participants'
                        type='number'
                        required={true}
                        min={1}
                        value={participantCount}
                        onChange={(e) =>
                          setParticipantCount(e.target.valueAsNumber)
                        }
                      />
                    </div>

                    <div className='mt-5'>
                      <Input
                        id='goal'
                        label='Goal per participant ($)'
                        type='number'
                        required={true}
                        min={50}
                        value={goalAmount}
                        onChange={(e) => setGoalAmount(e.target.valueAsNumber)}
                      />
                    </div>
                  </>
                )}

                {currentStep === 4 && (
                  <>
                    <h2 className='text-3xl font-bold sm:text-4xl mb-3'>
                      When do you want to start your week long fundraiser?
                    </h2>
                    <Input
                      id='start_date'
                      label='Start Date'
                      type='date'
                      required={true}
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />

                    {startDate && (
                      <div className='mt-4'>
                        <Input
                          id='end_date'
                          label='End Date'
                          type='date'
                          disabled={true}
                          value={endDate}
                        />
                      </div>
                    )}
                  </>
                )}

                <div className='mt-5 flex items-center justify-between'>
                  <Button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    type='button'
                    className='text-black border-gray-700 border-2 px-5 py-3 rounded bg-transparent'
                    processing={currentStep === 1}>
                    <ChevronLeftIcon className='h-4 w-4' />
                    Back
                  </Button>

                  <Button
                    type='submit'
                    className='text-white border-gray-700 border-2 px-5 py-3 rounded'
                    processing={false}>
                    {isLastStep ? 'Submit' : 'Continue'}{' '}
                    <ChevronRightIcon className='h-4 w-4' />
                  </Button>
                </div>
              </div>
            </form>
          ) : showLogin ? (
            <LoginForm showRegister={() => setShowLogin(false)} />
          ) : (
            <RegisterForm showLogin={() => setShowLogin(true)} />
          )}
        </div>
      </div>
    </AppLayout>
  )
}

export default GetStarted
