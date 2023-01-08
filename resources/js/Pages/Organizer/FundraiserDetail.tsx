import { classNames, formatDate } from '@/utils'
import { Dialog, Menu, RadioGroup, Transition } from '@headlessui/react'
import {
  BanknotesIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline'
import {
  ChevronLeftIcon,
  EllipsisVerticalIcon,
  ExclamationTriangleIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/solid'
import { Inertia } from '@inertiajs/inertia'
import { Link } from '@inertiajs/inertia-react'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'
import route from 'ziggy-js'

import React, {
  FormEvent,
  Fragment,
  FunctionComponent,
  useMemo,
  useRef,
  useState,
} from 'react'
import CountUp from 'react-countup'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Input from '@/Components/Form/Input'
import Select from '@/Components/Form/Select'
import Modal from '@/Components/Modal'
import Navbar from '@/Components/Navbar'

import useCopyToClipboard from '@/Hooks/useCopyToClipboard'

import AppLayout from '@/Layouts/AppLayout'

dayjs.extend(utc)

dayjs.extend(localizedFormat)
dayjs.extend(relativeTime)

type Props = {
  fundraiser: App.Models.Fundraiser
  leaderboard: App.Models.Store[]
  stats: {
    revenue: number
    earnings: number
    total_orders: number
  }
  activities: App.Models.Activity[]
  active: boolean
  past: boolean
  shared_url: string
  payouts_disabled_reason: string | null
}

const FundraiserDetail: FunctionComponent<Props> = ({
  fundraiser,
  leaderboard,
  stats,
  activities,
  active,
  past,
  shared_url,
  payouts_disabled_reason,
}) => {
  const [loading, setLoading] = useState(false)
  const [status] = useMemo(() => {
    if (
      dayjs(fundraiser.start_time_iso8601).isAfter(dayjs()) &&
      dayjs(fundraiser.end_time_iso8601).isAfter(dayjs())
    ) {
      return [
        'Event starts in ' + dayjs(fundraiser.start_time_iso8601).toNow(true),
      ]
    }

    if (
      dayjs(fundraiser.start_time_iso8601).isBefore(dayjs()) &&
      dayjs(fundraiser.end_time_iso8601).isAfter(dayjs())
    ) {
      return [
        'Event ends in ' + dayjs(fundraiser.end_time_iso8601).fromNow(true),
      ]
    }

    return ['Event has ended']
  }, [])
  const [clipboard, copy] = useCopyToClipboard()
  const [openModal, setOpenModal] = useState(false)
  const cancelButtonRef = useRef(null)
  const [activityOptions] = useMemo(() => {
    const options = activities.map((activity) => {
      return {
        value: activity.id,
        name: activity.name,
      }
    })
    return [options]
  }, [activities])
  const [organizationName, setOrganizationName] = useState(fundraiser.name)
  const [activity, setActivity] = useState(String(fundraiser.activity_id))
  const [postalCode, setPostalCode] = useState(fundraiser.postal_code)
  const [startDate, setStartDate] = useState(fundraiser.start_date)
  const [participantCount, setParticipantCount] = useState(
    fundraiser.participant_count
  )
  const [goalAmount, setGoalAmount] = useState(fundraiser.goal_amount)

  const handleCopy = async () => {
    copy(shared_url)
    toast.success('Copied code to clipboard 📋', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    })
  }

  const closeModal = () => {
    setOpenModal(false)
    // setShowProductModal(false)
  }

  const cancel = () => {
    if (window.confirm('Are you sure you want cancel this fundraiser?')) {
      Inertia.delete(route('cancel.fundraiser', [fundraiser.uuid]))
    }
  }

  const handleEdit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    Inertia.patch(
      route('update.fundraiser', [fundraiser.uuid]),
      {
        start_date: startDate,
        organization_name: organizationName,
        activity_id: activity,
        postal_code: postalCode,
        participant_count: participantCount,
        goal_amount: goalAmount,
      },
      {
        onBefore: () => setLoading(true),
        onFinish: () => {
          setLoading(false)
          setOpenModal(false)
        },
        only: ['fundraiser'],
      }
    )
  }

  return (
    <AppLayout loading={loading} enableFooter={false}>
      {payouts_disabled_reason && (
        <div className='bg-red-600'>
          <div className='mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8'>
            <div className='flex flex-wrap items-center justify-between'>
              <div className='flex w-0 flex-1 items-center'>
                <span className='flex rounded-lg bg-red-800 p-2'>
                  <InformationCircleIcon
                    className='h-6 w-6 text-white'
                    aria-hidden='true'
                  />
                </span>
                <p className='ml-3 truncate font-medium text-white'>
                  <span className='md:hidden'>{payouts_disabled_reason}</span>
                  <span className='hidden md:inline'>
                    {payouts_disabled_reason}
                  </span>
                </p>
              </div>
              <div className='order-3 mt-2 w-full flex-shrink-0 sm:order-2 sm:mt-0 sm:w-auto'>
                <Link
                  href={route('connect.bank', [fundraiser.uuid])}
                  className='flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-red-600 shadow-sm hover:bg-red-50'>
                  Fix Bank Information
                </Link>
              </div>
              <div className='order-2 flex-shrink-0 sm:order-3 sm:ml-3'>
                <button
                  type='button'
                  className='-mr-1 flex rounded-md p-2 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2'>
                  <span className='sr-only'>Dismiss</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
      <div className='bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-200 via-white to-white'>
        <div className='max-w-6xl mx-auto px-6 py-16 sm:px-0'>
          <div>
            <nav aria-label='Back'>
              <Link
                href={route('fundraisers')}
                className='inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700'>
                <ChevronLeftIcon
                  className='-ml-1 mr-1 h-5 w-5 flex-shrink-0 text-gray-400'
                  aria-hidden='true'
                />
                Back
              </Link>
            </nav>
          </div>
          <div className='py-16 md:flex md:items-start md:justify-between'>
            <div className='min-w-0 flex-1'>
              <h2 className='text-3xl font-extrabold leading-10'>
                {fundraiser.name}
              </h2>
              <h4 className='text-lg font-medium text-gray-600 mt-2'>
                Organized by {fundraiser.organizer?.full_name}
              </h4>
            </div>
            {!past && (
              <>
                <div className='mt-4 flex flex-shrink-0 md:mt-0 sm::ml-4 space-x-3'>
                  <button
                    type='button'
                    onClick={handleCopy}
                    className='inline-flex items-center rounded-md border border-transparent bg-black px-4 py-2 font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none text-sm focus:ring-2 focus:ring-white focus:ring-offset-2'>
                    Share Event
                  </button>

                  {/*Dropdown Button*/}
                  <Menu as='div' className='relative inline-block text-left'>
                    <div>
                      <Menu.Button className='inline-flex items-center rounded-md border border-transparent bg-black px-4 py-2 font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2'>
                        <span className='sr-only'>Open options</span>
                        <EllipsisVerticalIcon
                          className='h-5 w-5'
                          aria-hidden='true'
                        />
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter='transition ease-out duration-100'
                      enterFrom='transform opacity-0 scale-95'
                      enterTo='transform opacity-100 scale-100'
                      leave='transition ease-in duration-75'
                      leaveFrom='transform opacity-100 scale-100'
                      leaveTo='transform opacity-0 scale-95'>
                      <Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                        <div className='py-1'>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                type='button'
                                onClick={() => setOpenModal(true)}
                                className={classNames(
                                  active
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-700',
                                  'group flex items-center px-4 py-2 text-sm w-full'
                                )}>
                                <PencilSquareIcon
                                  className='mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500'
                                  aria-hidden='true'
                                />
                                Edit Fundraiser
                              </button>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={cancel}
                                className={classNames(
                                  active
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-700',
                                  'group flex items-center px-4 py-2 text-sm w-full'
                                )}>
                                <TrashIcon
                                  className='mr-3 h-5 w-5 text-red-500 group-hover:text-gray-500'
                                  aria-hidden='true'
                                />
                                Cancel Fundraiser
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>

                  {/*Edit Modal*/}
                  <Transition.Root show={openModal} as={Fragment}>
                    <Dialog
                      as='div'
                      className='relative z-10'
                      initialFocus={cancelButtonRef}
                      onClose={setOpenModal}>
                      <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'>
                        <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
                      </Transition.Child>

                      <div className='fixed inset-0 z-10 overflow-y-auto'>
                        <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
                          <Transition.Child
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                            enterTo='opacity-100 translate-y-0 sm:scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'>
                            <Dialog.Panel className='w-full max-w-lg relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8'>
                              <form onSubmit={handleEdit}>
                                <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                                  <div className='w-full'>
                                    <h3 className='text-lg font-medium leading-6 text-gray-900 mb-5'>
                                      Edit Fundraiser
                                    </h3>
                                    <div className='space-y-5'>
                                      <Input
                                        id='organization_name'
                                        label='Organization Name'
                                        type='text'
                                        defaultValue={fundraiser.name}
                                        onChange={(e) =>
                                          setOrganizationName(e.target.value)
                                        }
                                      />

                                      <Select
                                        id='activity'
                                        label='Activity'
                                        placeholder='Select an activity'
                                        options={activityOptions}
                                        defaultValue={fundraiser.activity_id}
                                        onChange={(e) =>
                                          setActivity(e.target.value)
                                        }
                                      />

                                      <Input
                                        id='postal'
                                        label='Postal Code'
                                        type='text'
                                        name='postal'
                                        maxLength={5}
                                        defaultValue={fundraiser.postal_code}
                                        onChange={(e) =>
                                          setPostalCode(e.target.value)
                                        }
                                      />

                                      <Input
                                        id='goal'
                                        label='Goal per participant ($)'
                                        type='number'
                                        min={50}
                                        disabled={active}
                                        defaultValue={fundraiser.goal_amount}
                                        onChange={(e) =>
                                          setGoalAmount(e.target.valueAsNumber)
                                        }
                                      />

                                      <Input
                                        id='participant_count'
                                        label='Participant Count'
                                        type='number'
                                        defaultValue={
                                          fundraiser.participant_count
                                        }
                                        disabled={active}
                                        min={1}
                                        onChange={(e) =>
                                          setParticipantCount(
                                            e.target.valueAsNumber
                                          )
                                        }
                                      />

                                      <Input
                                        id='start_date'
                                        label='Start Date'
                                        type='date'
                                        disabled={active}
                                        defaultValue={formatDate(
                                          fundraiser.start_date
                                        )}
                                        onChange={(e) =>
                                          setStartDate(e.target.value)
                                        }
                                      />

                                      <Input
                                        id='end_date'
                                        label='End Date'
                                        type='date'
                                        disabled={true}
                                        value={dayjs(startDate)
                                          .add(7, 'days')
                                          .format('YYYY-MM-DD')}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                                  <button
                                    type='submit'
                                    className='inline-flex w-full justify-center rounded-md border border-transparent bg-gray-900 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm'>
                                    Save
                                  </button>
                                  <button
                                    type='button'
                                    className='mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                                    onClick={() => setOpenModal(false)}
                                    ref={cancelButtonRef}>
                                    Cancel
                                  </button>
                                </div>
                              </form>
                            </Dialog.Panel>
                          </Transition.Child>
                        </div>
                      </div>
                    </Dialog>
                  </Transition.Root>
                </div>
              </>
            )}
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-8 items-start mt-5'>
            {/*Event Start / End time */}
            <div className='col-span-1'>
              <h4 className='text-lg font-medium text-gray-600'>
                Event Status
              </h4>
              <h2 className='text-2xl font-bold leading-10 mt-1'>{status}</h2>
            </div>

            <div className='col-span-1'>
              <dl className='mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3'>
                <div className='overflow-hidden py-2 '>
                  <dt className='truncate text-sm font-medium text-gray-500'>
                    Event Total
                  </dt>
                  <dd className='mt-1 text-3xl font-semibold tracking-tight text-gray-900'>
                    <CountUp
                      start={0}
                      end={stats.revenue}
                      duration={0.5}
                      decimals={2}
                      decimal='.'
                      prefix='$'
                    />
                  </dd>
                </div>

                <div className='overflow-hidden py-2 '>
                  <dt className='truncate text-sm font-medium text-gray-500'>
                    Event Revenue
                  </dt>
                  <dd className='mt-1 text-3xl font-semibold tracking-tight text-gray-900'>
                    <CountUp
                      start={0}
                      end={stats.earnings}
                      duration={0.5}
                      decimals={2}
                      decimal='.'
                      prefix='$'
                    />
                  </dd>
                </div>

                <div className='overflow-hidden py-2 '>
                  <dt className='truncate text-sm font-medium text-gray-500'>
                    Total Orders
                  </dt>
                  <dd className='mt-1 text-3xl font-semibold tracking-tight text-gray-900'>
                    <CountUp
                      start={0}
                      end={stats.total_orders}
                      duration={0.5}
                    />
                  </dd>
                </div>
              </dl>
            </div>

            <div className='col-span-1'>
              <div className='max-w-md'>
                <h2 className='text-2xl font-bold leading-10 mt-1 border-b border-gray-200 pb-2'>
                  Details
                </h2>

                <ul className='my-8 space-y-8'>
                  <li className='flex items-center justify-between'>
                    <h3 className='text-gray-600 font-medium'>Start Date</h3>
                    <p className='text-gray-900 font-semibold'>
                      {dayjs(fundraiser.start_date).format('LL')}
                    </p>
                  </li>
                  <li className='flex items-center justify-between'>
                    <h3 className='text-gray-600 font-medium'>End Date</h3>
                    <p className='text-gray-900 font-semibold'>
                      {dayjs(fundraiser.end_date).format('LL')}
                    </p>
                  </li>
                  <li className='flex items-center justify-between'>
                    <h3 className='text-gray-600 font-medium'>Category</h3>
                    <p className='text-gray-900 font-semibold'>
                      {fundraiser.activity?.name}
                    </p>
                  </li>
                </ul>

                <h2 className='text-2xl font-bold leading-10 mt-1 border-b border-gray-200 pb-2'>
                  Payouts
                </h2>
                <div className='w-full'>
                  {fundraiser.stripe_express_connected ? (
                    <Link
                      href={route('connect.bank', [fundraiser.uuid])}
                      className='mt-6 flex items-center justify-center rounded-md border border-transparent bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800'>
                      View Payouts
                    </Link>
                  ) : (
                    <>
                      <p className='text-sm text-gray-600 mt-1 font-semibold'>
                        In order to receive a payout for your fundraiser, you
                        must connect your bank account.
                      </p>
                      <Link
                        href={route('connect.bank', [fundraiser.uuid])}
                        className='mt-6 flex items-center justify-center rounded-md border border-transparent bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800'>
                        Connect Bank Account
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className='col-span-1'>
              <div className='max-w-md'>
                <h2 className='text-2xl font-bold leading-10 mt-1 border-b border-gray-200 pb-2'>
                  Leaderboard
                </h2>

                <ul role='list' className='space-y-1'>
                  {leaderboard.map((store, place) => (
                    <li className='py-4' key={place}>
                      <Link
                        target='_blank'
                        href={route('popup.store', [store.uuid])}
                        className='flex items-center space-x-4'>
                        <h3>{place + 1}</h3>
                        <div className='flex-shrink-0'>
                          <img
                            className='h-8 w-8 rounded-full'
                            src={store.avatar}
                            alt={store.user?.full_name}
                          />
                        </div>
                        <div className='min-w-0 flex-1'>
                          <p className='truncate text-lg font-medium text-gray-900'>
                            {store.user?.full_name}
                          </p>
                        </div>
                        <div>
                          <h3 className='font-semibold'>
                            <CountUp
                              start={0}
                              end={store.progress.current}
                              duration={0.5}
                              decimals={2}
                              decimal='.'
                              prefix='$'
                            />
                          </h3>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default FundraiserDetail
