import { Navigate } from '@tanstack/react-location'
import { useActor } from '@xstate/react'
import { max } from 'd3'
import { format } from 'date-fns'
import React from 'react'
import { NeuroTransmitterCollection } from '../Common/Compositions/NeuroTransmitterCollection'
import { Dial } from '../Common/graphs/Dial'
import { BasicModalElement } from '../Common/Modals/BasicModalElement'
import { BrainAccordianModalElement } from '../Common/Modals/BrainAccordianModalElement'
import { BrainRawScoresAccordianModalElement } from '../Common/Modals/BrainRawScoresAccordianModalElement'
import { ValueTextBox } from '../Common/ValueTextBox'
import { Heart_Data } from '../generated/graphql'
import { useAuth } from '../Hooks/AuthContext'
import { useDescriptionModal } from '../Hooks/DescriptionModal'
import { compareMachine } from '../Services/CompareRecordingMachine'
import { BrainGraph, BrainHeading, brain_value_array, GetBrainImage, GraphData, image_array, maxCalc } from '../SinglePage/Brain'
import { CompareColumn } from './CompareColumn'
import { CompareWrapper } from './CompareWrapper'

export const BrainCompare = () => {
  const [compareState, send] = useActor(compareMachine)

  // const auth = useAuth()

  const left = compareState.context.leftRecording
  const right = compareState.context.rightRecording

  return (
    <CompareWrapper>
      <CompareColumn side="LEFT" title={left?.title} date={left ? format(new Date(left?.created_on), 'dd MMM yyyy  kk:mm') : ''}>
        {
          left ?
            <BrainCompareComposition currentRecording={left} />
            : null}
      </CompareColumn>
      <CompareColumn side="RIGHT" title={right?.title} date={right ? format(new Date(compareState.context.rightRecording.created_on), 'dd MMM yyyy  kk:mm') : ""}>
        {
          right ?
            <BrainCompareComposition currentRecording={right} />
            : null}
      </CompareColumn>
    </CompareWrapper>

  )
}

interface BrainCompareCompositionProps {
  currentRecording: Heart_Data
}

