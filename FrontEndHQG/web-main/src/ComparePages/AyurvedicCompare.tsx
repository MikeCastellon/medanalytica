import { useActor } from '@xstate/react'
import { format } from 'date-fns'
import React from 'react'
import { TotalPowerBar } from '../Common/Compositions/TotalPowerBar'
import { BarGraph } from '../Common/graphs/BarGraph'
import { ChakraDiagram } from '../Common/graphs/ChakraDiagram'
import { Pie } from '../Common/graphs/Pie'
import { BasicModalElement } from '../Common/Modals/BasicModalElement'
import { ValueBox } from '../Common/ValueBox'
import { Heart_Data } from '../generated/graphql'
import { useAuth } from '../Hooks/AuthContext'
import { useDescriptionModal } from '../Hooks/DescriptionModal'
import { compareMachine } from '../Services/CompareRecordingMachine'
import { CompareColumn } from './CompareColumn'
import { CompareWrapper } from './CompareWrapper'

export const AyurvedicCompare = () => {
  const [compareState, send] = useActor(compareMachine)


  const left = compareState.context.leftRecording
  const right = compareState.context.rightRecording

  return (
    <CompareWrapper>
      <CompareColumn side="LEFT" title={left?.title} date={left ? format(new Date(left?.created_on), 'dd MMM yyyy  kk:mm') : ''}>
        {
          left ?
            <AyurvedicCompareComposition currentRecording={left} />
            : null}
      </CompareColumn>
      <CompareColumn side="RIGHT" title={right?.title} date={right ? format(new Date(compareState.context.rightRecording.created_on), 'dd MMM yyyy  kk:mm') : ""}>
        {
          right ?
            <AyurvedicCompareComposition currentRecording={right} />
            : null}
      </CompareColumn>
    </CompareWrapper>

  )
}


interface AyurvedicCompareCompositionProps {
  currentRecording: Heart_Data
}

