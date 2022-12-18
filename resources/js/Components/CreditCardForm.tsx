import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js'
import { StripeCardNumberElement } from '@stripe/stripe-js'

import React, { FunctionComponent } from 'react'

const CreditCardForm: FunctionComponent = () => {
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // Prevent the default form submission behavior
    event.preventDefault()

    if (!elements || !stripe) {
      throw new Error()
    }

    // Retrieve the credit card details from the Stripe.js library
    if (elements && stripe) {
      const cvc = elements.getElement(CardExpiryElement)
      const cardNumberElement = elements.getElement(CardNumberElement)
      const cardExpiryElement = elements.getElement(CardExpiryElement)
      const cardElement = elements.getElement(CardNumberElement)
      console.log(cardElement)

      const { token, error } = await stripe.createToken(
        cardNumberElement as StripeCardNumberElement,
        {
          name: 'Solomon',
        }
      )

      if (error) {
        // Show an error message to the user if there is a problem
        console.error(error)
      } else {
        // Otherwise, send the payment method information to your server
        // to create a charge or save the payment method for future use
        console.log('Token:', token)
      }
    }
  }
  return (
    <form onSubmit={handleSubmit}>
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
      {/* Submit button */}
      <div className='mt-6'>
        <button
          type='submit'
          className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700'>
          Save Card
        </button>
      </div>
    </form>
  )
}

export default CreditCardForm
