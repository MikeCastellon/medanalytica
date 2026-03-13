import { useActor } from '@xstate/react'
import { format } from 'date-fns'
import React from 'react'
import { TotalPowerBar } from '../Common/Compositions/TotalPowerBar'
import { FiveElementsDiagram } from '../Common/graphs/FiveElements/FiveElementsDiagram'
import { Meridians } from '../Common/graphs/Meridians'
import { BasicModalElement } from '../Common/Modals/BasicModalElement'
import { Heart_Data } from '../generated/graphql'
import { useDescriptionModal } from '../Hooks/DescriptionModal'
import { compareMachine } from '../Services/CompareRecordingMachine'
import { CompareColumn } from './CompareColumn'
import { CompareWrapper } from './CompareWrapper'

export const ChineseCompare = () => {
  const [compareState, send] = useActor(compareMachine)


  const left = compareState.context.leftRecording
  const right = compareState.context.rightRecording

  return (
    <CompareWrapper>
      <CompareColumn side="LEFT" title={left?.title} date={left ? format(new Date(left?.created_on), 'dd MMM yyyy  kk:mm') : ''}>
        {
          left ?
            <ChineseCompareCompositionCompare currentRecording={left} />
            : null}
      </CompareColumn>
      <CompareColumn side="RIGHT" title={right?.title} date={right ? format(new Date(compareState.context.rightRecording.created_on), 'dd MMM yyyy  kk:mm') : ""}>
        {
          right ?
            <ChineseCompareCompositionCompare currentRecording={right} />
            : null}
      </CompareColumn>
    </CompareWrapper>

  )
}


interface ChineseCompareCompositionCompareProps {
  currentRecording: Heart_Data
}

const ChineseCompareCompositionCompare = ({ currentRecording }: ChineseCompareCompositionCompareProps) => {
  const { setOpen } = useDescriptionModal()

  return (
    <div className='flex-1'>
      <div className='flex flex-col items-center'>
        <h2 className='text-black text-xl'>Meridians</h2>
        <Meridians
          data={currentRecording?.data.meridians}
          date={new Date(currentRecording?.created_on)}
          onSegmentClick={(d) => setOpen(<BasicModalElement
            title={d.key}
            width="WIDE"
            descriptionKey={d.key} />)}
        />
        <div className='w-full'>
          <TotalPowerBar totalPower={currentRecording?.data.frequencyDomain.total_power} />
        </div>
        <div className='w-full mt-4'>
          <h2 className='text-black text-xl'>Five Elements</h2>
          <FiveElementsDiagram meridians={currentRecording?.data?.meridians} elementClick={(d) => setOpen(<BasicModalElement title={d.name} width="WIDE" descriptionKey={d.shortName} />)} />
        </div>
      </div>
    </div>
  )
}