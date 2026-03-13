import { useMatch, useNavigate } from '@tanstack/react-location'
import { useActor } from '@xstate/react'
import { differenceInYears, format } from 'date-fns'
import React, { useEffect, useRef } from 'react'
import ReactToPrint from 'react-to-print'
import { CollapsiblePanel } from '../Common/CollapsiblePanel'
import { NervousSystemBalanceIndexBar } from '../Common/Compositions/NervousSystemBalanceIndexBar'
import { PolyVagalCollection } from '../Common/Compositions/PolyVagalCollection'
import { RMSSDCard } from '../Common/Compositions/RMSSDCard'
import { SDNNCard } from '../Common/Compositions/SDNNCard'
import { StressIndexBar } from '../Common/Compositions/StressIndexBar'
import { TotalPowerBar } from '../Common/Compositions/TotalPowerBar'
import { DisplayWrapper } from '../Common/DisplayWrapper'
import { HorisontalBar } from '../Common/graphs/HorisontalBar'
import { Pie } from '../Common/graphs/Pie'
import { Print } from '../Common/icons/Print'
import { BasicModalElement } from '../Common/Modals/BasicModalElement'
import { SectionTwo } from '../Common/SectionTwo'
import { SpecificExplanationItem } from '../Common/SpecificExplanationItem'
import { ValueBox } from '../Common/ValueBox'
import { Order_By, useGetAllHeartDataForOwnerQuery } from '../generated/graphql'
import { useAuth } from '../Hooks/AuthContext'
import { useDescriptionModal } from '../Hooks/DescriptionModal'
import { useUserContext } from '../Hooks/UserContext'
import { LocationGenerics } from '../Router/CustomRouter'
import { compareMachine } from '../Services/CompareRecordingMachine'
import { ans_cns, energy_index, hormones, poly_vagal, psActivity, stress_index, total_power } from '../utils/gradients'


const dataSource = {
  endpoint: import.meta.env.VITE_GRAPHQL_URL,
  fetchParams: {
    headers: {
      // 'Authorization': `Bearer ${auth.user?.token}`,
      'X-Hasura-Admin-Secret': import.meta.env.VITE_GRAPHQL_HEADER
    }
  }
}


