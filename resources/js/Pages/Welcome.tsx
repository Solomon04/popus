import React from 'react';
import { Link, Head } from '@inertiajs/inertia-react';
import route from "ziggy-js";
import CreditCardForm from '@/Components/CreditCardForm'
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_Jp3kv7BJibBz4ANCtbTISq6q00V7NZXMcQ');

export default function Welcome(props: any) {
    return (
        <Elements stripe={stripePromise}>
            <CreditCardForm/>
        </Elements>
    )
}
