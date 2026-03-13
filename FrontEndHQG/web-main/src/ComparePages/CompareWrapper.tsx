import { Navigate, useMatch, useNavigate } from '@tanstack/react-location'
import { useActor } from '@xstate/react'
import { ReactNode, useEffect } from 'react'
import { LocationGenerics } from '../Router/CustomRouter'
import { compareMachine } from '../Services/CompareRecordingMachine'

interface CompareWrapperProps {
  children: [ReactNode, ReactNode]
}

export const CompareWrapper = ({ children }: CompareWrapperProps) => {
  const [compareState, send] = useActor(compareMachine)


  if (compareState.matches("notstarted")) {
    send("START")
  }

  return (
    <div className=' flex  m-5 mt-28 '>
      {/* {compareState.value.toString()} */}
      <div className='flex flex-1 flex-row gap-5'>
        <div className='flex-1'>
          {children[0]}
        </div>
        <div className='flex-1'>
          {children[1]}
        </div>
      </div>
    </div>
  )
}
