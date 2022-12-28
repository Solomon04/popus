import CartContext, { CartContextProps } from '@/Context/CartContext'
import { Inertia } from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import Cookies from 'js-cookie'
import _ from 'lodash'
import route from 'ziggy-js'

import {
  FunctionComponent,
  PropsWithChildren,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react'
import LoadingOverlay from 'react-loading-overlay-ts'

import Footer from '@/Components/Footer'
import Navbar from '@/Components/Navbar'

import AppLayout from '@/Layouts/AppLayout'

// const stripePromise = loadStripe('pk_test_Jp3kv7BJibBz4ANCtbTISq6q00V7NZXMcQ')

type Props = {
  store: App.Models.Store
  loading?: boolean
}

const PopupStoreLayout: FunctionComponent<PropsWithChildren<Props>> = ({
  children,
  store,
  loading = false,
}) => {
  return (
    <LoadingOverlay active={loading} spinner text='Loading your cart...'>
      <AppLayout>{children}</AppLayout>
    </LoadingOverlay>
  )
}

export default PopupStoreLayout
