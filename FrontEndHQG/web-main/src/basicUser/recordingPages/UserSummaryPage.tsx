import { useMatch } from '@tanstack/react-location'
import { Children, useRef, useState } from 'react'
import brain_20 from "../../brain_images/brain_20.png"
import brain_30 from "../../brain_images/brain_30.png"
import brain_50 from "../../brain_images/brain_50.png"
import brain_60 from "../../brain_images/brain_60.png"
import brain_80 from "../../brain_images/brain_80.png"
import brain_100 from "../../brain_images/brain_100.png"
import { differenceInYears, format } from 'date-fns'
import jp from 'jsonpath'
import html2canvas from "html2canvas";
import { Page, Text, View, Document, pdf, Image } from '@react-pdf/renderer';

import ReactToPrint from 'react-to-print'
import { useAuth } from '../../Hooks/AuthContext'
import { LocationGenerics } from '../../Router/CustomRouter'
import { useUserContext } from '../../Hooks/UserContext'
import { useDescriptionModal } from '../../Hooks/DescriptionModal'
import { Order_By, useGetAllHeartDataForOwnerQuery } from '../../generated/graphql'
import { scaleLinear, scaleThreshold } from 'd3'
import { Dial } from '../../Common/graphs/Dial'
import { BasicModalElement } from '../../Common/Modals/BasicModalElement'
import { TotalPowerBar } from '../../Common/Compositions/TotalPowerBar'
import { StressIndexBar } from '../../Common/Compositions/StressIndexBar'
import { Pie } from '../../Common/graphs/Pie'
import { Loader } from '../../Common/Loader'
import { Print } from '../../Common/icons/Print'
import { UserDisplayWrapper } from './UserDisplayWrapper'


const image_array = [brain_20, brain_30, brain_50, brain_60, brain_80, brain_100]
const brain_value_array = ["0-20%", "21-39%", "40-59%", "60-79%", "80-99%", "100%+"]
const brain_desc_array = ["Highly Stressed", "Moderate Stress", "Exhaustion", "Sub-optimal", "Highly functional", "Optimal State"]


const wellnessDial = [
  {
    name: "0-19%",
    size: 20,
    color: "fill-primary-red"
  },
  {
    name: "20-39%",
    size: 20,
    color: "fill-orange-500"
  },
  {
    name: "40-59%",
    size: 20,
    color: "fill-primary-yellow"
  },
  {
    name: "60-79%",
    size: 20,
    color: "fill-green-500"
  },
  {
    name: "80-100%",
    size: 20,
    color: "fill-primary-green"
  },
]

const stressDial = [
  {
    name: "",
    size: 10,
    color: "fill-primary-blue"
  },
  {
    name: "",
    size: 15,
    color: "fill-primary-green"
  },
  {
    name: "",
    size: 20,
    color: "fill-primary-yellow"
  },
  {
    name: "",
    size: 55,
    color: "fill-primary-red"
  },
]

const inflamDial = [
  {
    name: "",
    size: 16,
    color: "fill-primary-green"
  },
  {
    name: "",
    size: 16,
    color: "fill-primary-yellow"
  },
  {
    name: "",
    size: 33,
    color: "fill-orange-500"
  },
  {
    name: "",
    size: 33,
    color: "fill-primary-red"
  },

]

const bioAgeDial = [
  {
    name: "Below Average",
    size: 30,
    color: "fill-primary-red"
  },

  {
    name: "Average",
    size: 20,
    color: "fill-primary-green"
  },
  {
    name: "Above Average",
    size: 30,
    color: "fill-primary-blue"
  },

]

const stressStages = [
  {
    name: "WNL",
    size: 10,
    color: "fill-primary-green"
  },
  {
    name: "1",
    size: 10,
    color: "fill-green-500"
  },
  {
    name: "2",
    size: 10,
    color: "fill-yellow-300"
  },
  {
    name: "3",
    size: 10,
    color: "fill-primary-yellow"
  },
  {
    name: "4",
    size: 10,
    color: "fill-orange-500"
  },
  {
    name: "5",
    size: 10,
    color: "fill-primary-red"
  },
]

