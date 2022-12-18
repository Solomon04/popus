import { FunctionComponent } from 'react'

type Props = {
  profile: any
}

const Jumbotron: FunctionComponent<Props> = ({ profile }) => {
  return (
    <div className='grid grid-cols-1 rounded-md bg-gray-50 md:grid-cols-3 md:gap-5 md:p-12'>
      <div className='md:order-2'>
        <img
          src='https://cdn1.sportngin.com/attachments/photo/ee0f-121282811/Matthew_Hurt_large.JPG'
          className='max-w-96 h-auto rounded-md'
        />
      </div>
      <div className='col-span-2 p-5 md:order-1 md:p-0'>
        <h3 className='text-gray-600 md:text-xl'>{profile.fundraiser}</h3>
        <h1 className='mb-3 text-3xl font-semibold text-gray-900 md:mb-8 md:text-4xl lg:text-5xl'>
          {profile.name} Pop-Up Store
        </h1>
        <p className='mb-5 leading-relaxed text-gray-900 md:text-xl'>
          {profile.description}
        </p>
        <p className='mb-8 leading-relaxed text-gray-900 md:text-xl'>
          50% of each purchase benefits this fundraiser.
        </p>
        <div className='mb-5 w-full rounded-full bg-gray-200'>
          <div
            className='rounded-l-full bg-green-600 p-0.5 text-center text-xs font-medium leading-none text-green-100'
            style={{ width: `${(profile.total / profile.goal) * 100}%` }}>
            ${profile.total}
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <h3 className='text-gray-700'>
            <span className='text-2xl font-semibold text-gray-900'>
              ${profile.total}
            </span>{' '}
            sold of ${profile.goal} goal
          </h3>
          <h3 className='text-gray-700'>{profile.timeLeft}</h3>
        </div>
      </div>
    </div>
  )
}

export default Jumbotron
