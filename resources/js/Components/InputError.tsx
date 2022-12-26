import { FunctionComponent } from 'react'

type Props = {
  message: string
  className: string
}
const InputError: FunctionComponent<Props> = ({ message, className }) => {
  return message ? (
    <p className={'text-sm text-red-600 ' + className}>{message}</p>
  ) : null
}

export default InputError
