import { useActor } from '@xstate/react'
import React, { ReactNode } from 'react'
import { compareMachine } from '../Services/CompareRecordingMachine'

interface CompareColumnProps {
  side: "LEFT" | "RIGHT"
  title: string
  date: string
  children: ReactNode
}

export const CompareColumn = ({ side, title, date, children }: CompareColumnProps) => {
  const [compareState, send] = useActor(compareMachine)

  return (
    <div className=''>
      <div className='flex flex-row'>
        <div className={`ml-1 pl-4 pb-4 pt-2 ${side === "LEFT" ? "bg-desaturated-green" : "bg-desaturated-blue"} w-60 rounded-t-md `}>
          <div className='text-lg'>{title}</div>
          <div className='text-sm text-primary-grey'>{date}</div>
        </div>
        {
          (side === "LEFT" && compareState.context.leftRecording || side === "RIGHT" && compareState.context.rightRecording) ?
            <div
              className='flex flex-row flex-1 justify-end bg-white cursor-pointer'
              onClick={() => {
                if (compareState.matches("set_left") || compareState.matches("set_right")) {
                  send({ type: "CLEAR" })
                }
                if (compareState.matches("full")) {
                  send({ type: `CLEAR_${side}` })
                }
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div> : null
        }
      </div>
      <div className='flex flex-1 border-2 border-desaturated-grey rounded-md p-2 pb-5'>
        {children ? children :
          <div className='mt-3 ml-4 text-primary-grey'>
            {side === "LEFT" ? "First " : ""}
            {side === "RIGHT" ? "Second " : ""}
            select a recording on the left to display here
          </div>
        }
      </div>
    </div>
  )
}
