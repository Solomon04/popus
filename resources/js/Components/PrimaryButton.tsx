import { FunctionComponent, PropsWithChildren, ReactNode } from 'react'

type Props = PropsWithChildren<{
  type: 'button' | 'submit' | 'reset'
  className: string
  processing: boolean
  children: ReactNode
}>

const PrimaryButton: FunctionComponent<Props> = ({
  type = 'submit',
  className = '',
  processing,
  children,
}) => {
  return (
    <button
      type={type}
      className={
        `inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150 ${
          processing && 'opacity-25'
        } ` + className
      }
      disabled={processing}>
      {children}
    </button>
  )
}

export default PrimaryButton
