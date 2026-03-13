import { useActor } from '@xstate/react'
import { compareMachine } from '../Services/CompareRecordingMachine'

import React, { useEffect } from 'react'
import { CompareWrapper } from './CompareWrapper'
import { CompareColumn } from './CompareColumn'
import { format } from 'date-fns'
import { ValueBox } from '../Common/ValueBox'
import { useDescriptionModal } from '../Hooks/DescriptionModal'
import { BasicModalElement } from '../Common/Modals/BasicModalElement'
import { Heart_Data } from '../generated/graphql'
import { useAuth } from '../Hooks/AuthContext'
import { Pie } from '../Common/graphs/Pie'
import { TotalPowerBar } from '../Common/Compositions/TotalPowerBar'
import { StressIndexBar } from '../Common/Compositions/StressIndexBar'
import { NervousSystemBalanceIndexBar } from '../Common/Compositions/NervousSystemBalanceIndexBar'
import { PolyVagalCollection } from '../Common/Compositions/PolyVagalCollection'
import { calculatePolyVagal } from '../SinglePage/NervousSystem'
import { SDNNCard } from '../Common/Compositions/SDNNCard'
import { RMSSDCard } from '../Common/Compositions/RMSSDCard'

export const NervousCompare = () => {
  const [compareState, send] = useActor(compareMachine)


  const left = compareState.context.leftRecording
  const right = compareState.context.rightRecording

  return (
    <CompareWrapper>
      <CompareColumn side="LEFT" title={left?.title} date={left ? format(new Date(left?.created_on), 'dd MMM yyyy  kk:mm') : ''}>
        {
          left ?
            <NervousSystemComposition currentRecording={left} />
            : null}
      </CompareColumn>
      <CompareColumn side="RIGHT" title={right?.title} date={right ? format(new Date(compareState.context.rightRecording.created_on), 'dd MMM yyyy  kk:mm') : ""}>
        {
          right ?
            <NervousSystemComposition currentRecording={right} />
            : null}
      </CompareColumn>
    </CompareWrapper>

  )
}


interface MainBoxesProps {
  currentRecording: Heart_Data
}

const MainBoxes = ({ currentRecording }: MainBoxesProps) => {
  const { setOpen } = useDescriptionModal()
  return (
    <div className='flex flex-wrap gap-4 '>
      <ValueBox
        onClick={() => setOpen(<BasicModalElement title='BPM - Beats Per Minute' descriptionKey="bpm" />)}
        valueKey={"val"}
        value={currentRecording?.data.bpm}
        title={"Heart Rate"}
        idealRange={[60, 84]}
        colourRange={['text-primary-red', 'text-primary-green', 'text-primary-red']}
        valueRange={[59, 84]}
      />

      <SDNNCard value={currentRecording?.data.timeDomain.sdnn} />
      <RMSSDCard value={currentRecording?.data.timeDomain.rmssd} />

      <ValueBox
        onClick={() => setOpen(<BasicModalElement title='LF - HF Ratio' descriptionKey="lf_hf_ratio" />)}
        valueKey={"val"}
        value={currentRecording?.data.frequencyDomain.lf_hf_ratio}
        title={"LF - HF Ratio"}
        idealRange={[1, 3]}
        colourRange={["text-primary-red", "text-primary-green", "text-primary-red"]}
        valueRange={[0.6, 3]}
        decimal={2}
      />
    </div>
  )
}

interface NervousSystemPieProps {
  currentRecording: Heart_Data
}

const NervousSystemPie = ({ currentRecording }: NervousSystemPieProps) => {
  const auth = useAuth()
  const { setOpen } = useDescriptionModal()

  return (
    <div className='relative mt-8'>
      <h2 className='text-black text-xl'>
        Nervous Systems
      </h2>
      <button
        type="button"
        onClick={() => setOpen(<BasicModalElement title='Frequency Domain' width='WIDE' descriptionKey="pie-desc" />)}
        className=' absolute top-14 right-24 text-primary-red cursor-pointer '>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
        </svg>
      </button>
      <Pie filled={auth.graphsExpanded} data={[
        {
          value: currentRecording?.data.frequencyDomain.vlf_percentage * 100,
          text: "VLF",
          subtext: "NeuroH",
          styleClass: "stroke-primary-red fill-primary-red",
          onClick: () => setOpen(<BasicModalElement title='VLF - Neuro Hormonal' descriptionKey="vlf" />)
        },
        {
          value: currentRecording?.data.frequencyDomain.lf_percentage * 100,
          text: "LF",
          subtext: "SNS",
          styleClass: "stroke-primary-yellow fill-primary-yellow",
          onClick: () => setOpen(<BasicModalElement title='LF - Sympathetic Nervous System' descriptionKey="lf" />)

        },
        {
          value: currentRecording?.data.frequencyDomain.hf_percentage * 100,
          text: "HF",
          subtext: "PNS",
          styleClass: "stroke-primary-green fill-primary-green",
          onClick: () => setOpen(<BasicModalElement title='HF - Parasympathetic Nervous System' descriptionKey="hf" />)

        }
      ]} />
    </div>
  )
}

interface NervousSystemComposition {
  currentRecording: Heart_Data
}

const NervousSystemComposition = ({
  currentRecording
}: NervousSystemComposition) => {
  return (
    <div className='flex flex-1 flex-col'>
      <MainBoxes currentRecording={currentRecording} />
      <NervousSystemPie currentRecording={currentRecording} />
      <TotalPowerBar totalPower={currentRecording?.data.frequencyDomain.total_power} />
      <StressIndexBar value={currentRecording?.data.stressIndex} />
      <NervousSystemBalanceIndexBar value={currentRecording?.data.cns_ans} />
      <PolyVagalCollection
        paraActivity={(currentRecording?.data?.frequencyDomain?.hf / currentRecording?.data?.frequencyDomain?.total_power * 100)}
        energyIndex={(currentRecording?.data?.frequencyDomain?.total_power)}
        polyVagal={calculatePolyVagal(currentRecording)} />
    </div>
  )
}