import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { Link } from '@inertiajs/inertia-react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import route from 'ziggy-js'

import { FunctionComponent, useRef } from 'react'
// @ts-ignore
import Slider from 'react-slick'

import Button from '@/Components/Form/Button'
import PopupStoreCard from '@/Components/PopupStoreCard'

dayjs.extend(relativeTime)

type Props = {
  stores: App.Models.Store[]
}

const LivePopupStoresSection: FunctionComponent<Props> = ({ stores }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 940,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 540,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }
  const sliderRef = useRef()

  const nextSlide = () => {
    if (sliderRef) {
      // @ts-ignore
      sliderRef.current.slickNext()
    }
  }

  const previousSlide = () => {
    if (sliderRef) {
      // @ts-ignore
      sliderRef.current.slickPrev()
    }
  }

  return (
    <section className='bg-offwhite px-4 pb-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:pb-20'>
      <div className='mx-auto max-w-7xl'>
        <div className='py-12'>
          <h1 className='mb-8 mt-2 text-2xl text-center font-extrabold leading-none tracking-normal text-gray-900 md:text-4xl md:tracking-tight'>
            Active popup stores
          </h1>

          {/*@ts-ignore*/}
          <Slider {...settings} ref={sliderRef}>
            {stores.map((store) => (
              <Link href={route('popup.store', [store.uuid])} key={store.uuid}>
                <div className='w-64 mx-auto border-2 bg-white rounded-md shadow-xl'>
                  <div className='aspect-w-12 aspect-h-12'>
                    <img
                      src={store.user?.avatar as string}
                      className='pointer-events-none object-cover'
                      alt={`${store.user?.first_name} image`}
                    />
                  </div>
                  <div className='mt-3 px-4 py-2'>
                    <h2 className='text-gray-900 font-bold text-lg tracking-wide'>
                      {store.user?.full_name}
                    </h2>
                    <p className='text-rose-500 font-semibold mt-2'>
                      ends {dayjs(store.fundraiser?.end_date).fromNow()}
                    </p>
                    <div className='h-1 w-full bg-black mt-2 rounded-full'>
                      <div
                        className='rounded-l-full bg-green-600 p-0.5 text-center text-xs font-medium leading-none text-green-100'
                        style={{
                          width: `${
                            (store.progress.current / store.progress.goal) * 100
                          }%`,
                        }}
                      />
                    </div>
                    <div className='mt-3 text-black text-sm'>
                      <span className='text-gray-600'>Raised: </span>
                      <span className='font-bold text-emerald-600'>
                        ${parseInt(store.progress.current)}
                      </span>{' '}
                      / ${store.progress.goal}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </Slider>

          <div className='max-w-md mx-auto flex items-center justify-center space-x-3 mt-4 md:mt-8 lg:mt-12'>
            <Button
              type='button'
              className='text-white border-gray-700 border-2'
              processing={false}
              onClick={previousSlide}>
              <ChevronLeftIcon className='text-white w-5 h-5' />
            </Button>

            <Button
              type='button'
              className='text-white border-gray-700 border-2'
              processing={false}
              onClick={nextSlide}>
              <ChevronRightIcon className='text-white w-5 h-5' />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LivePopupStoresSection
