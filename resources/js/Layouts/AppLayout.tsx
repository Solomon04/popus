import { InertiaProps } from '@/types'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { usePage } from '@inertiajs/inertia-react'

import { Fragment, useState } from 'react'
import { FunctionComponent, ReactNode } from 'react'
import LoadingOverlay from 'react-loading-overlay-ts'
import { ToastContainer } from 'react-toastify'

import Footer from '@/Components/Footer'
import Navbar from '@/Components/Navbar'

type Props = {
  children: ReactNode
  enableFooter?: boolean
  enableNavbar?: boolean
  loading?: boolean
}

const AppLayout: FunctionComponent<Props> = ({
  children,
  enableFooter = true,
  loading = false,
}) => {
  const { auth } = usePage().props as unknown as InertiaProps
  return (
    <LoadingOverlay active={loading} spinner text='Loading...'>
      <Navbar user={auth.user} />
      <main>{children}</main>
      {enableFooter && <Footer />}
    </LoadingOverlay>
  )
}

export default AppLayout
