import { FunctionComponent } from 'react'

type Props = {
  name: string
  value: string
  handleChange: any
}
const Checkbox: FunctionComponent<Props> = ({ name, value, handleChange }) => {
  return (
    <input
      type='checkbox'
      name={name}
      value={value}
      className='rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
      onChange={(e) => handleChange(e)}
    />
  )
}

export default Checkbox
