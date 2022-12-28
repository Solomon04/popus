import { Head, Link, useForm } from '@inertiajs/inertia-react'
import route from 'ziggy-js'

import React, { useEffect } from 'react'

import Checkbox from '@/Components/Checkbox'
import Button from '@/Components/Form/Button'
import Input from '@/Components/Form/Input'
import InputError from '@/Components/InputError'

import GuestLayout from '@/Layouts/GuestLayout'

type Props = {
  status: string
  canResetPassword: boolean
}

// const Login = () => {
//   const { data, setData, post, processing, errors, reset } = useForm({
//     email: '',
//     password: '',
//     remember: '',
//   })
//   const [email, setEmail]
//
//   useEffect(() => {
//     return () => {
//       reset('password')
//     }
//   }, [])
//
//
//
//   return (
//     <></>
//   )
// }
//
// export default Login

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

  const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData(
      // @ts-ignore
      event.target.name,
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value
    )
  }

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    console.log(data)

    post(route('login'))
  }

  return (
    <GuestLayout>
      <Head label='Log in' />

      {status && (
        <div className='mb-4 font-medium text-sm text-green-600'>{status}</div>
      )}

      <form onSubmit={submit}>
        <div>
          <Input
            id='email'
            name='email'
            label='Email'
            type={'email'}
            className='mt-1 block w-full'
            onChange={onHandleChange}
          />

          <InputError message={errors.email} className='mt-2' />
        </div>

        <div className='mt-4'>
          <Input
            id='password'
            name='password'
            label='Password'
            type={'password'}
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
