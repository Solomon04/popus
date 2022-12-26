import { classNames } from '@/utils'

import React, { FunctionComponent } from 'react'

type Step = {
  id: number
  name: string
}

type Props = {
  steps: Step[]
  onClick: (step: Step) => void
  currentStep: Step
}

const Steps: FunctionComponent<Props> = ({ onClick, currentStep, steps }) => {
  return (
    <nav className='border-t border-gray-200 pt-10 px-1' aria-label='Progress'>
      <ol role='list' className='space-y-4 md:flex md:space-y-0 md:space-x-8'>
        {steps.map((step) => (
          <li key={step.name} className='md:flex-1'>
            {currentStep.id > step.id ? (
              <button
                type='button'
                onClick={() => onClick(step)}
                className='w-full group flex flex-col border-l-4 border-sky-600 py-2 pl-4 hover:border-sky-800 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0'>
                <span className='text-sm font-medium text-sky-600 group-hover:text-sky-800'>
                  Step {step.id}
                </span>
                <span className='text-sm font-medium'>{step.name}</span>
              </button>
            ) : currentStep.id === step.id ? (
              <button
                type='button'
                onClick={() => onClick(step)}
                className='w-full flex flex-col border-l-4 border-sky-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0'
                aria-current='step'>
                <span className='text-sm font-medium text-sky-600'>
                  Step {step.id}
                </span>
                <span className='text-sm font-medium'>{step.name}</span>
              </button>
            ) : (
              <button
                type='button'
                disabled={true}
                className='w-full group flex flex-col border-l-4 border-gray-200 py-2 pl-4 hover:border-gray-300 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0 cursor-not-allowed'>
                <span className='text-sm font-medium text-gray-500 group-hover:text-gray-700'>
                  Step {step.id}
                </span>
                <span className='text-sm font-medium'>{step.name}</span>
              </button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Steps
