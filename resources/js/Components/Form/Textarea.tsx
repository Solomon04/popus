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
  name?: string
  value?: string | ReadonlyArray<string> | number | undefined
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void
  type: HTMLInputTypeAttribute
  placeholder?: string | undefined
  required?: boolean
  className?: string
  min?: string | number | undefined
  maxLength?: number | undefined
  minLength?: number | undefined
  disabled?: boolean | undefined
  defaultValue?: string | number | ReadonlyArray<string> | undefined
  rows?: number | undefined
}

// The Input component
const Textarea: FunctionComponent<Props> = ({
  value,
  onChange,
  label,
  placeholder,
  id,
  required = false,
  name,
  minLength,
  maxLength,
  disabled = false,
  defaultValue,
  rows = 12,
}) => {
  const input = useRef<HTMLInputElement>()

  useEffect(() => {
    if (input.current) {
      input.current.focus()
    }
  }, [])

  return (
    <label
      htmlFor={id}
      className={`text-xs sm:text-base relative block overflow-hidden rounded-input border border-gray-200 px-3 pt-6 shadow-sm focus-within:border-gray-500 focus-within:ring-1 focus-within:ring-gray-500 bg-white ${
        disabled && 'bg-gray-200 cursor-not-allowed'
      }`}>
      <textarea
        className={`text-xs sm:text-sm peer h-24 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm ${
          disabled && 'cursor-not-allowed'
        }`}
        id={id}
        name={name}
        required={required}
        onChange={onChange}
        value={value}
        placeholder={placeholder ?? label}
        maxLength={maxLength}
        minLength={minLength}
        disabled={disabled}
        defaultValue={defaultValue}
        rows={rows}
      />
      <span className='absolute left-3 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs capitalize'>
        {label.toString()}
        {required ? <span className='text-red-600'>*</span> : ''}
      </span>
    </label>
  )
}

export default Textarea
