import { useMatch, useNavigate } from '@tanstack/react-location'
import { useActor } from '@xstate/react'
import { differenceInYears, format } from 'date-fns'
import { useRef } from 'react'
import ReactToPrint from 'react-to-print'
import { CollapsiblePanel } from '../Common/CollapsiblePanel'
import { HormonesBarCollection } from '../Common/Compositions/HormonesBarCollection'
import { MineralBarCollection } from '../Common/Compositions/MineralBarCollection'
import { DisplayWrapper } from '../Common/DisplayWrapper'
import { Print } from '../Common/icons/Print'
import { BasicModalElement } from '../Common/Modals/BasicModalElement'
import { SectionTwo } from '../Common/SectionTwo'
import { SpecificExplanationItem } from '../Common/SpecificExplanationItem'
import { ValueTextBox } from '../Common/ValueTextBox'
import { Order_By, useGetAllHeartDataForOwnerQuery } from '../generated/graphql'
import { useAuth } from '../Hooks/AuthContext'
import { useDescriptionModal } from '../Hooks/DescriptionModal'
import { useSummary } from '../Hooks/SummaryContext'
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

export const MineralsHormones = () => {
  const [compareState, send] = useActor(compareMachine)
  const navigate = useNavigate()
  const auth = useAuth()
  const { setOpen } = useDescriptionModal()
  const { params: { userId, subjectId, recordingId }, data: {
    // currentRecording
  } } = useMatch<LocationGenerics>()
  const { currentRecording } = useUserContext()


  const { summaryItems, summaryItemsByKey, getSummaryItemByKey } = useSummary()
  // console.log(summaryItems);

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
          <div className='flex flex-row items-center gap-1'>
            <ReactToPrint
              content={() => componentRef.current}
              documentTitle={"HeartQuest-Minerals and Hormones"}
              removeAfterPrint
              trigger={() => <button><Print /></button>}
            />
            <button
              type="button"
              className='px-2 text-sm border-2 border-charcoal rounded-md hover:bg-charcoal hover:text-white'
              onClick={() => {
                currentRecording &&
                  send(["START", { type: "SELECT", value: currentRecording }])
                currentRecording &&
                  navigate({ to: `/${userId}/dashboard/${subjectId}/r/compare/minerals-hormones`, replace: true })
              }}
            >COMPARE</button>
          </div>
        </div>
        <SectionTwo>
          <div className='flex flex-wrap gap-4'>
            {/* <ValueTextBox
            onClick={() => setOpen(<BasicModalElement title='Intercraniel Pressure' descriptionKey="icp" />)} valueKey={"val"}
            value={currentRecording?.data.icp}
            title={"ICP"}
            idealRange={['WNL', "HIGH"]}
            colourRange={["text-primary-green", "text-primary-red"]}
            valueRange={['WNL', "HIGH"]}
          /> */}

          </div>
          <div></div>

        </SectionTwo>
        <SectionTwo>
          <div className='mt-8'>
            <MineralBarCollection
              k={currentRecording?.data?.minerals.k}
              na={currentRecording?.data?.minerals.na}
              mg={currentRecording?.data?.minerals.mg}
              ca={currentRecording?.data?.minerals.ca} />
          </div>
          <CollapsiblePanel
            title={"Minerals Summary"}
            content={
              <>
                <SpecificExplanationItem value={currentRecording?.data?.minerals.k} refKey={"k"} />
                <SpecificExplanationItem value={currentRecording?.data?.minerals.na} refKey={"na"} />
                <SpecificExplanationItem value={currentRecording?.data?.minerals.mg} refKey={"mg"} />
                <SpecificExplanationItem value={currentRecording?.data?.minerals.ca} refKey={"ca"} />
              </>
            } />
        </SectionTwo>
        <SectionTwo>
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
          <CollapsiblePanel title={"Hormones Summary"} content={
            <>
              <SpecificExplanationItem value={currentRecording?.data.inflamIndex} refKey={"inflamIndex"} />
              <SpecificExplanationItem value={currentRecording?.data?.hormones?.cortisol} refKey={"cortisol"} />
              <SpecificExplanationItem value={currentRecording?.data?.hormones?.dhea} refKey={"dhea"} />
              <SpecificExplanationItem value={currentRecording?.data?.hormones?.estradiol} refKey={"estradiol"} />
              <SpecificExplanationItem value={currentRecording?.data?.hormones?.pregnenolone} refKey={"pregnenolone"} />
              <SpecificExplanationItem value={currentRecording?.data?.hormones?.insulin} refKey={"insulin"} />
              <SpecificExplanationItem value={currentRecording?.data?.hormones?.t3_t4} refKey={"t3_t4"} />
              <SpecificExplanationItem value={currentRecording?.data?.tfi} refKey={"tfi"} />
            </>
          } />
        </SectionTwo>
      </DisplayWrapper>
      <div style={{
        width: "210mm",
        height: "297mm",
        display: "none",
        // overflow: "hidden",
        //  height: 0,
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

          <div className='mt-16'></div>

          <MineralBarCollection
            k={currentRecording?.data?.minerals.k}
            na={currentRecording?.data?.minerals.na}
            mg={currentRecording?.data?.minerals.mg}
            ca={currentRecording?.data?.minerals.ca} />

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
    </>
  )
}
