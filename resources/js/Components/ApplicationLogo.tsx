import { FunctionComponent } from 'react'

type Props = {
  className: string
}
const ApplicationLogo: FunctionComponent<Props> = ({ className }) => {
  return <img src='/popus-text-logo.png' className={className} alt='logo' />
}

export default ApplicationLogo
