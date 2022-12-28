import { InertiaProps } from '@/types'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { usePage } from '@inertiajs/inertia-react'

import { Fragment, useState } from 'react'
import { FunctionComponent, ReactNode } from 'react'

import Footer from '@/Components/Footer'
import Navbar from '@/Components/Navbar'

type Props = {
  children: ReactNode
  enableFooter?: boolean
  enableNavbar?: boolean
}

const AppLayout: FunctionComponent<Props> = ({
  children,
  enableFooter = true,
}) => {
  const { auth } = usePage().props as unknown as InertiaProps
  return (
    <>
      <Navbar user={auth.user} />
      <main>{children}</main>
      {enableFooter && <Footer />}
    </>
  )
}

export default AppLayout
