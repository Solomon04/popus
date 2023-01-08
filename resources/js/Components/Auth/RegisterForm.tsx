import { formatPhoneNumberWhileTyping } from '@/utils'
import { Inertia } from '@inertiajs/inertia'
import route from 'ziggy-js'

import React, { FormEvent, FunctionComponent, useState } from 'react'

import Button from '@/Components/Form/Button'
import Input from '@/Components/Form/Input'
import InputError from '@/Components/InputError'

type Props = {
  showLogin: () => void
}

const RegisterForm: FunctionComponent<Props> = ({ showLogin }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<any>()

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    Inertia.post(
      route('register'),
      {
        name,
        email,
        phone,
        password,
        redirect_url: route('create.fundraiser'),
      },
      {
        onError: (e) => setErrors(e),
      }
    )
  }

  return (
    <form onSubmit={handleRegister}>
      <div className='lg:py-24'>
        <h2 className='text-3xl font-bold sm:text-4xl mb-3'>
          Create an account
        </h2>
        <div>
          <p className='my-4 text-gray-600'>
            In order to create a fundraiser, we need you to setup an account.
          </p>
          <button
            type='button'
            className='text-sm text-sky-500 hover:underline'
            onClick={showLogin}>
            Click here if you already have an account.
          </button>
        </div>

        <div className='mt-3'>
          <Input
            id='name'
            name='name'
            label='Name'
            type='text'
            required={true}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {errors && <InputError message={errors.name} className='mt-2' />}
        </div>

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
            id='phone'
            name='phone'
            label='Phone Number'
            type='tel'
            required={true}
            value={phone}
            onChange={(e) =>
              setPhone(formatPhoneNumberWhileTyping(e) as string)
            }
          />

          {errors && <InputError message={errors.phone} className='mt-2' />}
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
            Register
          </Button>
        </div>
      </div>
    </form>
  )
}

export default RegisterForm
