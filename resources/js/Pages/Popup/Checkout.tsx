import { PAYMENT, SHIPPING, ShippingRate } from '@/types'
import { classNames } from '@/utils'
import { RadioGroup } from '@headlessui/react'
import {
  CheckCircleIcon,
  ChevronLeftIcon,
  TrashIcon,
} from '@heroicons/react/20/solid'
import { Inertia } from '@inertiajs/inertia'
import { Link } from '@inertiajs/inertia-react'
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js'
import { StripeCardNumberElement } from '@stripe/stripe-js'
import route from 'ziggy-js'

import React, { FunctionComponent, useMemo, useState } from 'react'

import Input from '@/Components/Form/Input'
import CheckoutSummary from '@/Components/Partials/Checkout/CheckoutSummary'
import Steps from '@/Components/Steps'

import PopupStoreLayout from '@/Layouts/PopupStoreLayout'

type Props = {
  store: App.Models.Store
  cart: App.Models.Cart
  rates: ShippingRate[]
}

const steps = [
  { id: 1, name: 'Shipping' },
  { id: 2, name: 'Payment' },
]

const Checkout: FunctionComponent<Props> = ({ store, cart, rates }) => {
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState<
    ShippingRate | undefined
  >()

  const [currentFormStep, setCurrentFormStep] = useState(steps[0])
  const totalSteps = steps.length
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [unit, setUnit] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [postal, setPostal] = useState('')
  const [stripeError, setStripeError] = useState<string | undefined>()
  const [loading, setLoading] = useState(false)

  const stripe = useStripe()
  const elements = useElements()

  const [isLastStep, isPaymentStep, isShippingStep] = useMemo(() => {
    return [
      totalSteps === currentFormStep.id,
      currentFormStep.id === PAYMENT,
      currentFormStep.id === SHIPPING,
    ]
  }, [selectedDeliveryMethod, currentFormStep])

  const generateStripeToken = async () => {
    // Retrieve the credit card details from the Stripe.js library
    if (elements && stripe) {
      const cardNumberElement = elements.getElement(CardNumberElement)

      const { token, error } = await stripe.createToken(
        cardNumberElement as StripeCardNumberElement,
        {
          name: firstName + lastName,
        }
      )

      if (error || !token) {
        // Show an error message to the user if there is a problem
        console.error(error)
        return {
          token: undefined,
          error: error?.message ?? 'An error occurred with your payment method',
        }
      }

      return { token: token.id, error: undefined }
    }

    return {
      token: undefined,
      error: 'An error occurred with your payment method',
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // Prevent the default form submission behavior
    event.preventDefault()

    if (isShippingStep) {
      calculateShippingRates()
      return
    }

    if (!selectedDeliveryMethod && !isShippingStep) {
      // setCurrentFormStep(steps[0])
      return
    }

    const { token, error } = await generateStripeToken()

    if (error || !token) {
      setStripeError(error)
      return
    }

    if (selectedDeliveryMethod) {
      Inertia.post(
        route('submit.order', [store.uuid]),
        {
          first_name: firstName,
          last_name: lastName,
          email,
          phone,
          stripe_token: token,
          address,
          unit,
          city,
          state,
          postal,
          rate: selectedDeliveryMethod.id,
        },
        {
          onBefore: () => setLoading(true),
          onFinish: () => setLoading(false),
        }
      )
    }
  }

  const calculateShippingRates = () => {
    Inertia.post(
      route('store.checkout', [store.uuid]),
      {
        address,
        unit,
        city,
        state,
        postal,
        name: firstName + ' ' + lastName,
      },
      {
        onBefore: () => setLoading(true),
        onFinish: () => {
          setLoading(false)
          setCurrentFormStep(steps[1])
          if (rates) {
            setSelectedDeliveryMethod(rates[0])
          }
        },
        only: ['rates'],
      }
    )
  }

  return (
    <PopupStoreLayout store={store} loading={loading}>
      <div className='bg-offwhite'>
        <div className='mx-auto max-w-3xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8'>
          <div className='mb-5'>
            <nav aria-label='Back'>
              <Link
                href={route('popup.store', [store.uuid])}
                className='inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700'>
                <ChevronLeftIcon
                  className='-ml-1 mr-1 h-5 w-5 flex-shrink-0 text-gray-400'
                  aria-hidden='true'
                />
                Back to Popup Store
              </Link>
            </nav>
          </div>
          <h2 className='font-semibold text-2xl sm:text-3xl lg:text-6xl leading-10 tracking-tight'>
            Checkout
          </h2>

          <div className='lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16'>
            <div className='sm:order-2'>
              {/* Order summary */}
              {cart.items && (
                <CheckoutSummary
                  items={cart.items}
                  rate={selectedDeliveryMethod}
                />
              )}
            </div>
            <form onSubmit={handleSubmit}>
              <Steps
                steps={steps}
                onClick={(step) => setCurrentFormStep(step)}
                currentStep={currentFormStep}
              />
              {/* Contact Information / Shipping*/}
              {currentFormStep.id === SHIPPING && (
                <div className='mt-5 border-t border-gray-200 pt-10 px-1'>
                  <div>
                    <h2 className='text-lg font-medium text-gray-900'>
                      Contact information
                    </h2>

                    <div className='mt-4'>
                      <Input
                        value={email}
                        id='email'
                        title='email'
                        onChange={(e) => setEmail(e.target.value)}
                        type='email'
                        required={true}
                      />
                    </div>

                    <div className='mt-4'>
                      <Input
                        value={phone}
                        id='phone'
                        title='phone'
                        onChange={(e) => setPhone(e.target.value)}
                        type='tel'
                        required={true}
                      />
                    </div>
                  </div>
                  <div className='mt-10 border-t border-gray-200 pt-10 px-1'>
                    <h2 className='text-lg font-medium text-gray-900'>
                      Shipping information
                    </h2>

                    <div className='mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-4'>
                      <div className='sm:col-span-3'>
                        <Input
                          value={firstName}
                          id='first-name'
                          title='First Name'
                          onChange={(e) => setFirstName(e.target.value)}
                          type='text'
                          required={true}
                        />
                      </div>
                      <div className='sm:col-span-3'>
                        <Input
                          value={lastName}
                          id='last-name'
                          title='Last Name'
                          onChange={(e) => setLastName(e.target.value)}
                          type='text'
                          required={true}
                        />
                      </div>
                      <div className='sm:col-span-6'>
                        <Input
                          value={address}
                          id='address'
                          title='Address'
                          onChange={(e) => setAddress(e.target.value)}
                          type='text'
                          // autoComplete='street-address'
                          required={true}
                        />
                      </div>
                      <div className='sm:col-span-6'>
                        <Input
                          value={unit}
                          id='unit'
                          title='Apartment / Suite / Unit'
                          onChange={(e) => setUnit(e.target.value)}
                          type='text'
                        />
                      </div>

                      <div className='sm:col-span-2'>
                        <Input
                          value={city}
                          id='city'
                          title='City'
                          onChange={(e) => setCity(e.target.value)}
                          type='text'
                          // autoComplete='city-name'
                          required={true}
                        />
                      </div>
                      <div className='sm:col-span-2'>
                        <Input
                          value={state}
                          id='state'
                          title='state'
                          onChange={(e) => setState(e.target.value)}
                          type='text'
                          // autoComplete='state-name'
                          required={true}
                        />
                      </div>
                      <div className='sm:col-span-2'>
                        <Input
                          value={postal}
                          id='postal'
                          title='Postal Code'
                          onChange={(e) => setPostal(e.target.value)}
                          type='text'
                          // autoComplete='postal-code'
                          required={true}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment */}
              {isPaymentStep && (
                <>
                  <div className='mt-10 border-t border-gray-200 pt-10'>
                    <h2 className='text-lg font-medium text-gray-900'>
                      Delivery Method
                    </h2>

                    <div className='w-full mt-6'>
                      <RadioGroup
                        value={selectedDeliveryMethod}
                        onChange={setSelectedDeliveryMethod}>
                        <div className='mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4'>
                          {rates.map((rate) => (
                            <RadioGroup.Option
                              key={rate.id}
                              value={rate}
                              className={({ checked, active }) =>
                                classNames(
                                  checked
                                    ? 'border-transparent'
                                    : 'border-gray-300',
                                  active ? 'ring-2 ring-sky-500' : '',
                                  'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none'
                                )
                              }>
                              {({ checked, active }) => (
                                <>
                                  <span className='flex flex-1'>
                                    <span className='flex flex-col'>
                                      <span className='flex items-center justify-between'>
                                        <RadioGroup.Label
                                          as='span'
                                          className='block text-sm font-medium text-gray-900'>
                                          {rate.provider} - {rate.name}
                                        </RadioGroup.Label>
                                        {checked ? (
                                          <CheckCircleIcon
                                            className='h-5 w-5 text-sky-600'
                                            aria-hidden='true'
                                          />
                                        ) : null}
                                      </span>
                                      <RadioGroup.Description
                                        as='span'
                                        className='mt-1 flex items-center text-sm text-gray-500'>
                                        {rate.description.substring(0, 60)}
                                      </RadioGroup.Description>
                                      <span className='mt-6 flex items-center justify-between'>
                                        <RadioGroup.Description
                                          as='span'
                                          className='text-sm font-medium text-gray-900'>
                                          ${rate.amount}
                                        </RadioGroup.Description>
                                        <RadioGroup.Description
                                          as='img'
                                          src={rate.image}
                                          className='w-4 h-4'
                                        />
                                      </span>
                                    </span>
                                  </span>

                                  <span
                                    className={classNames(
                                      active ? 'border' : 'border-2',
                                      checked
                                        ? 'border-sky-500'
                                        : 'border-transparent',
                                      'pointer-events-none absolute -inset-px rounded-lg'
                                    )}
                                    aria-hidden='true'
                                  />
                                </>
                              )}
                            </RadioGroup.Option>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                  <div className='mt-10 border-t border-gray-200 pt-10'>
                    <h2 className='text-lg font-medium text-gray-900'>
                      Payment
                    </h2>
                    <h3 className='text-sm font-semibold text-gray-600 mt-1'>
                      Credit Card processing is encrypted with AES-256 via
                      Stripe.
                    </h3>

                    <div className='mt-6 w-full'>
                      <div className='mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-4 sm:gap-x-4'>
                        <div className='sm:col-span-2'>
                          <label
                            htmlFor='card-number'
                            className='relative block overflow-hidden rounded-input border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-gray-500 focus-within:ring-1 focus-within:ring-gray-500 bg-white'>
                            <CardNumberElement
                              className='peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm'
                              id='card-number'
                            />
                          </label>
                        </div>
                        <div className='sm:col-span-1'>
                          <label
                            htmlFor='card-expiration'
                            className='relative block overflow-hidden rounded-input border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-gray-500 focus-within:ring-1 focus-within:ring-gray-500 bg-white'>
                            <CardExpiryElement
                              className='peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm'
                              id='card-expiration'
                            />
                          </label>
                        </div>
                        <div className='sm:col-span-1'>
                          <label
                            htmlFor='cvc-number'
                            className='relative block overflow-hidden rounded-input border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-gray-500 focus-within:ring-1 focus-within:ring-gray-500 bg-white'>
                            <CardCvcElement
                              className='peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm'
                              id='cvc-number'
                            />
                          </label>
                        </div>
                      </div>
                      {stripeError && (
                        <small className='text-red-500 text-xs'>
                          {stripeError}
                        </small>
                      )}
                    </div>
                  </div>
                </>
              )}

              <div className='mt-6'>
                <button
                  type={'submit'}
                  className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-sky-600 hover:bg-sky-500 focus:outline-none focus:border-sky-700 focus:shadow-outline-sky active:bg-sky-700'>
                  {isLastStep ? 'Submit' : 'Continue'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PopupStoreLayout>
  )
}

export default Checkout
