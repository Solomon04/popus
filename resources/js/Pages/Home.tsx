import {
  profile,
  profile2,
  profile3,
  profile4,
  profile5,
  profile6,
} from '@/static-data'
import {
  ArrowTrendingUpIcon,
  ChevronDownIcon,
  CloudIcon,
  CurrencyDollarIcon,
  ShoppingCartIcon,
} from '@heroicons/react/24/outline'
import { ArrowDownCircleIcon } from '@heroicons/react/24/solid'
import { Link } from '@inertiajs/inertia-react'
import route from 'ziggy-js'

import { FunctionComponent, useState } from 'react'

import Footer from '@/Components/Footer'
import Button from '@/Components/Form/Button'
import Input from '@/Components/Form/Input'
import Navbar from '@/Components/Navbar'
import CTASection from '@/Components/Partials/Home/CTASection'
import FeatureSection from '@/Components/Partials/Home/FeatureSection'
import HeroSection from '@/Components/Partials/Home/HeroSection'
import LivePopupStoresSection from '@/Components/Partials/Home/LivePopupStoresSection'
import PopupExplainerSection from '@/Components/Partials/Home/PopupExplainerSection'
import TestimonialSection from '@/Components/Partials/Home/TestimonialSection'
import PopupStoreCard from '@/Components/PopupStoreCard'

import AppLayout from '@/Layouts/AppLayout'

type Props = {
  stores: App.Models.Store[]
}

const Home: FunctionComponent<Props> = ({ stores }) => {
  // stats, feed,
  return (
    <AppLayout>
      {/*Hero*/}
      <HeroSection />
      {/*Features*/}
      <FeatureSection />
      <LivePopupStoresSection stores={stores} />
      <PopupExplainerSection />
      <TestimonialSection />
      <CTASection />
    </AppLayout>
  )
}
export default Home
