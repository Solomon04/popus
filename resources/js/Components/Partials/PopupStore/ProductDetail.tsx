import CartContext from '@/Context/CartContext'
import { classNames } from '@/utils'
import { RadioGroup } from '@headlessui/react'

import { FunctionComponent, useContext, useState } from 'react'

type Props = {
  product: App.Models.Product
  onSelectedQuantity: (quantity: number) => void
}

const sizes = [
  {
    label: '2 Pack',
    value: 2,
  },
  {
    label: '3 Pack',
    value: 3,
  },
  {
    label: '6 Pack',
    value: 6,
  },
]

const ProductDetail: FunctionComponent<Props> = ({
  product,
  onSelectedQuantity,
}) => {
  const [selectedSize, setSelectedSize] = useState(sizes[0])
  const addToCart = () => {
    // if (add) {
    //   // add(product, selectedSize.value)
    // }
    onSelectedQuantity(selectedSize.value)
  }

  return (
    <div className='grid w-full grid-cols-1 items-center gap-y-8 gap-x-6 sm:grid-cols-12 lg:gap-x-8'>
      <div className='aspect-w-2 aspect-h-3 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5'>
        <img
          src={product.image}
          alt={product.title}
          className='object-cover object-center'
        />
      </div>
      <div className='sm:col-span-8 lg:col-span-7'>
        <h2 className='text-2xl font-bold text-gray-900 sm:pr-12'>
          {product.title}
        </h2>

        <section aria-labelledby='information-heading' className='mt-2'>
          <h3 id='information-heading' className='sr-only'>
            Product information
          </h3>

          <p className='text-2xl text-gray-900'>${product.price}</p>
        </section>

        <section aria-labelledby='description-heading' className='mt-5'>
          <h4 className='text-sm font-medium text-gray-900'>Description</h4>
          <article
            className='prose'
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </section>

        <section aria-labelledby='options-heading' className='mt-10'>
          <h3 id='options-heading' className='sr-only'>
            Product options
          </h3>

          <div>
            {/* Sizes */}
            <div className='mt-10'>
              <div className='flex items-center justify-between mb-3'>
                <h4 className='text-sm font-medium text-gray-900'>Size</h4>
              </div>

              <RadioGroup value={selectedSize} onChange={setSelectedSize}>
                <RadioGroup.Label className='sr-only'>
                  {' '}
                  Product size{' '}
                </RadioGroup.Label>
                <div className='space-y-4'>
                  {sizes.map((quantity) => (
                    <RadioGroup.Option
                      key={quantity.label}
                      value={quantity}
                      className={({ checked, active }) =>
                        classNames(
                          checked ? 'border-transparent' : 'border-gray-300',
                          active ? 'border-gray-900 ring-2 ring-gray-900' : '',
                          'relative block cursor-pointer rounded-lg border bg-white px-6 py-4 shadow-sm focus:outline-none sm:flex sm:justify-between'
                        )
                      }>
                      {({ active, checked }) => (
                        <>
                          <span className='flex items-center'>
                            <span className='flex flex-col text-sm'>
                              <RadioGroup.Label
                                as='span'
                                className='font-medium text-gray-900'>
                                {quantity.label}
                              </RadioGroup.Label>
                            </span>
                          </span>
                          <RadioGroup.Description
                            as='span'
                            className='mt-2 flex text-sm sm:mt-0 sm:ml-4 sm:flex-col sm:text-right'>
                            <span className='font-medium text-gray-900'>
                              $
                              {Number(quantity.value * product.price).toFixed(
                                2
                              )}
                            </span>
                          </RadioGroup.Description>
                          <span
                            className={classNames(
                              active ? 'border' : 'border-2',
                              checked
                                ? 'border-gray-900'
                                : 'border-transparent',
                              'pointer-events-none absolute -inset-px rounded-lg'
                            )}
                            aria-hidden='true'
                          />
                        </>
                      )}
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <button
              onClick={addToCart}
              className='mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-900 py-3 px-8 text-base font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'>
              Add to bag
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default ProductDetail
