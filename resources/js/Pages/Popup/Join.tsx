import { InertiaProps } from '@/types'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Inertia } from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-react'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import route from 'ziggy-js'

import React, { FormEvent, FunctionComponent, useState } from 'react'
import ImageUploading, { ImageListType } from 'react-images-uploading'
import { ImageType } from 'react-images-uploading/dist/typings'

import LoginForm from '@/Components/Auth/LoginForm'
import RegisterForm from '@/Components/Auth/RegisterForm'
import Button from '@/Components/Form/Button'
import Input from '@/Components/Form/Input'
import Select from '@/Components/Form/Select'
import Textarea from '@/Components/Form/Textarea'
import InputError from '@/Components/InputError'

import AppLayout from '@/Layouts/AppLayout'

dayjs.extend(localizedFormat)
dayjs.extend(relativeTime)

type Props = {
  fundraiser: App.Models.Fundraiser
  form_url: string
}

const Join: FunctionComponent<Props> = ({ fundraiser, form_url }) => {
  const [loading, setLoading] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const { auth } = usePage().props as unknown as InertiaProps
  const [image, setImage] = useState([])
  const [avatar, setAvatar] = useState<ImageType | undefined>()
  const [formErrors, setFormErrors] = useState<any>()

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    console.log(imageList, addUpdateIndex)
    setImage(imageList as never[])
    setAvatar(imageList[0])
  }

  const [description, setDescription] = useState(
    `Please help me raise money for ${fundraiser.name}`
  )

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (avatar) {
      Inertia.post(
        form_url,
        {
          avatar: avatar.dataURL as string,
          description: description,
        },
        {
          onBefore: () => setLoading(true),
          onFinish: () => setLoading(false),
          onError: (errors) => setFormErrors(errors),
        }
      )
    }
  }
  // organizer sends a signed url to join fundraiser

  // participant creates an account or logs into account

  // if user already has a store with this fundraiser, redirect them to their popup store

  // add description / profile picture for store if they don't have one
  return (
    <AppLayout enableFooter={false} loading={loading}>
      <div className='mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 mb-32'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-16'>
          <div className='hidden md:block relative h-64 rounded-lg sm:h-80 lg:order-last lg:h-full'>
            <img
              alt='Baily Torres'
              src='/images/bailey-torres-example.jpeg'
              className='absolute inset-6 h-96 w-64 object-cover rounded-md shadow'
            />
            <img
              alt='Kiana image'
              src='/images/kiana-bosman-example.jpeg'
              className='absolute inset-64 h-96 w-64 object-cover z-10 rounded-md shadow'
            />
          </div>
          {auth.user ? (
            <form onSubmit={handleSubmit}>
              <div className='lg:py-24'>
                <h3 className='text-xs font-semibold tracking-wider uppercase text-gray-600'>
                  Join the {fundraiser.name} fundraiser
                </h3>

                <h2 className='text-3xl font-bold sm:text-4xl mb-3'>
                  You have been invited!
                </h2>
                <p className='my-4 text-gray-600'>
                  {fundraiser.organizer?.first_name} has invited you to their
                  fundraiser from {dayjs(fundraiser.start_date).format('L')} -{' '}
                  {dayjs(fundraiser.end_date).format('L')}
                </p>

                <div className='space-y-5'>
                  <div>
                    <ImageUploading
                      value={image}
                      onChange={onChange}
                      maxNumber={1}>
                      {({
                        imageList,
                        onImageUpload,
                        onImageRemoveAll,
                        onImageUpdate,
                        onImageRemove,
                        isDragging,
                        dragProps,
                      }) => (
                        // write your building UI
                        <div className='mt-1 flex items-center'>
                          {image.length > 0 && avatar ? (
                            <div className='w-full'>
                              <div className='sm:flex items-center justify-between relative'>
                                <div
                                  onClick={() => onImageUpdate(0)}
                                  className='group aspect-w-10 aspect-h-7 block w-full rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100'>
                                  <img
                                    src={avatar.dataURL}
                                    alt=''
                                    className='cursor-pointer object-cover group-hover:opacity-75'
                                  />
                                </div>

                                <button
                                  type='button'
                                  onClick={() => onImageRemove(0)}
                                  className='absolute -top-1 -right-1 flex items-center p-2 bg-red-500 text-white rounded-full hover:bg-red-600'>
                                  <XMarkIcon className='w-6 h-6 text-white' />
                                </button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <span className='inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100'>
                                <svg
                                  className='h-full w-full text-gray-300'
                                  fill='currentColor'
                                  viewBox='0 0 24 24'>
                                  <path d='M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z' />
                                </svg>{' '}
                              </span>
                              <button
                                style={
                                  isDragging ? { color: 'red' } : undefined
                                }
                                type='button'
                                onClick={onImageUpload}
                                {...dragProps}
                                className='ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
                                Upload an Image
                              </button>
                              <span className='text-red-600'>*</span>
                            </>
                          )}
                        </div>
                      )}
                    </ImageUploading>

                    {formErrors && (
                      <InputError
                        message={formErrors.avatar}
                        className='mt-2'
                      />
                    )}
                  </div>

                  <Textarea
                    id='description'
                    label='Tell us about your cause'
                    type='text'
                    required={true}
                    name='description'
                    value={description}
                    maxLength={500}
                    onChange={(e) => setDescription(e.target.value)}
                  />

                  {formErrors && (
                    <InputError
                      message={formErrors.description}
                      className='mt-2'
                    />
                  )}
                </div>

                <div className='mt-5'>
                  <Button
                    type='submit'
                    className='text-white border-gray-700 border-2 px-5 py-3 rounded'
                    processing={!description || !avatar}>
                    Join
                  </Button>
                </div>
              </div>
            </form>
          ) : showLogin ? (
            <LoginForm showRegister={() => setShowLogin(false)} />
          ) : (
            <RegisterForm showLogin={() => setShowLogin(true)} />
          )}
        </div>
      </div>
    </AppLayout>
  )
}

export default Join
