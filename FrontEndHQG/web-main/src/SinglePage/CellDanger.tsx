import React, { useEffect, useRef } from 'react'
import { useAuth } from '../Hooks/AuthContext'
import { useDescriptionModal } from '../Hooks/DescriptionModal'
import { useMatch } from '@tanstack/react-location'
import { LocationGenerics } from '../Router/CustomRouter'
import { useUserContext } from '../Hooks/UserContext'
import { Order_By, useGetAllHeartDataForOwnerQuery } from '../generated/graphql'
import { DisplayWrapper } from '../Common/DisplayWrapper'
import ReactToPrint from 'react-to-print'
import { Print } from '../Common/icons/Print'
import { SectionTwo } from '../Common/SectionTwo'
import { CMOSBar } from '../Common/Compositions/CMOS'
import { ICMR } from '../Common/Compositions/ICMR'
import { MEnergy } from '../Common/Compositions/ME'
import { CDR } from '../Common/Compositions/CDR'
import { BasicModalElement } from '../Common/Modals/BasicModalElement'

const dataSource = {
  endpoint: import.meta.env.VITE_GRAPHQL_URL,
  fetchParams: {
    headers: {
      // 'Authorization': `Bearer ${auth.user?.token}`,
      'X-Hasura-Admin-Secret': import.meta.env.VITE_GRAPHQL_HEADER
    }
  }
}

export const CellDanger = () => {
  // const navigate = useNavigate()
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
    },
    order_by: Order_By.Desc
  }, {
    enabled: !!subjectId,
    refetchInterval: 3000
  })


  useEffect(() => {

  }, [recordingId])

  const CMOS = calculateCMOS(currentRecording?.data?.inflamIndex)
  const ME = calculateME(currentRecording?.data?.frequencyDomain?.total_power)

  return (
    <>
      <DisplayWrapper>
        <div className='flex '>
          <div className='flex-1'></div>
          <div className='flex flex-row items-center gap-1'>
            <ReactToPrint
              content={() => componentRef.current}
              documentTitle={"HeartQuest-Cell Danger"}
              removeAfterPrint
              trigger={() => <button><Print /></button>}
            />
            {/* <button
              type="button"
              className='px-2  text-sm border-2 border-charcoal rounded-md hover:bg-charcoal hover:text-white'
              onClick={() => {
                currentRecording &&
                  send(["START", { type: "SELECT", value: currentRecording }])
                currentRecording &&
                  navigate({ to: `/${userId}/dashboard/${subjectId}/compare/chinese`, replace: true })
              }}
            >COMPARE</button> */}
          </div>
        </div>

        <SectionTwo>
          <div className='flex flex-col items-start'>
            <h2 onClick={() => setOpen(<BasicModalElement title={"Cell Membrane Oxidation Stress (CMOS)"} descriptionKey={"cmos"} />)} className='text-black text-xl cursor-pointer'>Cell Membrane Oxidation Stress (CMOS)</h2>
            {/* <div>{CMOS?.toFixed(2)}</div>
            <div>{evaluateCMOS(CMOS)}</div> */}
            <div>
              <CMOSBar cmos={CMOS} descriptionKey='cmos' descriptionTitle='Cell Membrane Oxidation Stress (CMOS)' />
            </div>
          </div>
          <div></div>
        </SectionTwo>
        <div className=' h-8 '></div>
        <SectionTwo>
          <div className='flex flex-col items-start'>
            <h2 onClick={() => setOpen(<BasicModalElement title={"Intracellular Mineral Ratio (ICMR)"} descriptionKey={"icmr"} />)} className='text-black text-xl cursor-pointer'>Intracellular Mineral Ratio (ICMR)</h2>
            <div>
              <br />
              <ICMR refKey="ICMR-K" title={"Potassium - K"} icmr={currentRecording?.data?.minerals?.k} descriptionKey='icmr-k' descriptionTitle='ICMR - K' />
              <ICMR refKey="ICMR-Na" title={"Sodium - Na"} icmr={currentRecording?.data?.minerals?.na} descriptionKey='icmr-na' descriptionTitle='ICMR - Na' />
              <ICMR refKey="ICMR-Mg" title={"Magnesium - Mg"} icmr={currentRecording?.data?.minerals?.mg} descriptionKey='icmr-mg' descriptionTitle='ICMR - Mg' />
              <ICMR refKey="ICMR-Ca" title={"Calcium - Ca"} icmr={currentRecording?.data?.minerals?.ca} descriptionKey='icmr-ca' descriptionTitle='ICMR - Ca' />
            </div>
          </div>
          <div></div>
        </SectionTwo>
        <div className=' h-8 '></div>
        <SectionTwo>
          <div className='flex flex-col items-start'>
            <h2 onClick={() => setOpen(<BasicModalElement title={"Mitochondrial Energy (ME)"} descriptionKey={"mito-e"} />)} className='text-black text-xl cursor-pointer'>Mitochondrial Energy (ME)</h2>
            <br />
            <MEnergy stringValue={evaluateME(ME)} me={ME} descriptionKey='mito-e' descriptionTitle='Mitochondrial Energy (ME)' />

          </div>
          <div></div>
        </SectionTwo>
        <div className=' h-8 '></div>
        <SectionTwo>
          <div className='flex flex-col items-start'>
            <h2 onClick={() => setOpen(<BasicModalElement title={"Cell Danger Response (CDR)"} descriptionKey={"cdr"} />)} className='text-black text-xl cursor-pointer'>Cell Danger Response (CDR)</h2>
            <br />
            <CDR refKey="CDR1" title={"CDR 1"} cdr={currentRecording?.data?.frequencyDomain?.vlf_percentage * 10} descriptionKey='cdr-1' descriptionTitle='CDR - 1' />
            <CDR refKey="CDR2" title={"CDR 2"} cdr={currentRecording?.data?.frequencyDomain?.lf_percentage * 10} descriptionKey='cdr-2' descriptionTitle='CDR - 2' />
            <CDR refKey="CDR3" title={"CDR 3"} cdr={currentRecording?.data?.frequencyDomain?.hf_percentage * 10} descriptionKey='cdr-3' descriptionTitle='CDR - 3' />
          </div>
          <div></div>
        </SectionTwo>

      </DisplayWrapper>
    </>
  )
}

const calculateCMOS = (inflamIndex: number): number => {
  if (inflamIndex >= 1500) {
    return 100
  } else {
    return (inflamIndex * 100) / 1500
  }
}

const evaluateCMOS = (cmos: number) => {
  if (cmos <= 15) {
    return "WNL"
  } else if (cmos > 15 && cmos <= 30) {
    return "MILD CMOS"
  }
  else if (cmos > 30 && cmos <= 50) {
    return "MILD CMOS"
  }
  else if (cmos > 50) {
    return "SEVERE CMOS"
  }
}

const calculateME = (total_power: number): number => {
  if (total_power >= 3000) {
    return 100
  } else {
    return (total_power * 100) / 3000
  }
}

const evaluateME = (me: number) => {
  if (me > 0 && me < 25) {
    return "SEVERE DEFICIENCY"
  } else if (me >= 25 && me < 50) {
    return "MODERATE DEFICIENCY"
  } else if (me >= 50 && me < 75) {
    return "MILD DEFICIENCY"
  } else if (me >= 75 && me <= 100) {
    return "WNL"
  }
} 