export const NervousSystem = () => {
  const [compareState, send] = useActor(compareMachine)
  const navigate = useNavigate()
  const auth = useAuth()
  const { params: { userId, subjectId, recordingId }, data: {
    // currentRecording
  } } = useMatch<LocationGenerics>()

  const { currentRecording } = useUserContext()
  const { setOpen } = useDescriptionModal()

  const componentRef = useRef(null);

  const { data: subject, isLoading: subjectLoading, refetch: subjectRefetch } = useGetAllHeartDataForOwnerQuery(dataSource, {
    _eq: subjectId || "",
    id: subjectId,
    where: {
      owner: { _eq: subjectId },
      deleted_on: { _is_null: true },
      // ...(query.get('trend') ? { trend_recording: { _eq: query.get('trend') } } : { trend_recording: { _is_null: false } }),
    },
    order_by: Order_By.Desc
  }, {
    enabled: !!subjectId,
    refetchInterval: 3000
  })

  return (
    <>
      <DisplayWrapper>
        <div className='flex '>
          <div className='flex-1'></div>
          {/* <div className='flex flex-row justify-end p-2'>
          <ReactToPrint
            content={() => componentRef.current}
            documentTitle={"HeartQuest"}
            removeAfterPrint
            trigger={() => <button><Print /></button>}
          />
        </div> */}
          <div className='flex flex-row items-center gap-1'>
            <ReactToPrint
              pageStyle={`
                @page {
                  size: 210mm 297mm;
                }
              `}
              content={() => componentRef.current}
              documentTitle={"HeartQuest-Nervous System"}
              removeAfterPrint
              trigger={() => <button><Print /></button>}
            />
            <button
              type="button"
              className='px-2  text-sm border-2 border-charcoal rounded-md hover:bg-charcoal hover:text-white'
              onClick={() => {
                currentRecording &&
                  send(["START", { type: "SELECT", value: currentRecording }])
                currentRecording &&
                  navigate({ to: `/${userId}/dashboard/${subjectId}/r/compare/nervous-system`, replace: true })
              }}
            >COMPARE</button>
          </div>
        </div>
        <div className='flex flex-col'>

          <SectionTwo>
            <div className='flex flex-wrap gap-4 '>
              <div>
              <ValueBox
                onClick={() => setOpen(<BasicModalElement title='BPM - Beats Per Minute' descriptionKey="bpm" />)}
                valueKey={"val"}
                value={currentRecording?.data.bpm}
                title={"Heart Rate"}
                idealRange={[60, 84]}
                colourRange={['text-primary-red', 'text-primary-green', 'text-primary-red']}
                valueRange={[59, 85]}
              />
              </div>
              <div>
              <SDNNCard value={currentRecording?.data.timeDomain.sdnn} />
              <div className='text-md mt-2 leading-none'>Ability to cope <br /> with stress</div>
              </div>
              <div>
              <RMSSDCard value={currentRecording?.data.timeDomain.rmssd} />
              <div className='text-md mt-2 leading-none'>Ability to repair <br /> and recover
after <br /> stress or exercise</div>
              </div>
              <div>
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
              <div className='text-md mt-2 leading-none'>Balance between <br />
Sympathetic N and <br />
Parasympathetic N</div>
              </div>
            </div>
            <CollapsiblePanel title={"Values Summary"} content={<>
              <SpecificExplanationItem value={currentRecording?.data.bpm} refKey="bpm" />
              <SpecificExplanationItem value={currentRecording?.data.timeDomain.sdnn} refKey="sdnn" />
              <SpecificExplanationItem value={currentRecording?.data.timeDomain.rmssd} refKey="rmssd" />
              <SpecificExplanationItem value={currentRecording?.data.frequencyDomain.lf_hf_ratio} refKey="lf_hf_ratio" />
            </>} />
          </SectionTwo>
          <SectionTwo>
            <div className='relative mt-8'>
              <h2 className='text-black'>
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
            {/* <div></div> */}
            <CollapsiblePanel title={"Nervous System"} content={
              <>
                <SpecificExplanationItem value={currentRecording?.data.frequencyDomain.vlf_percentage * 100} refKey="vlf" />
                <SpecificExplanationItem value={currentRecording?.data.frequencyDomain.lf_percentage * 100} refKey="lf" />
                <SpecificExplanationItem value={currentRecording?.data.frequencyDomain.hf_percentage * 100} refKey="hf" />
              </>
            } />
          </SectionTwo>
          <SectionTwo>
            <div>
                <div className='text-center -mb-4 mt-2 text-sm'>Overall Vitality</div>
              <TotalPowerBar totalPower={currentRecording?.data.frequencyDomain.total_power} />
                <div className='text-center -mb-4 mt-2 text-sm'>The amount of stress on the nervous system</div>
              <StressIndexBar value={currentRecording?.data.stressIndex} />
                <div className='text-center -mb-4 mt-2 text-sm'>Balance between the CNS and ANS</div>
              <NervousSystemBalanceIndexBar value={currentRecording?.data.cns_ans} />
            </div>
            <CollapsiblePanel title={"Values Summary"} content={
              <>
                <SpecificExplanationItem value={currentRecording?.data.frequencyDomain.total_power} refKey="total_power" />
                <SpecificExplanationItem value={currentRecording?.data.stressIndex} refKey="stressIndex" />
                <SpecificExplanationItem value={currentRecording?.data.cns_ans} refKey="cns_ans" />
              </>
            } />
          </SectionTwo>
          <div className='mt-8'></div>
          <SectionTwo>
            <PolyVagalCollection
              paraActivity={(currentRecording?.data?.frequencyDomain?.hf / currentRecording?.data?.frequencyDomain?.total_power * 100)}
              energyIndex={(currentRecording?.data?.frequencyDomain?.total_power)}
              polyVagal={calculatePolyVagal(currentRecording)} />
            <div></div>
            {/* <CollapsiblePanel title={"Panel"} content={"Need description"} /> */}
          </SectionTwo>
        </div>
      </DisplayWrapper>
      <div style={{
        width: "210mm",
        height: "297mm",
        display: "none"
      }}>
        <div ref={componentRef} style={{
          width: "210mm"
        }}>

          <div className='flex flex-col justify-center items-start w-full bg-opacity-10 ' style={{
            width: "210"
          }}>
            <div className='mt-2'>
              <div className='text-charcoal text-md '>{currentRecording?.title}</div>
              <div className='text-charcoal text-xs'>{currentRecording?.created_on ? format(new Date(currentRecording?.created_on), 'dd MMM yyyy  kk:mm') : null}</div>
            </div>
          </div>

          <div className='flex flex-col justify-center items-start w-full  mt-2' style={{
            width: "210"
          }}>
            <div className='text-charcoal text-md'>{subject?.users_by_pk?.first_name} {subject?.users_by_pk?.last_name}</div>
            {subject && <div className='text-charcoal text-md'>Age: {differenceInYears(new Date(), new Date(subject.users_by_pk?.birth_date))} </div>}
            {subject && subject.users_by_pk && subject.users_by_pk.data && <div className='text-charcoal text-md'> Gender:
              <span className=' capitalize '>
                {" " + JSON.parse(subject.users_by_pk?.data).data.gender}
              </span>
            </div>}
          </div>


          <div className='flex flex-wrap gap-4 mt-14 '>
            <ValueBox
              onClick={() => setOpen(<BasicModalElement title='BPM - Beats Per Minute' descriptionKey="bpm" />)}
              valueKey={"val"}
              value={currentRecording?.data.bpm}
              title={"Heart Rate"}
              idealRange={[60, 84]}
              colourRange={['text-primary-red', 'text-primary-green', 'text-primary-red']}
              valueRange={[59, 85]}
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

          <div className='flex flex-row gap-4 '>
            <div className='pl-32'>

              <Pie filled={auth.graphsExpanded} data={[
                {
                  value: currentRecording?.data.frequencyDomain.vlf_percentage * 100,
                  text: "VLF",
                  subtext: "NeuroH",
                  styleClass: "stroke-primary-red fill-primary-red",
                  // onClick: () => setOpen(<BasicModalElement title='VLF - Neuro Hormonal' descriptionKey="vlf" />)
                },
                {
                  value: currentRecording?.data.frequencyDomain.lf_percentage * 100,
                  text: "LF",
                  subtext: "SNS",
                  styleClass: "stroke-primary-yellow fill-primary-yellow",
                  // onClick: () => setOpen(<BasicModalElement title='LF - Sympathetic Nervous System' descriptionKey="lf" />)

                },
                {
                  value: currentRecording?.data.frequencyDomain.hf_percentage * 100,
                  text: "HF",
                  subtext: "PNS",
                  styleClass: "stroke-primary-green fill-primary-green",
                  // onClick: () => setOpen(<BasicModalElement title='HF - Parasympathetic Nervous System' descriptionKey="hf" />)

                }
              ]} />
            </div>
          </div>

          <div className='flex flex-col w-full'
            style={{
              width: '210mm'
            }}>
            <TotalPowerBar totalPower={currentRecording?.data.frequencyDomain.total_power} />
            <StressIndexBar value={currentRecording?.data.stressIndex} />
            <NervousSystemBalanceIndexBar value={currentRecording?.data.cns_ans} />
          </div>

          <PolyVagalCollection
            paraActivity={(currentRecording?.data?.frequencyDomain?.hf / currentRecording?.data?.frequencyDomain?.total_power * 100)}
            energyIndex={(currentRecording?.data?.frequencyDomain?.total_power)}
            polyVagal={calculatePolyVagal(currentRecording)} />

        </div>
      </div>
    </>
  )
}

export const calculatePolyVagal = (recording: any) => {
  const fireMinister = (recording?.data?.meridians?.tw + recording?.data?.meridians?.pc)
  const earth = (recording?.data?.meridians?.sp + recording?.data?.meridians?.st)
  return fireMinister / earth
}

