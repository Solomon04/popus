import { Head, Link, useForm } from '@inertiajs/inertia-react'
import route from 'ziggy-js'

import React, { useEffect } from 'react'

import Checkbox from '@/Components/Checkbox'
import Button from '@/Components/Form/Button'
import Input from '@/Components/Form/Input'
import InputError from '@/Components/InputError'

import GuestLayout from '@/Layouts/GuestLayout'

export default function Login({ status, canResetPassword }: any) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: '',
  })

  useEffect(() => {
    return () => {
      reset('password')
    }
  }, [])

  const onHandleChange = (event: any) => {
    setData(
      event.target.name,
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value
    )
  }

  const submit = (e: any) => {
    e.preventDefault()

    post(route('login'))
  }

  return (
    <GuestLayout>
      <Head title='Log in' />

      {status && (
        <div className='mb-4 font-medium text-sm text-green-600'>{status}</div>
      )}

      <form onSubmit={submit}>
        <div>
          <Input
            id='email'
            title='Email'
            type={data.password}
            className='mt-1 block w-full'
            onChange={onHandleChange}
          />

          <InputError message={errors.email} className='mt-2' />
        </div>

        <div className='mt-4'>
          <Input
            id='password'
            title='Password'
            type={data.password}
            className='mt-1 block w-full'
            onChange={onHandleChange}
          />

          <InputError message={errors.password} className='mt-2' />
        </div>

        <div className='block mt-4'>
          <label className='flex items-center'>
            <Checkbox
              name='remember'
              value={data.remember}
              handleChange={onHandleChange}
            />

            <span className='ml-2 text-sm text-gray-600'>Remember me</span>
          </label>
        </div>

        <div className='flex items-center justify-end mt-4'>
          {canResetPassword && (
            <Link
              href={route('password.request')}
              className='underline text-sm text-gray-600 hover:text-gray-900'>
              Forgot your password?
            </Link>
          )}

          <Button type='submit' className='ml-4' processing={processing}>
            Submit
          </Button>
        </div>
      </form>
    </GuestLayout>
  )
}