const AyurvedicCompareComposition = ({ currentRecording }: AyurvedicCompareCompositionProps) => {
  const auth = useAuth()
  const { setOpen } = useDescriptionModal()

  const doshasTotalPower = currentRecording?.data.doshas.vata + currentRecording?.data.doshas.pitta + currentRecording?.data.doshas.kapha
  const vataPercentage = currentRecording?.data.doshas.vata / doshasTotalPower * 100
  const pittaPercentage = currentRecording?.data.doshas.pitta / doshasTotalPower * 100
  const kaphaPercentage = currentRecording?.data.doshas.kapha / doshasTotalPower * 100

  return (
    <div className='flex-1 flex-col items-center'>
      <div>
        {/* <h2 className='ml-8'>Doshas</h2> */}
        <Pie filled={auth.graphsExpanded} data={[
          {
            value: vataPercentage,
            text: "V",
            subtext: "Vata",
            styleClass: "stroke-primary-red fill-primary-red",
            onClick: () => setOpen(<BasicModalElement title='Vata' descriptionKey="vata" />)
          },
          {
            value: pittaPercentage,
            text: "P",
            subtext: "Pitta",
            styleClass: "stroke-primary-yellow fill-primary-yellow",
            onClick: () => setOpen(<BasicModalElement title='Pitta' descriptionKey="pitta" />)
          },
          {
            value: kaphaPercentage,
            text: "K",
            subtext: "Kapha",
            styleClass: "stroke-primary-green fill-primary-green",
            onClick: () => setOpen(<BasicModalElement title='Kapha' descriptionKey="Kapha" />)
          }
        ]} />

        <TotalPowerBar totalPower={currentRecording?.data.frequencyDomain.total_power} />

      </div>

      <div >
        <h2 className='ml-8 text-black text-xl'>Vata</h2>
        <div className='flex flex-wrap-reverse justify-start items-end pl-4'>
          <BarGraph
            yScale={[0, 10]}
            valueRange={[1.01, 3.6]}
            colourRange={['primary-yellow', 'primary-green', 'primary-red']}
            expanded={auth.graphsExpanded}
            object={currentRecording?.data.doshas.vataSub}
            accessors={['prana', 'apana', 'udana', 'samana', 'vyana']}
            labels={['V1', 'V2', 'V3', 'V4', 'V5']}
            onBarClick={(d) => setOpen(<BasicModalElement title={d.name} descriptionKey={d.name} />)}
          />
          <ValueBox
            valueKey={"vata"}
            value={currentRecording?.data.doshas.vata / doshasTotalPower * 100}
            suffix={"%"}
            title={"Vata"}
            idealRange={[10, 100]}
            colourRange={["primary-red", "primary-green", "primary-red"]}
            valueRange={[10, 100]}
          />
        </div>
      </div>

      <div>
        <h2 className='ml-8 text-black text-xl'>Pitta</h2>
        <div className='flex flex-wrap-reverse justify-start items-end  pl-4'>
          <BarGraph
            yScale={[0, 10]}
            valueRange={[1.01, 3.6]}
            colourRange={['primary-yellow', 'primary-green', 'primary-red']}
            expanded={auth.graphsExpanded}
            object={currentRecording?.data.doshas.pittaSub}
            accessors={['sadhaka', 'pachaka', 'alochaka', 'bhrajaka', 'ranjaka']}
            labels={['P1', 'P2', 'P3', 'P4', 'P5']}
            onBarClick={(d) => setOpen(<BasicModalElement title={d.name} descriptionKey={d.name} />)} />
          <ValueBox
            valueKey={"pitta"}
            value={currentRecording?.data.doshas.pitta / doshasTotalPower * 100}
            suffix={"%"}
            title={"Pitta"}
            idealRange={[10, 100]}
            colourRange={["primary-red", "primary-green", "primary-red"]}
            valueRange={[10, 100]}
          />
        </div>
      </div>

      <div>
        <h2 className='ml-8 text-black text-xl'>Kapha</h2>
        <div className='flex flex-wrap-reverse justify-start items-end  pl-4'>
          <BarGraph
            yScale={[0, 10]}
            valueRange={[1.01, 3.6]}
            colourRange={['primary-yellow', 'primary-green', 'primary-red']}
            expanded={auth.graphsExpanded}
            object={currentRecording?.data.doshas.kaphaSub}
            accessors={['kledaka', 'sleshaka', 'bodhaka', 'avalambaka', 'tarpaka']}
            labels={['K1', 'K2', 'K3', 'K4', 'K5']}
            onBarClick={(d) => setOpen(<BasicModalElement title={d.name} descriptionKey={d.name} />)}
          />
          <ValueBox
            valueKey={"kapha"}
            value={currentRecording?.data.doshas.kapha / doshasTotalPower * 100}
            suffix={"%"}
            title={"Kapha"}
            idealRange={[10, 100]}
            colourRange={["primary-red", "primary-green", "primary-red"]}
            valueRange={[10, 100]}
          />
        </div>
      </div>

      <div>
        <h2 className='ml-8 text-black text-xl'>Tissues</h2>
        <div className='flex flex-wrap-reverse justify-start items-end  pl-4'>
          <BarGraph
            yScale={[0, 20]}
            valueRange={[3, 5, 7.5, 10]}
            colourRange={['primary-red', 'secondary-red', 'primary-yellow', 'primary-green']}
            expanded={auth.graphsExpanded}
            object={currentRecording?.data.dhatu}
            accessors={["rasa", "rakta", "mamsa", "medu", "asthi", "majja", "shukra"]}
            labels={["T1", "T2", "T3", "T4", "T5", "T6", "T7"]}
            onBarClick={(d) => setOpen(<BasicModalElement title={d.name} descriptionKey={d.name} />)}
          />
        </div>
      </div>

      <div>
        <h2 className='ml-8 text-black text-xl'>Energy Plexus</h2>
        <ChakraDiagram data={currentRecording?.data} />
      </div>
    </div>
  )
}