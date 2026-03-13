import React, { ComponentProps, ReactNode } from 'react'

type SectionTwoProps = {
  children: ReactNode[]
}

export const SectionTwo = ({ children }: SectionTwoProps) => {
  return (
    <div className='flex-1 inline-flex flex-wrap mr-2'>
      <div className='w-full sm:w-full md:w-full lg:w-3/6 pr-2'>
        {children[0]}
      </div>
      <div className='w-full sm:w-full md:w-full lg:w-3/6'>
        {children[1]}
      </div>
    </div>
  )
}
