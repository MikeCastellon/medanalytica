import { useMatch, useNavigate } from '@tanstack/react-location'
import { useQueryClient } from '@tanstack/react-query'
import { useActor } from '@xstate/react'
import axios from 'axios'
import { bin, DSVRowArray, histogram } from 'd3'
import { differenceInYears, format } from 'date-fns'
import React, { Suspense, useCallback, useEffect, useRef, useState } from 'react'
import ReactToPrint from 'react-to-print'
import { CollapsiblePanel } from '../Common/CollapsiblePanel'
import { DisplayWrapper } from '../Common/DisplayWrapper'
import EcgGraph from '../Common/graphs/EcgGraph'
import { Histogram } from '../Common/graphs/Histogram'
import { Rhythmogram } from '../Common/graphs/Rhythmogram'
import { ScatterData, Scattergram } from '../Common/graphs/Scattergram'
import ScattergramRRDisplay from '../Common/graphs/ScattergramRRDisplay'
import { Print } from '../Common/icons/Print'
import { BasicModalElement } from '../Common/Modals/BasicModalElement'
import { SectionTwo } from '../Common/SectionTwo'
import { SpecificExplanationItem } from '../Common/SpecificExplanationItem'
import { ValueBox } from '../Common/ValueBox'
import { Heart_Data, Order_By, Rr_Metadata, useGetAllHeartDataForOwnerQuery } from '../generated/graphql'
import { useDescriptionModal } from '../Hooks/DescriptionModal'
import { useUserContext } from '../Hooks/UserContext'
import { LocationGenerics } from '../Router/CustomRouter'
import { compareMachine } from '../Services/CompareRecordingMachine'
import { getEcg } from '../Services/FilesFetchService'
import { findRecordingById } from '../utils/functionUtils'
const source = axios.CancelToken.source()

const dataSource = {
  endpoint: import.meta.env.VITE_GRAPHQL_URL,
  fetchParams: {
    headers: {
      // 'Authorization': `Bearer ${auth.user?.token}`,
      'X-Hasura-Admin-Secret': import.meta.env.VITE_GRAPHQL_HEADER
    }
  }
}


