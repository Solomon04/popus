import { Head, Link } from '@inertiajs/inertia-react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import route from 'ziggy-js'

import React from 'react'

import CreditCardForm from '@/Components/CreditCardForm'

const stripePromise = loadStripe('pk_test_Jp3kv7BJibBz4ANCtbTISq6q00V7NZXMcQ')

export default function Welcome(props: any) {
  return (
    <Elements stripe={stripePromise}>
      <CreditCardForm />
    </Elements>
  )
}
