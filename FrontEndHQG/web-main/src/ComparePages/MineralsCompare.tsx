import { useActor } from '@xstate/react'
import { format } from 'date-fns'
import React from 'react'
import { HormonesBarCollection } from '../Common/Compositions/HormonesBarCollection'
import { MineralBarCollection } from '../Common/Compositions/MineralBarCollection'
import { Heart_Data } from '../generated/graphql'
import { compareMachine } from '../Services/CompareRecordingMachine'
import { CompareColumn } from './CompareColumn'
import { CompareWrapper } from './CompareWrapper'

export const MineralsCompare = () => {
  const [compareState, send] = useActor(compareMachine)


  const left = compareState.context.leftRecording
  const right = compareState.context.rightRecording

  return (
    <CompareWrapper>
      <CompareColumn side="LEFT" title={left?.title} date={left ? format(new Date(left?.created_on), 'dd MMM yyyy  kk:mm') : ''}>
        {
          left ?
            <MineralsCompareComposition currentRecording={left} />
            : null}
      </CompareColumn>
      <CompareColumn side="RIGHT" title={right?.title} date={right ? format(new Date(compareState.context.rightRecording.created_on), 'dd MMM yyyy  kk:mm') : ""}>
        {
          right ?
            <MineralsCompareComposition currentRecording={right} />
            : null}
      </CompareColumn>
    </CompareWrapper>

  )
}

interface MineralsCompareCompositionProps {
  currentRecording: Heart_Data
}

const MineralsCompareComposition = ({ currentRecording }: MineralsCompareCompositionProps) => {
  return (
    <div className='flex-1'>
      <div className='mt-8'>
        <MineralBarCollection
          k={currentRecording?.data?.minerals.k}
          na={currentRecording?.data?.minerals.na}
          mg={currentRecording?.data?.minerals.mg}
          ca={currentRecording?.data?.minerals.ca} />
      </div>
      <div className='mt-8 '>
        <HormonesBarCollection
          inflamIndex={currentRecording?.data.inflamIndex}
          cortisol={currentRecording?.data?.hormones?.cortisol}
          dhea={currentRecording?.data?.hormones?.dhea}
          estradiol={currentRecording?.data?.hormones?.estradiol}
          pregnenolone={currentRecording?.data?.hormones?.pregnenolone}
          insulin={currentRecording?.data?.hormones?.insulin}
          t3_t4={currentRecording?.data?.hormones?.t3_t4}
          tfi={currentRecording?.data?.tfi} />
      </div>
    </div>
  )
}