export const Cardio = () => {
  const [compareState, send] = useActor(compareMachine)
  const componentRef = useRef(null);

  const navigate = useNavigate()

  const { params: { userId, subjectId, recordingId } } = useMatch<LocationGenerics>()

  const { currentRecording } = useUserContext()

  const queryClient = useQueryClient()
  const { setOpen } = useDescriptionModal()

  const [ecgData, setEcgData] = useState<Number[]>([])
  const [loadingEcg, setLoadingEcg] = useState(false)
  const [scatterData, setScatterData] = useState<ScatterData[] | []>([])
  const SAMPLE_FACTOR = 1

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



  const data: DSVRowArray | undefined = queryClient.getQueryData([currentRecording?.ecg_file?.id])
  // console.log("DATA:", data);

  const ecgFunc = useCallback(
    (res: DSVRowArray) => {
      const column = res.columns[0]

      const arr = [];
      const maxVal = res.length;
      const delta = Math.floor(res.length / maxVal);
      // console.log(delta)

      for (let i = 0; i < res.length; i = i + delta) {
        arr.push(res[i]);
      }

      // console.log(res.length)
      const ecgdata = arr.map((d: any) => Number(d[column]))
      // console.log(ecgdata);

      setEcgData(ecgdata)
      setLoadingEcg(false)
    },
    [recordingId],
  )

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
  }, [recordingId])



  useEffect(() => {
    setLoadingEcg(true)
    if (currentRecording?.ecg_file?.id === undefined) {
      return
    }


    if (!data) {
      queryClient.fetchQuery([currentRecording?.ecg_file?.id], getEcg(currentRecording?.ecg_file?.id), {
        networkMode: 'offlineFirst',
        staleTime: 1000 * 60 * 60,
      })
        .then((res) => {
          ecgFunc(res)
        })
        .catch(error => {
          console.log(error)
          setLoadingEcg(false)
        })
    } else {
      ecgFunc(data)
    }

    if (currentRecording?.rr_metadata?.rrs) {

      scatterDataFn(currentRecording.rr_metadata.rrs)
      // setRythmData(rdata)
    }

    return () => {
      source.cancel()
    }
  }, [recordingId])

  return (
    <>

      <DisplayWrapper>
        <div className='flex '>
          <div>
            <h2 className='text-black'>Electrocardiogram</h2>
            <div className='text-sm text-black mt-2'>RR Details:</div>
            <div className='text-xs text-black'>Rejections:  {currentRecording?.rr_metadata?.total_rejected.toFixed()} | Threshold: {currentRecording?.rr_metadata?.threshold.toFixed()} | Mean: {currentRecording?.rr_metadata?.mean.toFixed()} | Min: {currentRecording?.rr_metadata?.min.toFixed()} | Max: {currentRecording?.rr_metadata?.max.toFixed()}</div>
          </div>
          <div className='flex-1'></div>
          <div className='flex flex-row items-center gap-1'>
            <ReactToPrint
              content={() => componentRef.current}
              documentTitle={"HeartQuest-Cardio"}
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
                  navigate({ to: `/${userId}/dashboard/${subjectId}/r/compare/`, replace: true })
              }}
            >COMPARE</button>
          </div>
        </div>
        {loadingEcg ? <div className='flex flex-row h-40 justify-center items-center mt-4'>
          <svg aria-hidden="true" className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-charcoal" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
          <span className="sr-only">Loading...</span>
        </div> : null
        }


        {(ecgData.length && !loadingEcg) ?
          // <div className='  '>
          <EcgGraph data={ecgData} filteredRR={currentRecording?.rr_metadata?.rrs} />
          // </div>
          : null
        }
        <div className='cursor-pointer mt-12 mb-4'
          onClick={() => setOpen(<BasicModalElement title='Rhythmogram' descriptionKey="rhythmogram" />)}>

          <h2 className='text-black'>Rhythmogram</h2>
          {currentRecording && currentRecording?.rr_metadata?.rrs &&
            <Rhythmogram data={currentRecording.rr_metadata.rrs} />
          }
        </div>
        <SectionTwo>
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
          <CollapsiblePanel title={"Values Summary"} content={
            <>
              <SpecificExplanationItem value={currentRecording?.data.hrvIndex} refKey={"hrvIndex"} />
              <SpecificExplanationItem value={currentRecording?.data.bpm} refKey={"bpm"} />
              <SpecificExplanationItem value={currentRecording?.data.stressIndex} refKey={"stressIndex"} />
              <SpecificExplanationItem value={currentRecording?.data.amo} refKey={"amo"} />
            </>
          } />
        </SectionTwo>
        <SectionTwo >
          <div
            className='cursor-pointer mt-8'
            onClick={() => setOpen(<BasicModalElement title='Histogram Details' descriptionKey="histogram" />)}>
            <h2 className='text-black mt-2'>Histogram</h2>
            {currentRecording && currentRecording?.rr_metadata?.rrs &&
              <Histogram data={currentRecording.rr_metadata.rrs} />
            }
          </div>
          <CollapsiblePanel title={"Histogram Summary"} content={
            <>
              <SpecificExplanationItem value={currentRecording?.data.amo} refKey={"amo"} />
            </>
          } />
          {/* <CollapsiblePanel title={"Histogram"} content={"Need description"} /> */}
        </SectionTwo>
        <SectionTwo >
          <div
            className='cursor-pointer'
            onClick={() => setOpen(<BasicModalElement title='Scattergram Details' descriptionKey="scattergram" />)}
          >
            <h2 className='text-black'>Scattergram</h2>
            {/* {scatterData &&
            <Scattergram data={scatterData} />
          } */}
            {scatterData.length > 0 &&
              <ScattergramRRDisplay scatterData={scatterData} />
            }
          </div>
          <div></div>
          {/* <CollapsiblePanel title={"Scattergram"} content={"Need description"} /> */}
        </SectionTwo>

      </DisplayWrapper>
      <div style={{
        width: "210mm",
        height: "297mm",
        display: "none"
      }}>
        <div ref={componentRef}

        >

          <div className='flex flex-col justify-center items-start w-full bg-opacity-10 ' style={{
            width: "210"
          }}>
            <div className='mt-2'>
              <div className='text-charcoal text-md '>{currentRecording?.title}</div>
              <div className='text-charcoal text-xs'>{currentRecording?.created_on ? format(new Date(currentRecording?.created_on), 'dd MMM yyyy  kk:mm') : null}</div>
            </div>
          </div>

          <div className='flex flex-col justify-center items-start w-full  mt-2' style={{
            width: "210mm"
          }}>
            <div className='text-charcoal text-md'>{subject?.users_by_pk?.first_name} {subject?.users_by_pk?.last_name}</div>
            {subject && <div className='text-charcoal text-md'>Age: {differenceInYears(new Date(), new Date(subject.users_by_pk?.birth_date))} </div>}
            {subject && subject.users_by_pk && subject.users_by_pk.data && <div className='text-charcoal text-md'> Gender:
              <span className=' capitalize '>
                {" " + JSON.parse(subject.users_by_pk?.data).data.gender}
              </span>
            </div>}
          </div>


          <div style={{
            width: "210mm"
          }}>
            <div className='text-sm text-primary-grey mt-4'>RR Details:</div>
            <div className='text-xs text-primary-grey'>Rejections:  {currentRecording?.rr_metadata?.total_rejected.toFixed()} | Threshold: {currentRecording?.rr_metadata?.threshold.toFixed()} | Mean: {currentRecording?.rr_metadata?.mean.toFixed()} | Min: {currentRecording?.rr_metadata?.min.toFixed()} | Max: {currentRecording?.rr_metadata?.max.toFixed()}</div>
          </div>

          <div className='flex flex-col justify-start cursor-pointer mt-12 mb-4'
          // style={{
          //   width: "210mm"
          // }}
          >
            <h2>Rhythmogram</h2>
            {currentRecording && currentRecording?.rr_metadata?.rrs &&
              <Rhythmogram data={currentRecording.rr_metadata.rrs} />
            }
          </div>
          <div className=''
            style={{
              width: "210mm"
            }}>
            <div className='flex flex-wrap gap-4'>
              <ValueBox
                // onClick={() => setOpen(<BasicModalElement title='HRV Index' descriptionKey="hrvIndex" />)}
                valueKey={"val"}
                value={currentRecording?.data?.hrvIndex}
                title={"HRV Index"}
                idealRange={[6, 25]}
                colourRange={["text-primary-red", "text-primary-green", "text-primary-red"]}
                valueRange={[5, 25]}
              />
              <ValueBox
                // onClick={() => setOpen(<BasicModalElement title='BPM - Beats Per Minute' descriptionKey="bpm" />)}
                valueKey={"val"}
                value={currentRecording?.data?.bpm}
                title={"Heart Rate"}
                idealRange={[60, 84]}
                colourRange={["text-primary-red", "text-primary-green", "text-primary-red"]}
                valueRange={[59, 84]}
              />
              <ValueBox
                // onClick={() => setOpen(<BasicModalElement title='Stress Index' descriptionKey="stressIndex" />)}
                valueKey={"val"}
                value={currentRecording?.data?.stressIndex}
                title={"Stress Index"}
                idealRange={[10, 100]}
                colourRange={["text-primary-red", "text-primary-green", "text-primary-red"]}
                valueRange={[9, 100]}
              />
              <ValueBox
                // onClick={() => setOpen(<BasicModalElement title='aMo%' descriptionKey="amo" />)}
                valueKey={"val"}
                value={currentRecording?.data?.amo * 100}
                title={"aMo%"}
                idealRange={[30, 50]}
                colourRange={["text-primary-red", "text-primary-green", "text-primary-red"]}
                valueRange={[29, 51]}

              />
            </div>
          </div>
          <div className='flex flex-row mt-6 gap-3' >

            <div className='flex flex-row'>
              <h2>Histogram</h2>
              <div className=' mt-44 '></div>
              <div className='flex flex-row justify-center w-full mt-44'>
                {currentRecording && currentRecording?.rr_metadata?.rrs &&
                  <Histogram data={currentRecording.rr_metadata.rrs} />
                }
              </div>
            </div>

            <div className='flex flex-row'>
              <h2>Scattergram</h2>
              <div className='flex flex-row w-full'>
                {scatterData.length > 0 &&
                  <ScattergramRRDisplay scatterData={scatterData} />
                }
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
