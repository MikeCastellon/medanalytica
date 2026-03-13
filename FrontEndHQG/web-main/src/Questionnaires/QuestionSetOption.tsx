import React from 'react'
import { answer } from './QuestionSetLayout'

type QuestionSetOptionProps = {
  onClick?: () => void
  option: any
  active: boolean
}

export const QuestionSetOption = ({ option, active, onClick }: QuestionSetOptionProps) => {
  return (
    <div className={`flex flex-col items-center  ${onClick ? 'cursor-pointer' : null}`}
      onClick={() => onClick && onClick()}
    >
      <div className={`flex flex-col justify-center items-center w-8 h-8 border-2 border-primary-green rounded-full ${onClick ? 'hover:bg-primary-green' : null}  `}>
        {
          active ?
            <div className='w-6 h-6 bg-primary-green rounded-full'></div> : null}
      </div>
      <div className='text-sm text-primary-grey mt-2'>{option?.title}</div>
    </div>
  )
}


