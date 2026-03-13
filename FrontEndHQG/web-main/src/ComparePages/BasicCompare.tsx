import { useActor } from '@xstate/react'
import { compareMachine } from '../Services/CompareRecordingMachine'

import React from 'react'

export const BasicCompare = () => {
  const [compareState, send] = useActor(compareMachine)

  return (
    <div className=' mt-28 '>
      <div>{compareMachine.state.value.toString()}</div>
      <div className='flex flex-row gap-2'>
        <pre className='flex flex-1 border-2 border-desaturated-grey'>
          {JSON.stringify(compareState.context.leftRecording, null, 2)}
        </pre>
        <pre className='flex flex-1 border-2 border-desaturated-grey'>
          {JSON.stringify(compareState.context.rightRecording, null, 2)}
        </pre>
      </div>
      <pre>{JSON.stringify(compareState, null, 2)}</pre>
    </div>
  )
}
