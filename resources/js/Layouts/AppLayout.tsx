import { usePage } from '@inertiajs/inertia-react'
import exp from 'constants'

import { FunctionComponent, ReactNode } from 'react'

import Footer from '@/Components/Footer'
import Navbar from '@/Components/Navbar'

type Props = {
  children: ReactNode
}

const AppLayout: FunctionComponent<Props> = ({ children }) => {
  const { auth } = usePage().props
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default AppLayout
