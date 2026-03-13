import { Link } from '@tanstack/react-location'
import React from 'react'
import { Book } from '../../Common/icons/Book'

export const QuestionnairesQuestionSets = () => {
  return (
    <div className=''>
      {/* <div className='mt-8 ml-8 text-2xl'>Questionnaires and Question Sets</div> */}
      <div className='flex flex-row justify-center h-[800px] items-center gap-4'>
        <Link to={`questionnaires`} className='basis-1/2 md:basis-1/2 lg:basis-1/4 '>
          <div className='  rounded-lg shadow-md '>
            <div className=' flex flex-row justify-center items-center h-36 gradient-background rounded-md text-white '>
              <div className='flex flex-row justify-center items-center w-24 h-24 bg-white rounded-full bg-opacity-10 '>
                <Book solid={false} />
              </div>
            </div>
            <div className='p-4'>
              <div className='text-lg text-center'>{"Full Questionnaires"}</div>
            </div>
          </div>
        </Link>
        <Link to={`questionsets`} className='basis-1/2 md:basis-1/2 lg:basis-1/4'>
          <div className=' rounded-lg shadow-md '>
            <div className=' flex flex-row justify-center items-center h-36 gradient-background rounded-md text-white '>
              <div className='flex flex-row justify-center items-center w-24 h-24 bg-white rounded-full bg-opacity-10 '>
                <Book solid={false} />
              </div>
            </div>
            <div className='p-4'>
              <div className='text-lg text-center'>{"Question Sets"}</div>
            </div>
          </div>
        </Link>

      </div>

    </div>
  )
}
