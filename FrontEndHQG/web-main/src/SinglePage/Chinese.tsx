import { useMatch, useNavigate } from '@tanstack/react-location'
import { useActor } from '@xstate/react'
import { differenceInYears, format } from 'date-fns'
import React, { useEffect, useRef } from 'react'
import ReactToPrint from 'react-to-print'
import { CollapsiblePanel } from '../Common/CollapsiblePanel'
import { TotalPowerBar } from '../Common/Compositions/TotalPowerBar'
import { DisplayWrapper } from '../Common/DisplayWrapper'
import { Dial } from '../Common/graphs/Dial'
import { FiveElements, selectItem, selectItem2 } from '../Common/graphs/FiveElements'
import { FiveElementsDiagram } from '../Common/graphs/FiveElements/FiveElementsDiagram'
import { Meridians } from '../Common/graphs/Meridians'
import { Print } from '../Common/icons/Print'
import { BasicModalElement } from '../Common/Modals/BasicModalElement'
import { SectionTwo } from '../Common/SectionTwo'
import { SpecificExplanationItem } from '../Common/SpecificExplanationItem'
import { Order_By, useGetAllHeartDataForOwnerQuery } from '../generated/graphql'
import { useAuth } from '../Hooks/AuthContext'
import { useDescriptionModal } from '../Hooks/DescriptionModal'
import { useUserContext } from '../Hooks/UserContext'
import { LocationGenerics } from '../Router/CustomRouter'
import { compareMachine } from '../Services/CompareRecordingMachine'

const dataSource = {
  endpoint: import.meta.env.VITE_GRAPHQL_URL,
  fetchParams: {
    headers: {
      // 'Authorization': `Bearer ${auth.user?.token}`,
      'X-Hasura-Admin-Secret': import.meta.env.VITE_GRAPHQL_HEADER
    }
  }
}

export const Chinese = () => {
  const [compareState, send] = useActor(compareMachine)
  const navigate = useNavigate()
  const auth = useAuth()
  const { setOpen } = useDescriptionModal()
  const { params: { userId, subjectId, recordingId }, data: {
    // currentRecording
  } } = useMatch<LocationGenerics>()
  const { currentRecording } = useUserContext()

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


  useEffect(() => {

  }, [recordingId])


  return (
    <>
      <DisplayWrapper>
        <div className='flex '>
          <div className='flex-1'></div>
          <div className='flex flex-row items-center gap-1'>
            <ReactToPrint
              content={() => componentRef.current}
              documentTitle={"HeartQuest-Chinese"}
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
                  navigate({ to: `/${userId}/dashboard/${subjectId}/r/compare/chinese`, replace: true })
              }}
            >COMPARE</button>
          </div>
        </div>
        <SectionTwo>
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
            <div className='w-full mt-16'>
              <h2 className='text-black text-xl'>Five Elements</h2>
              <FiveElementsDiagram meridians={currentRecording?.data?.meridians} elementClick={(d) => setOpen(<BasicModalElement title={d.name} width="WIDE" descriptionKey={d.shortName} />)} />
            </div>
          </div>
          <CollapsiblePanel title={"Chinese Medicine Summary"} content={
            <>
              <SpecificExplanationItem value={currentRecording?.data.meridians.lv} refKey={"lv"} />
              <SpecificExplanationItem value={currentRecording?.data.meridians.lu} refKey={"lu"} />
              <SpecificExplanationItem value={currentRecording?.data.meridians.li} refKey={"li"} />
              <SpecificExplanationItem value={currentRecording?.data.meridians.st} refKey={"st"} />
              <SpecificExplanationItem value={currentRecording?.data.meridians.sp} refKey={"sp"} />
              <SpecificExplanationItem value={currentRecording?.data.meridians.ht} refKey={"ht"} />
              <SpecificExplanationItem value={currentRecording?.data.meridians.si} refKey={"si"} />
              <SpecificExplanationItem value={currentRecording?.data.meridians.bl} refKey={"bl"} />
              <SpecificExplanationItem value={currentRecording?.data.meridians.ki} refKey={"ki"} />
              <SpecificExplanationItem value={currentRecording?.data.meridians.pc} refKey={"pc"} />
              <SpecificExplanationItem value={currentRecording?.data.meridians.tw} refKey={"tw"} />
              <SpecificExplanationItem value={currentRecording?.data.meridians.gb} refKey={"gb"} />
            </>
          } />
        </SectionTwo>
        {/* <SectionTwo>
        <div className=' flex flex-row justify-center '>
        </div>
        <div></div>
        <CollapsiblePanel title={"Panel"} content={"Need description"} />
      </SectionTwo>
      <SectionTwo>
        <div>
          <h2>Five Elements</h2>
          <div >
          </div>
        </div>
        <CollapsiblePanel title={"Five Elements"} content={"Need description"} />
      </SectionTwo>
      <SectionTwo>
        <div>
          <FiveElementsDiagram meridians={currentRecording?.data?.meridians} elementClick={(d) => setOpen(<BasicModalElement title={d.name} width="WIDE" descriptionKey={d.shortName} />)} />
        </div>
        <div>
        </div>
      </SectionTwo> */}
      </DisplayWrapper>
      <div style={{
        width: "210mm",
        height: "297mm",
        display: "none"
      }}>
        <div ref={componentRef} >

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

          <div className='mt-16'></div>

          <div className='flex flex-col items-center'>
            <h2>Meridians</h2>
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
              <h2>Five Elements</h2>
              <FiveElementsDiagram meridians={currentRecording?.data?.meridians} elementClick={(d) => setOpen(<BasicModalElement title={d.name} width="WIDE" descriptionKey={d.shortName} />)} />
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
