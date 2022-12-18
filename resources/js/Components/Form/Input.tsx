import React, {
  ChangeEvent,
  FunctionComponent,
  HTMLInputTypeAttribute,
  useEffect,
  useRef,
} from 'react'

type Props = {
  id: string
  title: string
  value?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  type: HTMLInputTypeAttribute
  placeholder?: string | undefined
  required?: boolean
  className?: string
}

// The Input component
const Input: FunctionComponent<Props> = ({
  value,
  onChange,
  type = 'text',
  title,
  placeholder,
  id,
  required = false,
}) => {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    console.log(e.target.value)
    return e.target.value
  }

  const input = useRef<HTMLInputElement>()

  useEffect(() => {
    if (input.current) {
      input.current.focus()
    }
  }, [])

  return (
    <label
      htmlFor={id}
      className='relative block overflow-hidden rounded-input border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-gray-500 focus-within:ring-1 focus-within:ring-gray-500 bg-white'>
      <input
        className='peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm'
        type={type}
        id={id}
        required={required}
        onChange={onChange}
        value={value}
        placeholder={title}
      />
      <span className='absolute left-3 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs capitalize'>
        {title.toString()}
        {required ? <span className='text-red-600'>*</span> : ''}
      </span>
    </label>
  )
}

export default Input
