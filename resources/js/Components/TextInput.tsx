import React, {
  FunctionComponent,
  PropsWithChildren,
  useEffect,
  useRef,
} from 'react'

type Props = PropsWithChildren<{
  type: string
  name: string
  value: any
  isFocused: boolean
  handleChange: any
  required: boolean
  autoComplete: any
  className: string
}>

const TextInput: FunctionComponent<Props> = ({
  type = 'text',
  name,
  value,
  className,
  autoComplete,
  required,
  isFocused,
  handleChange,
}) => {
  const input = useRef()

  useEffect(() => {
    if (isFocused) {
      // @ts-ignore
      input.current.focus()
    }
  }, [])

  return (
    <div className='flex flex-col items-start'>
      <input
        type={type}
        name={name}
        value={value}
        className={
          `border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm ` +
          className
        }
        ref={input}
        autoComplete={autoComplete}
        required={required}
        onChange={(e) => handleChange(e)}
      />
    </div>
  )
}

export default TextInput