const BrainCompareComposition = ({ currentRecording }: BrainCompareCompositionProps) => {
  const { setOpen } = useDescriptionModal()
  const auth = useAuth()


  if (!currentRecording || !currentRecording.brain_spectrum) {
    return <Navigate to={`/login`} />
  }

  const delta: GraphData[] = currentRecording?.brain_spectrum.delta
  const theta: GraphData[] = currentRecording.brain_spectrum.theta
  let alphaReversed = [...currentRecording.brain_spectrum.alpha].reverse()
  const alpha: GraphData[] = alphaReversed
  let betaReversed = [...currentRecording.brain_spectrum.beta].reverse()
  const beta: GraphData[] = betaReversed
  let hbetaReversed = [...currentRecording.brain_spectrum.hbeta].reverse()
  const hbeta: GraphData[] = hbetaReversed
  const graphHeight = 200
  const maxYs = [maxCalc(delta), maxCalc(theta), maxCalc(alpha), maxCalc(beta), maxCalc(hbeta)]
  const yDomain = [0, max(maxYs) || 200]
  const total_power = currentRecording?.data?.brain?.total_power
  return (
    <div className='flex-1'>
      <div className='flex flex-1 flexr-row'>
        <div style={{ flex: 1, cursor: "pointer", }}
          onClick={() => {
            setOpen(<BasicModalElement title='Delta' descriptionKey="delta" />)
          }}>
          <BrainHeading heading={"Delta"} power={`${(currentRecording?.data?.brain?.delta / total_power * 100).toFixed()}% - ${currentRecording?.data?.brain?.delta.toFixed()}`} />
          <BrainGraph id="delta" graphData={delta} graphHeight={graphHeight} yDomain={yDomain} color={"#BF362D"} />
        </div>
        <div style={{ flex: 1, cursor: "pointer" }}
          onClick={() => setOpen(<BasicModalElement title='Theta' descriptionKey="theta" />)}>
          <BrainHeading heading={"Theta"} power={`${(currentRecording?.data?.brain?.theta / total_power * 100).toFixed()}% - ${currentRecording?.data?.brain?.theta.toFixed()}`} />
          <BrainGraph id="theta" graphData={theta} graphHeight={graphHeight} yDomain={yDomain} color={"#E8C401"} />
        </div>
        <div style={{ flex: 1, cursor: "pointer" }}
          onClick={() => setOpen(<BasicModalElement title='Alpha' descriptionKey="alpha" />)}>
          <BrainHeading heading={"Alpha"} power={`${(currentRecording?.data?.brain?.alpha / total_power * 100).toFixed()}% - ${currentRecording?.data?.brain?.alpha.toFixed()}`} />
          <BrainGraph id="alpha" graphData={alpha} graphHeight={graphHeight} yDomain={yDomain} color={"#03952C"} />
        </div>
        <div style={{ flex: 1, cursor: "pointer" }}
          onClick={() => setOpen(<BasicModalElement title='Beta' descriptionKey="beta" />)}>
          <BrainHeading heading={"Beta"} power={`${(currentRecording?.data?.brain?.beta / total_power * 100).toFixed()}% - ${currentRecording?.data?.brain?.beta.toFixed()}`} />
          <BrainGraph id="beta" graphData={beta} graphHeight={graphHeight} yDomain={yDomain} color={"#2D93BF"} />
        </div>
        <div style={{ flex: 1, cursor: "pointer" }}
          onClick={() => setOpen(<BasicModalElement title='High Beta' descriptionKey="hbeta" />)}>
          <BrainHeading heading={"High Beta"} power={`${(currentRecording?.data?.brain?.hbeta / total_power * 100).toFixed()}% - ${currentRecording?.data?.brain?.hbeta?.toFixed()}`} />
          <BrainGraph id="hbeta" graphData={hbeta} graphHeight={graphHeight} yDomain={yDomain} color={"#9337DB"} />
        </div>
      </div>

      <div className='flex flex-col items-center'>
        <div className='flex  justify-end w-full -mb-24'>
          <div>

            <div>Brain Guage</div>
            <div className='flex flex-col'>

              <button
                onClick={() => setOpen(<BrainAccordianModalElement title='Brain Gauge Parameters' />)}
                className='text-sm text-charcoal hover:bg-charcoal border-charcoal border-2 rounded-md hover:text-white py-1 px-2  mt-2'>Parameters</button>
              <button
                onClick={() => setOpen(<BrainRawScoresAccordianModalElement title="Brain Gauge Raw Scores" />)}

                className='text-sm text-charcoal hover:bg-charcoal border-charcoal border-2 rounded-md hover:text-white py-1 px-2  mt-2'>Raw Scores</button>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'center', marginTop: 70 }}>
          {/* <Popover content={() => <>
                <div style={{}}>
                  The brain color that you see here is the brain state showing up for that patient.
                  It is based on the Brain Power Spectrum.<br /> Look at the number representing this parameter and click on the small brain picture that matches this<br /> range for an explanation.
                </div>
              </>} trigger="hover"> */}
          <img src={GetBrainImage(currentRecording?.data?.brain?.brain_power)} style={{ width: 200, filter: "drop-shadow(0px 0px 7px #999999)" }} alt="brain_image" />
          {/* </Popover> */}
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1, maxWidth: 350, marginTop: 20, gap: 10 }}>
            {
              image_array.map((img, i) => {
                // const brain_desc = _.find(brainDescription.descriptions, (d) => { return d.key === brain_key_array[i] })

                return (
                  <div key={i} style={{ minWidth: 50 }}>
                    {/* <Popover content={() => <>
                          <div style={{ textAlign: 'left' }}>
                            {brain_value_array[i]}
                          </div><div dangerouslySetInnerHTML={{ __html: brain_desc.hq_professional }}></div>
                        </>} trigger="click"> */}
                    <img src={img} style={{ width: 50, filter: "drop-shadow(0px 0px 7px #999999)" }} alt="brain_image" />
                    <div></div>
                    <div className='text-primary-grey text-xs text-center mt-1' >
                      {brain_value_array[i]}
                    </div>
                    {/*  </Popover> */}
                  </div>
                )
              })}
          </div>
        </div>
        <Dial
          expanded={auth.graphsExpanded}
          domain={[0, 100]}
          value={
            currentRecording?.data?.brain?.brain_power > 100 ? 100 : currentRecording?.data?.brain?.brain_power ? currentRecording?.data?.brain?.brain_power : 0
          } />
        <div className='text-2xl align-top'>{currentRecording?.data?.brain?.brain_power?.toFixed()}</div>
        <h2>Brain Power Spectrum</h2>
        {/* <div className='flex flex-wrap gap-4 mt-8'>
          <ValueTextBox
            onClick={() => setOpen(<BasicModalElement title='Intercraniel Pressure' descriptionKey="icp" />)} valueKey={"val"}
            value={currentRecording?.data.icp}
            title={"ICP"}
            idealRange={['WNL', "HIGH"]}
            colourRange={["text-primary-green", "text-primary-red"]}
            valueRange={['WNL', "HIGH"]}
          />

        </div> */}
      </div>

      <h2 className='mt-6 text-black text-xl'>Neurotransmitters</h2>
      <NeuroTransmitterCollection currentRecording={currentRecording} />
    </div>
  )
}