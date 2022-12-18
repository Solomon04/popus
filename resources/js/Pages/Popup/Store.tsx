import CartContext, { CartContextProps } from '@/Context/CartContext'
import { leaderboard, products, profile, supporters } from '@/static-data'
import _ from 'lodash'

import { FunctionComponent, useState } from 'react'

import Navbar from '@/Components/Navbar'
import Cart from '@/Components/Partials/PopupStore/Cart'
import Jumbotron from '@/Components/Partials/PopupStore/Jumbotron'
import Leaderboard from '@/Components/Partials/PopupStore/Leaderboard'
import ProductList from '@/Components/Partials/PopupStore/ProductList'
import Supporters from '@/Components/Partials/PopupStore/Supporters'

import PopupStoreLayout from '@/Layouts/PopupStoreLayout'

type Props = {
  products: App.Models.Product[]
}

const Store: FunctionComponent<Props> = ({ products }) => {
  return (
    <PopupStoreLayout>
      <div className='max-w-7xl mx-auto py-4'>
        {/* Profile Jumbotron */}
        <Jumbotron profile={profile} />
        <div className='grid grid-cols-1 rounded-md md:grid-cols-3 md:gap-8 md:p-12'>
          {/* Product List */}
          <ProductList products={products} />

          <div className='col-span-1 p-5 md:p-0'>
            {/* Leaderboard List + Leaderboard Slideover */}
            <Leaderboard leaderboard={leaderboard} />
            {/* Supporters List + Support Slideover */}
            <Supporters supporters={supporters} />
          </div>
        </div>
      </div>

      <Cart />
    </PopupStoreLayout>
  )
}

export default Store
