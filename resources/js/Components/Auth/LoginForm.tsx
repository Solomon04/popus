import { activities } from '@/static-data'
import { Inertia } from '@inertiajs/inertia'
import route from 'ziggy-js'

import React, { FormEvent, FunctionComponent, useMemo, useState } from 'react'

import Button from '@/Components/Form/Button'
import Input from '@/Components/Form/Input'
import InputError from '@/Components/InputError'

type Props = {
  showRegister: () => void
}

const LoginForm: FunctionComponent<Props> = ({ showRegister }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<any>()

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    Inertia.post(
      route('login'),
      {
        email,
        password,
        redirect_url: route('create.fundraiser'),
      },
      {
        onError: (e) => setErrors(e),
      }
    )
  }
  return (
    <form onSubmit={handleLogin}>
      <div className='lg:py-24'>
        <h2 className='text-3xl font-bold sm:text-4xl mb-3'>
          Login into account
        </h2>
        <p className='my-4 text-gray-600'>
          In order to create a fundraiser, we need you to login to your account.
        </p>
        <div className='mt-3'>
          <Input
            id='email'
            name='email'
            label='Email Address'
            type='email'
            required={true}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors && <InputError message={errors.email} className='mt-2' />}
        </div>

        <div className='mt-3'>
          <Input
            id='password'
            name='password'
            label='Password'
            type='password'
            required={true}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors && <InputError message={errors.password} className='mt-2' />}
        </div>

        <div className='mt-5 flex items-center justify-between'>
          <Button
            type='submit'
            className='text-white border-gray-700 border-2 px-5 py-3 rounded'
            processing={false}>
            Login
          </Button>

          <button
            type='button'
            className='text-sm text-sky-500 hover:underline'
            onClick={showRegister}>
            Don't have an account?
          </button>
        </div>
      </div>
    </form>
  )
}

export default LoginForm