const dataSource = {
  endpoint: import.meta.env.VITE_GRAPHQL_URL,
  fetchParams: {
    headers: {
      // 'Authorization': `Bearer ${auth.user?.token}`,
      'X-Hasura-Admin-Secret': import.meta.env.VITE_GRAPHQL_HEADER
    }
  }
}

export const UserSummaryPage = () => {
  const auth = useAuth()
  const { params: { userId } } = useMatch<LocationGenerics>()
  const { currentRecording } = useUserContext()
  const { setOpen } = useDescriptionModal()
  const [printLoading, setPrintLoading] = useState<boolean>(false)
  const componentRef = useRef(null)


  const { data: subject, isLoading: subjectLoading, refetch: subjectRefetch } = useGetAllHeartDataForOwnerQuery(dataSource, {
    _eq: userId || "",
    id: userId,
    where: {
      owner: { _eq: userId },
      deleted_on: { _is_null: true },
      // ...(query.get('trend') ? { trend_recording: { _eq: query.get('trend') } } : { trend_recording: { _is_null: false } }),
    },
    order_by: Order_By.Desc
  }, {
    enabled: !!userId,
    refetchInterval: 3000
  })



  // console.log("SUB: ", jp.query(subject?.heart_data, '$..data.frequencyDomain'));


  const bioAgeOne = scaleLinear()
    .domain([100, 36])
    .range([20, 49])

  const bioAgeTwo = scaleLinear()
    .domain([36, 0])
    .range([49, 100])


  // const { summaryItems } = useSummary()

  const getBioAge = () => {
    const wi = currentRecording?.data?.wellnessIndex

    if (wi >= 36) {
      return bioAgeOne(wi)
    } else if (wi < 36) {
      return bioAgeTwo(wi)
    } else {
      return 0
    }

  }
  const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);

  const upperRange = [null, 0, 1, 2, 3, 4, 5]
  const lowerRange = [5, 4, 3, 2, 1]

  const scaleHormoneUpperLimit = [[4, 6.0000001, 6.500001, 7.00001, 7.50001, 8.0001], upperRange]
  const scaleHormoneLowerLimit = [[1, 2, 2.7499, 3.4999, 3.999], lowerRange]

  const scaleInflammIndex = scaleThreshold<any, number>()
    .domain([150.000001, 250.000001, 399.99999, 500.00001, 600.000001])
    .range([0, 1, 2, 3, 4, 5])

  const scaleStressIndex = scaleThreshold<any, number>()
    .domain([100.000001, 150.000001, 299.99999, 400.00001, 599.999999])
    .range([0, 1, 2, 3, 4, 5])

  const totalPowerIndex = scaleThreshold<any, number>()
    .domain([500, 750, 999.99999, 1500, 2499.999999])
    .range([0, 1, 2, 3, 4, 5].reverse())

  const checkThresholdUpperThenLowerLimit = (value: number, upperLimit: (number | null)[][], lowerLimit: number[][]): number => {

    const scaleUpperLimit = scaleThreshold<any, number | null>()
      .domain(upperLimit[0])
      .range(upperLimit[1])

    const scaleLowerLimit = scaleThreshold<any, number>()
      .domain(lowerLimit[0])
      .range(lowerLimit[1])

    const upper = scaleUpperLimit(value)

    if (upper === null) {
      return scaleLowerLimit(value)
    }

    return upper
  }

  const scaleStagesOfStress = scaleThreshold<number, number>()
    .domain([4.000001, 8.000001, 12.000001, 16.000001, 20.00001])
    .range([0, 1, 2, 3, 4, 5])

  const calculateStressStage = (cortisolStress: number, DHEAStress: number, InflammStress: number, stressIndexStress: number, totalPowerStress: number): number => {
    const sum =
      checkThresholdUpperThenLowerLimit(cortisolStress, scaleHormoneUpperLimit, scaleHormoneLowerLimit)
      + checkThresholdUpperThenLowerLimit(DHEAStress, scaleHormoneUpperLimit, scaleHormoneLowerLimit)
      + scaleInflammIndex(InflammStress)
      + scaleStressIndex(stressIndexStress)
      + totalPowerIndex(totalPowerStress)
    return scaleStagesOfStress(sum)
  }

  const stageOfStress = calculateStressStage(
    currentRecording?.data?.hormones?.cortisol,
    currentRecording?.data?.hormones?.dhea,
    currentRecording?.data?.inflamIndex,
    currentRecording?.data?.stressIndex,
    currentRecording?.data?.frequencyDomain?.total_power
  )

  return (
    <>

      <div ref={componentRef} id="print-this" style={printLoading ? {
        width: '300mm'
      } : {}}>
        <UserDisplayWrapper>
          <div
            data-html2canvas-ignore="true"
            className='flex flex-row justify-end'>
            <button
              className='flex flex-row items-center border-2 border-charcoal px-2 py-1 rounded-md uppercase text-sm hover:bg-charcoal hover:text-white'
              onClick={async () => {
                setPrintLoading(true)
                const element = document.getElementById("print-this")
                if (!element) {
                  setPrintLoading(false)
                  return
                }
                setTimeout(async () => {

                  const canvas = await html2canvas(element);
                  const image = canvas.toDataURL("image/png", 1.0);

                  const blob = await pdf(<PdfDoc image={image} />).toBlob();
                  const fileUrl = URL.createObjectURL(blob);

                  const w = window.open(fileUrl, '_blank');
                  w && w.focus();
                  setPrintLoading(false)
                }, 100)

              }}>
              {printLoading ?
                <Loader /> :
                <Print />}
              <div className='mr-1'></div>

              Print
            </button>
          </div>

          <ReportRowLayout showRight={false}>
            <div className='flex flex-col justify-center items-center bg-light-grey w-full bg-opacity-10 py-2 px-3 '>
              <h1 className='mt-2'>Summary Report</h1>
              {
                printLoading &&
                <div className='flex flex-col justify-center items-start w-full px-2 bg-opacity-10 '>
                  <div className='mt-2'>
                    <div className='text-charcoal text-md '>{currentRecording?.title}</div>
                    <div className='text-charcoal text-xs'>{format(new Date(currentRecording?.created_on), 'dd MMM yyyy  kk:mm')}</div>
                  </div>
                </div>
              }
              {
                printLoading &&
                <div className='flex flex-col justify-center items-start w-full px-2 mt-2'>
                  <div className='text-charcoal text-md'>{subject?.users_by_pk?.first_name} {subject?.users_by_pk?.last_name}</div>
                  {subject && <div className='text-charcoal text-md'>Age: {differenceInYears(new Date(), new Date(subject.users_by_pk?.birth_date))} </div>}
                  {subject && subject.users_by_pk && subject.users_by_pk.data && <div className='text-charcoal text-md'> Gender:
                    <span className=' capitalize '>
                      {" " + JSON.parse(subject.users_by_pk?.data).data.gender}
                    </span>
                  </div>}
                </div>
              }
            </div>
            <div className=''>
              <h3 className='text-xl'>Performance/Wellness Evaluation</h3>
              <p>The HeartQuest Functional Evaluation with Heart Rate Variability is a sophisticated measurement of the variation in time between each heartbeat from the ECG. It is intended to be used for the education and the observation of peak performance potential of the Autonomic nervous system and the Central Nervous System. The HeartQuest HRV is not intended for the purpose or implication of any disease or condition</p>
            </div>
          </ReportRowLayout>
          <div className=' h-10 '></div>

          <ReportRowLayout showRight={!printLoading} >
            <div className=' flex flex-col justify-center items-center max-w-[200px] '>
              <Dial
                domain={[1, 100]}
                value={currentRecording?.data?.wellnessIndex}
                expanded={auth.graphsExpanded}
                segmentsArray={wellnessDial} />
              <h3>Performance/Wellness</h3>
            </div>
            <div>
              <h3 className='text-xl'>Peak Performance/Wellness Score <span className='bg-desaturated-grey px-3 pb-1 pt-1 rounded-md' >{currentRecording?.data?.wellnessIndex?.toFixed() || "--"}</span>  Optimal 100</h3>
              <p>The overall summary of how your body is performing is reflected in this score. It is the overall representation of how your entire body systems are functioning</p>
              <p>
                The wellness Index takes into account multiple important parameters found in heart rate variability. This index gives a comprehensive gauge as to what direction health is moving
              </p>
              <p>
                <span></span>
                <span className='text-white bg-primary-red px-1  rounded-md text-xs '>1-19%</span>   - Poor level of Peak Performance <br />
                <span className='text-white bg-orange-500 px-1  rounded-md text-xs '>20-39%</span>  - Declining level of Peak Performance <br />
                <span className='text-white bg-primary-yellow px-1  rounded-md text-xs '>40-59%</span>  - Average level of Peak Performance <br />
                <span className='text-white bg-green-500 px-1  rounded-md text-xs '>60-79%</span>  - Green good level of Peak Performance <br />
                <span className='text-white bg-primary-green px-1  rounded-md text-xs '>80-100%</span> - High level of Peak Performance <br />
              </p>
            </div>
            {/* <div>Child Three</div> */}
          </ReportRowLayout>
          <ReportRowLayout showRight={!printLoading} >
            <div>
              <div className=' flex flex-col justify-center items-center max-w-[200px] '>
                <Dial
                  domain={[0, 5]}
                  value={stageOfStress}
                  expanded={auth.graphsExpanded}
                  segmentsArray={stressStages} />
                <h3>Stage of Stress</h3>
              </div>
            </div>
            <div>
              <h3 className='text-xl'>Five Stages of Stress <span className='bg-desaturated-grey px-3 pb-1 pt-1 rounded-md' >{stageOfStress}</span>  Optimal WNL</h3>
              <p>To derive the scores on each of the hormones and inflammatory index as well as the total power the actual scores are used in the calculation and are assigned a rating based on the HQP proprietary scale from 0-5. These scores are added up for the total score to give you the stress level stage. Starting With 0 or with in normal limits. As the numbers get higher there is an indication of increased or prolonged stress physiology based on HRV and its associated parameters and 5 being the highest stage of stress. The goal is to get the score to 0 or WNL</p>
            </div>
          </ReportRowLayout>
          <div className=' h-10 '></div>
          <ReportRowLayout showRight={!printLoading} >
            <div className=' w-[280px] flex flex-col justify-center items-center '>
              <div className='  '>
                <Pie filled={auth.graphsExpanded} definedwidth={200} data={[
                  {
                    value: currentRecording?.data?.frequencyDomain?.vlf_percentage * 100,
                    text: "VLF",
                    subtext: "NeuroH",
                    styleClass: "stroke-primary-red fill-primary-red",
                    onClick: () => setOpen(<BasicModalElement title='VLF - Neuro Hormonal' descriptionKey="vlf" />)
                  },
                  {
                    value: currentRecording?.data?.frequencyDomain?.lf_percentage * 100,
                    text: "LF",
                    subtext: "SNS",
                    styleClass: "stroke-primary-yellow fill-primary-yellow",
                    onClick: () => setOpen(<BasicModalElement title='LF - Sympathetic Nervous System' descriptionKey="lf" />)

                  },
                  {
                    value: currentRecording?.data?.frequencyDomain?.hf_percentage * 100,
                    text: "HF",
                    subtext: "PNS",
                    styleClass: "stroke-primary-green fill-primary-green",
                    onClick: () => setOpen(<BasicModalElement title='HF - Parasympathetic Nervous System' descriptionKey="hf" />)

                  }
                ]} />
              </div>
              <TotalPowerBar totalPower={currentRecording?.data?.frequencyDomain?.total_power} />
              <StressIndexBar value={currentRecording?.data?.stressIndex} />

              {/* <Dial
              domain={[0, 500]}
              value={100}
              expanded={auth.graphsExpanded}
              segmentsArray={stressDial}
            // reverseSegments={false} 
            /> */}
              <h3 >Stress Index</h3>
            </div>
            <div>
              <h3 className='text-xl'>The stress index: Score <span className='bg-desaturated-grey px-3 pb-1 pt-1 rounded-md' >{currentRecording?.data?.stressIndex.toFixed()}</span> Optimal 10-100</h3>
              <p>This represents how much tension is on your Autonomic Nervous system and over 500 is a cardiovascular risk. The stress chemistry we create increases inflammation, decreases immune function and overall health. Red part of the pie represents chronic stress, yellow part is fight or flight response and the green part represents the repair and rejuvenation response   </p>
              <p>
                If total power is low then all pie depictions will be amplified toward  different stages of  an adrenal stress picture and made worse. Decreasing stress chemistry will be important.
              </p>
              <div className='flex flex-row flex-wrap justify-start max-w-[650px] mt-5 gap-2'>

                <div className="flex flex-col items-center" style={{ minWidth: 50 }}>
                  <img src={"https://cms.heartquest-global.com/assets/84ff8c20-40ca-44be-828d-e4f689851a37"} style={{ width: 40, filter: "drop-shadow(0px 0px 7px #999999)" }} alt="brain_image" />
                  <div className='text-black text-xs text-center mt-1'>
                    Balanced
                  </div>
                </div>

                <div className="flex flex-col items-center" style={{ minWidth: 50 }}>
                  <img src={"https://cms.heartquest-global.com/assets/0d9cb661-3b59-43d6-a88a-194cf58d1bf6"} style={{ width: 40, filter: "drop-shadow(0px 0px 7px #999999)" }} alt="brain_image" />
                  <div className='text-black text-xs text-center mt-1'>
                    Fight/flight
                  </div>
                </div>

                <div className="flex flex-col items-center" style={{ minWidth: 50 }}>
                  <img src={"https://cms.heartquest-global.com/assets/345131e5-b759-4247-93a4-608c20876c6f"} style={{ width: 40, filter: "drop-shadow(0px 0px 7px #999999)" }} alt="brain_image" />
                  <div className='text-black text-xs text-center mt-1'>
                    Rest/Digest
                  </div>
                </div>

                <div className="flex flex-col items-center" style={{ minWidth: 50 }}>
                  <img src={"https://cms.heartquest-global.com/assets/f801f569-651f-437c-a5d1-8c8bf3927982"} style={{ width: 40, filter: "drop-shadow(0px 0px 7px #999999)" }} alt="brain_image" />
                  <div className='text-black text-xs text-center mt-1'>
                    Chronic stress
                  </div>
                </div>

              </div>
            </div>
            {/* <div>Child Three</div> */}
          </ReportRowLayout>
          <ReportRowLayout showRight={!printLoading} >
            <div className=' max-w-[280px] flex flex-col justify-center items-center '>
              <div
                className='flex flex-col justify-center'
              // style={{ display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'center', marginTop: 70 }}
              >

                <img
                  className='w-[170px]'
                  src={GetBrainImage(currentRecording?.data?.brain?.brain_power)}
                  style={{ filter: "drop-shadow(0px 0px 7px #999999)" }}
                  alt="brain_image" />
              </div>
              <h3 >Brain Power Spectrum</h3>

            </div>
            <div>
              <h3 className='text-xl'>Brain Power Spectrum: <span className='bg-desaturated-grey px-3 pb-1 pt-1 rounded-md' >{currentRecording?.data?.brain?.brain_power.toFixed() <= 100 ? currentRecording?.data?.brain?.brain_power.toFixed() : 100}</span> Optimal 100</h3>
              <p>Power Spectrum of the brain comes from how the heart interacts with the brain and the brain interacts with the heart. If you have low HRV with Sympathetic dominance; low parasympathetic function or both an excessive amount of red in your pie (neurohormonal) you have shifted to a stress physiology. Stress physiology eventually can create brain inflammation further decreasing the green part of the pie (regeneration and healing) </p>
              <p>
                Below gives an idea of the vitality your CNS as it is reflected in the Brain Power Spectrum Score
              </p>
              <div className='flex flex-row flex-wrap justify-start max-w-[600px] mt-5 gap-2'>
                {
                  image_array.map((img, i) => {
                    return (
                      <div key={i} className="flex flex-col items-center" style={{ minWidth: 50 }}>
                        <img src={img} style={{ width: 40, filter: "drop-shadow(0px 0px 7px #999999)" }} alt="brain_image" />
                        <div className='text-black text-xs text-center mt-1' >
                          {brain_value_array[i]}
                        </div>
                        <div className='text-black text-xs text-center mt-1'>
                          {brain_desc_array[i]}
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>
            {/* <div>Child Three</div> */}
          </ReportRowLayout>
          <ReportRowLayout showRight={!printLoading} >
            <div className=' max-w-[280px] flex flex-col justify-center items-center '>
              <Dial
                domain={[0, 100]}
                value={Math.min(Math.max(currentRecording?.data?.inflamIndex.toFixed(2) / 900 * 100, 0), 100)}
                expanded={auth.graphsExpanded}
                segmentsArray={inflamDial}
              />
              <h3>Inflammation Index</h3>

            </div>
            <div>
              <h3 className='text-xl'>Inflammation Score: <span className='bg-desaturated-grey px-3 pb-1 pt-1 rounded-md' >{currentRecording?.data?.inflamIndex.toFixed(2)}</span> Optimal 75-300</h3>
              <p>Inflammation is a silent killer that causes pain, arthritis, diabetes, heart problems and leads to many health issue. It is like throwing gasoline on the fire. Lower is better.</p>

              <div className='flex flex-row flex-wrap justify-start max-w-[650px] mt-5 gap-2'>

                <div className="flex flex-col items-center" style={{ minWidth: 50 }}>
                  <div className='text-black text-xs text-center mt-1'>
                    <span className='text-white bg-primary-green px-1  rounded-md text-xs '>75-150</span><br />
                    Within <br />
                    Normal <br />
                    Limit <br />
                    (WNL) <br />
                  </div>
                </div>

                <div className="flex flex-col items-center" style={{ minWidth: 50 }}>
                  <div className='text-black text-xs text-center mt-1'>
                    <span className='text-white bg-primary-yellow px-1  rounded-md text-xs '>150-300</span><br />
                    Slightly <br />
                    Elevated <br />
                  </div>
                </div>

                <div className="flex flex-col items-center" style={{ minWidth: 50 }}>
                  <div className='text-black text-xs text-center mt-1'>
                    <span className='text-white bg-orange-500 px-1  rounded-md text-xs '>300-600</span><br />
                    Moderately <br />
                    Elevated <br />
                  </div>
                </div>

                <div className="flex flex-col items-center" style={{ minWidth: 50 }}>
                  <div className='text-black text-xs text-center mt-1'>
                    <span className='text-white bg-primary-red px-1  rounded-md text-xs '>600</span><br />
                    Highly <br />
                    Elevated <br />
                  </div>
                </div>

              </div>

            </div>
          </ReportRowLayout>
          <ReportRowLayout showRight={!printLoading} >
            <div className=' max-w-[280px] flex flex-col justify-center items-center py-2'>
              <Dial
                domain={[-10, 10]}
                value={clamp(differenceInYears(new Date(), new Date(subject?.users_by_pk?.birth_date)) - getBioAge(), -10, 10)}
                expanded={auth.graphsExpanded}
                segmentsArray={bioAgeDial}
              />
              <h3>Actual Age vs. Biological Age</h3>
            </div>
            <div>
              <div className='text-xl'>
                Actual Age <span className='bg-desaturated-grey px-3 pb-1 pt-1 rounded-md mx-1' >{differenceInYears(new Date(), new Date(subject?.users_by_pk?.birth_date))}</span>
                vs.
                Biological Age <span className='bg-desaturated-grey px-3 pb-1 pt-1 rounded-md mx-1' >{Math.ceil(getBioAge()) || "--"}</span>
              </div>
              <p>
                This score is correlated with healthy people for your age and with age Heart Rate Variability declines. You want to be younger than the averages for your age.
              </p>
            </div>
          </ReportRowLayout>
          {/* <div>
          {summaryItems &&
            summaryItems.map((d) => {
              return (<div className='flex flex-col'>
                <div className='py-1'>{d.metadata.title} is too <span className={`text-xs px-2 pb-[2px] rounded-md text-white capitalize  ${d.reason === "LOW" ? "bg-primary-blue" : null} ${d.reason === "HIGH" ? "bg-primary-red" : null}`}>{d.reason.toLowerCase()}</span></div>

              </div>)
            })
          }
        </div> */}
          {/* <pre>
        {recording && values && values.data &&
          JSON.stringify(buildReport(summariseRecording(recording, values.data.values), restructureValuesMetadata(values.data.values)), null, 2)
        }
      </pre>
      <SectionTwo >
        <div>{values && values.data &&
          <pre>{JSON.stringify(restructureValuesMetadata(values.data.values), null, 2)}</pre>
        }
        </div>
        <pre>{
          recording && values && values.data &&
          JSON.stringify(summariseRecording(recording, values.data.values), null, 1)
        }</pre>
      </SectionTwo> */}
        </UserDisplayWrapper>
      </div>
    </>
  )
}

type ReportRowLayoutProps = {
  children: React.ReactNode
  showRight: boolean
}


const ReportRowLayout = ({ showRight = true, children }: ReportRowLayoutProps) => {

  const childrenArray = Children.toArray(children)

  return (<>
    <div className='flex flex-row flex-wrap gap-2 mt-4' >
      <div className='flex min-w-[320px] justify-center '>{childrenArray[0]}</div>
      <div className='flex flex-1 min-w-[320px] pt-6'>{childrenArray[1]}</div>
      {showRight ?
        <div className='flex min-w-[320px] justify-center '>{childrenArray[2]}</div>
        : null
      }
    </div>
  </>)
}

const GetBrainImage = (value: number) => {
  switch (true) {
    case (value < 20):
      return brain_20
    case (value >= 20 && value < 39):
      return brain_30
    case (value >= 39 && value < 59):
      return brain_50
    case (value >= 59 && value < 79):
      return brain_60
    case (value >= 79 && value < 99):
      return brain_80
    case (value >= 99):
      return brain_100
    default:
      break;
  }
}

// Create Document Component
export const PdfDoc = ({ image }: { image: string }) => (
  <Document>
    <Page size="A4" style={{
      flexDirection: 'row',
      justifyContent: 'center',
      // backgroundColor: '#E4E4E4'
    }}>
      <View style={{
        padding: 15
      }}>
        <Image src={image} style={{ width: 'auto', height: "auto" }} />
      </View>

    </Page>
    <Page size="A4" style={{
      flexDirection: 'column',
      justifyContent: 'flex-start',
      // backgroundColor: '#E4E4E4'
    }}>
      <View style={{
        padding: 25
      }}>
        <Text>Notes</Text>
      </View>
      {
        Array.from(Array(20).keys()).map(() => {
          return (
            <View style={{
              display: 'flex',
              flexDirection: "row",
              // backgroundColor: "green",
              height: 20,
              borderBottom: "1px solid #999",
              marginLeft: 25,
              marginRight: 25
            }}>
              {/* <Text>Hello</Text> */}
            </View>
          )
        })
      }

    </Page>
  </Document>
);