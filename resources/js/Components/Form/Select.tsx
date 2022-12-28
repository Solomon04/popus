import React, {
  ChangeEvent,
  FunctionComponent,
  HTMLInputTypeAttribute,
  useEffect,
  useRef,
} from 'react'

type Props = {
  id: string
  label: string
  value?: string
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void
  placeholder: string
  required?: boolean
  className?: string
  options: Option[]
}

type Option = {
  name: string | number
  value?: string | number
}

const Select: FunctionComponent<Props> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  required = false,
  options = [],
}) => {
  const input = useRef<HTMLSelectElement>()

  useEffect(() => {
    if (input.current) {
      input.current.focus()
    }
  }, [])

  return (
    <label
      htmlFor={id}
      className='relative block overflow-hidden rounded-input border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-gray-500 focus-within:ring-1 focus-within:ring-gray-500 bg-white'>
      <select
        className='peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm placeholder-gray-400'
        id={id}
        required={required}
        onChange={onChange}
        value={value}
        placeholder={label ?? placeholder}>
        <option disabled={true} selected={true}>
          {placeholder}
        </option>
        {options.map((option) => (
          <option
            key={option.value ?? option.name}
            value={option.value ?? option.name}>
            {option.name}
          </option>
        ))}
      </select>
      <span className='absolute left-3 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs capitalize'>
        {label.toString()}
        {required ? <span className='text-red-600'>*</span> : ''}
      </span>
    </label>
  )
}

export default Select
