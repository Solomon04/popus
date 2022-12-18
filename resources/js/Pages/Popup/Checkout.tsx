import CartContext from '@/Context/CartContext'
import { deliveryMethods, paymentMethods } from '@/static-data'
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
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js'
import { loadStripe, StripeCardNumberElement } from '@stripe/stripe-js'
import _, { round } from 'lodash'
import route from 'ziggy-js'

import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import CreditCardForm from '@/Components/CreditCardForm'
import Input from '@/Components/Form/Input'
import CheckoutSummary from '@/Components/Partials/Checkout/CheckoutSummary'
import Cart from '@/Components/Partials/PopupStore/Cart'

import PopupStoreLayout from '@/Layouts/PopupStoreLayout'

const stripePromise = loadStripe('pk_test_Jp3kv7BJibBz4ANCtbTISq6q00V7NZXMcQ')

const Checkout: FunctionComponent = () => {
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState<any>(
    deliveryMethods[0]
  )
  const { items } = useContext(CartContext)

  useEffect(() => {
    console.log(items)
  }, [items])

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [unit, setUnit] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [postal, setPostal] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [cvc, setCvc] = useState('')
  const [expirationDate, setExpirationDate] = useState('')

  const stripe = useStripe()
  const elements = useElements()

  const [name] = useMemo(() => {
    return [`${firstName} ${lastName}`]
  }, [firstName, lastName])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // Prevent the default form submission behavior
    event.preventDefault()

    if (!elements || !stripe) {
      throw new Error()
    }

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
        return
      } else {
        // Otherwise, send the payment method information to your server
        // to create a charge or save the payment method for future use
        console.log('Token:', token)
        Inertia.post(
          route('checkout', {
            name,
            email,
            phone,
            stripe_token: token.id,
            address,
            unit,
            city,
            state,
            postal,
          })
        )
      }
    }
  }

  return (
    <PopupStoreLayout>
      <div className='bg-offwhite'>
        <div className='mx-auto max-w-3xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8'>
          <div className='mb-5'>
            <nav aria-label='Back'>
              <Link
                href='/store'
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
            <form onSubmit={handleSubmit}>
              <div>
                {/*Contact Information*/}
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

              {/*Shipping Form*/}
              <div className='mt-10 border-t border-gray-200 pt-10'>
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

              {/* Payment */}
              <div className='mt-10 border-t border-gray-200 pt-10'>
                <h2 className='text-lg font-medium text-gray-900'>Payment</h2>
                <h3 className='text-sm font-semibold text-gray-600 mt-1'>
                  Credit Card processing is encrypted with AES-256 via Stripe.
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

                  <div className='mt-6'>
                    <button
                      type='submit'
                      className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-sky-600 hover:bg-sky-500 focus:outline-none focus:border-sky-700 focus:shadow-outline-sky active:bg-sky-700'>
                      Place Order
                    </button>
                  </div>
                </div>
              </div>
            </form>

            {/* Order summary */}
            <CheckoutSummary />
          </div>
        </div>
      </div>
    </PopupStoreLayout>
  )
}

export default Checkout
