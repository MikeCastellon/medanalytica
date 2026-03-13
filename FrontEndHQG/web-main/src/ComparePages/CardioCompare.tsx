import { useActor } from '@xstate/react'
import { format } from 'date-fns'
import React, { useCallback, useEffect, useState } from 'react'
import { Histogram } from '../Common/graphs/Histogram'
import { Rhythmogram } from '../Common/graphs/Rhythmogram'
import { ScatterData } from '../Common/graphs/Scattergram'
import ScattergramRRDisplay from '../Common/graphs/ScattergramRRDisplay'
import { BasicModalElement } from '../Common/Modals/BasicModalElement'
import { ValueBox } from '../Common/ValueBox'
import { Heart_Data } from '../generated/graphql'
import { useDescriptionModal } from '../Hooks/DescriptionModal'
import { compareMachine } from '../Services/CompareRecordingMachine'
import { CompareColumn } from './CompareColumn'
import { CompareWrapper } from './CompareWrapper'

export const CardioCompare = () => {
  const [compareState, send] = useActor(compareMachine)

  const left = compareState.context.leftRecording
  const right = compareState.context.rightRecording

  return (
    <CompareWrapper>
      <CompareColumn side="LEFT" title={left?.title} date={left ? format(new Date(left?.created_on), 'dd MMM yyyy  kk:mm') : ''}>
        {
          left ?
            <CardioCompareComposition currentRecording={left} />
            : null}
      </CompareColumn>
      <CompareColumn side="RIGHT" title={right?.title} date={right ? format(new Date(compareState.context.rightRecording.created_on), 'dd MMM yyyy  kk:mm') : ""}>
        {
          right ?
            <CardioCompareComposition currentRecording={right} />
            : null}
      </CompareColumn>
    </CompareWrapper>

  )
}

interface CardioCompareCompositionProps {
  currentRecording: Heart_Data
}

const CardioCompareComposition = ({ currentRecording }: CardioCompareCompositionProps) => {
  const { setOpen } = useDescriptionModal()
  const [scatterData, setScatterData] = useState<ScatterData[] | []>([])

  const scatterDataFn = useCallback((rrs: any[]) => {
    const rdata = rrs
      .map((values: any, index: any) => {
        return { x: Number(values.x1), y: Number(values.value), color: values.rejected ? "black" : "red", rejected: values.rejected }
      })
    const x1 = rdata.map((d: any) => d.y)
    x1.pop()
    const colorArr = rdata.map((d: any) => d.color)
    colorArr.shift()
    const x2 = rdata.map((d: any) => d.y)
    x2.shift()

    const scatData: ScatterData[] = x1.map((d: any, i: any) => {
      return { x: d, y: x2[i], color: colorArr[i] }
    })

    setScatterData(scatData)
  }, [])

  useEffect(() => {
    if (currentRecording?.rr_metadata?.rrs) {
      scatterDataFn(currentRecording.rr_metadata.rrs)
    }
  }, [])

  return (
    <div className='flex-1'>
      <div className='text-sm text-black mt-2'>RR Details:</div>
      <div className='text-xs text-black'>Rejections:  {currentRecording?.rr_metadata?.total_rejected.toFixed()} | Threshold: {currentRecording?.rr_metadata?.threshold.toFixed()} | Mean: {currentRecording?.rr_metadata?.mean.toFixed()} | Min: {currentRecording?.rr_metadata?.min.toFixed()} | Max: {currentRecording?.rr_metadata?.max.toFixed()}</div>
      <div className='flex-1 cursor-pointer mt-8 mb-4'
        onClick={() => setOpen(<BasicModalElement title='Rhythmogram' descriptionKey="rhythmogram" />)}>

        <h2 className='text-black text-xl'>Rhythmogram</h2>
        {currentRecording && currentRecording?.rr_metadata?.rrs &&
          <Rhythmogram data={currentRecording.rr_metadata.rrs} />
        }
      </div>
      <div className='flex flex-wrap gap-4'>
        <ValueBox
          onClick={() => setOpen(<BasicModalElement title='HRV Index' descriptionKey="hrvIndex" />)}
          valueKey={"val"}
          value={currentRecording?.data.hrvIndex}
          title={"HRV Index"}
          idealRange={[6, 25]}
          colourRange={["text-primary-red", "text-primary-green", "text-primary-red"]}
          valueRange={[5, 25]}
        />
        <ValueBox
          onClick={() => setOpen(<BasicModalElement title='BPM - Beats Per Minute' descriptionKey="bpm" />)}
          valueKey={"val"}
          value={currentRecording?.data.bpm}
          title={"Heart Rate"}
          idealRange={[60, 84]}
          colourRange={["text-primary-red", "text-primary-green", "text-primary-red"]}
          valueRange={[59, 84]}
        />
        <ValueBox
          onClick={() => setOpen(<BasicModalElement title='Stress Index' descriptionKey="stressIndex" />)}
          valueKey={"val"}
          value={currentRecording?.data.stressIndex}
          title={"Stress Index"}
          idealRange={[10, 100]}
          colourRange={["text-primary-red", "text-primary-green", "text-primary-red"]}
          valueRange={[9, 100]}
        />
        <ValueBox
          onClick={() => setOpen(<BasicModalElement title='aMo%' descriptionKey="amo" />)}
          valueKey={"val"}
          value={currentRecording?.data.amo * 100}
          title={"aMo%"}
          idealRange={[30, 50]}
          colourRange={["text-primary-red", "text-primary-green", "text-primary-red"]}
          valueRange={[29, 51]}

        />
      </div>
      <div className='flex flex-col'>
        <div
          className='flex cursor-pointer mt-8'
          onClick={() => setOpen(<BasicModalElement title='Histogram Details' descriptionKey="histogram" />)}>
          <h2 className='text-black text-xl'>Histogram</h2>
          {currentRecording && currentRecording?.rr_metadata?.rrs &&
            <Histogram data={currentRecording.rr_metadata.rrs} />
          }
        </div>

        <div
          className=' cursor-pointer'
          onClick={() => setOpen(<BasicModalElement title='Scattergram Details' descriptionKey="scattergram" />)}
        >
          <h2 className='text-black text-xl'>Scattergram</h2>
          {/* {scatterData &&
            <Scattergram data={scatterData} />
          } */}
          {scatterData &&

            <ScattergramRRDisplay scatterData={scatterData} />
          }
        </div>
      </div>
    </div>
  )
}