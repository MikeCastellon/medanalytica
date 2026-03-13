import { useMatch, useNavigate } from '@tanstack/react-location'
import { useActor } from '@xstate/react'
import { differenceInYears, format } from 'date-fns'
import { useRef } from 'react'
import ReactToPrint from 'react-to-print'
import { CollapsiblePanel } from '../Common/CollapsiblePanel'
import { TotalPowerBar } from '../Common/Compositions/TotalPowerBar'
import { DisplayWrapper } from '../Common/DisplayWrapper'
import { BarGraph } from '../Common/graphs/BarGraph'
import { ChakraDiagram } from '../Common/graphs/ChakraDiagram'
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


const dataSource = {
  endpoint: import.meta.env.VITE_GRAPHQL_URL,
  fetchParams: {
    headers: {
      // 'Authorization': `Bearer ${auth.user?.token}`,
      'X-Hasura-Admin-Secret': import.meta.env.VITE_GRAPHQL_HEADER
    }
  }
}


export const Ayurvedic = () => {
  const [compareState, send] = useActor(compareMachine)
  const navigate = useNavigate()
  const auth = useAuth()
  const { setOpen } = useDescriptionModal()
  const { params: { userId, subjectId, recordingId }, data: {
    // currentRecording
  } } = useMatch<LocationGenerics>()
  const { currentRecording } = useUserContext()
  const componentRef = useRef(null);


  const doshasTotalPower = currentRecording?.data.doshas.vata + currentRecording?.data.doshas.pitta + currentRecording?.data.doshas.kapha
  const vataPercentage = currentRecording?.data.doshas.vata / doshasTotalPower * 100
  const pittaPercentage = currentRecording?.data.doshas.pitta / doshasTotalPower * 100
  const kaphaPercentage = currentRecording?.data.doshas.kapha / doshasTotalPower * 100

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
              documentTitle={"HeartQuest-Ayurvedic"}
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
                  navigate({ to: `/${userId}/dashboard/${subjectId}/r/compare/ayurvedic`, replace: true })
              }}
            >COMPARE</button>
          </div>
        </div>
        <SectionTwo>
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
                onClick: () => setOpen(<BasicModalElement title='Kapha' descriptionKey="kapha" />)
              }
            ]} />

            <TotalPowerBar totalPower={currentRecording?.data.frequencyDomain.total_power} />

          </div>
          <CollapsiblePanel title={"Dosha Distribution"} content={"Need description"} />
        </SectionTwo>
        <div className='mt-8'></div>
        <SectionTwo>
          <div>
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
          <CollapsiblePanel title={"Vata Summary"} content={
            <>
              <SpecificExplanationItem value={currentRecording?.data.doshas.vataSub.prana} refKey={"prana"} />
              <SpecificExplanationItem value={currentRecording?.data.doshas.vataSub.apana} refKey={"apana"} />
              <SpecificExplanationItem value={currentRecording?.data.doshas.vataSub.udana} refKey={"udana"} />
              <SpecificExplanationItem value={currentRecording?.data.doshas.vataSub.samana} refKey={"samana"} />
              <SpecificExplanationItem value={currentRecording?.data.doshas.vataSub.vyana} refKey={"vyana"} />
            </>
          } />
        </SectionTwo>
        <div className='mt-8'></div>
        <SectionTwo>
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
          <CollapsiblePanel title={"Pitta Summary"} content={
            <>
              <SpecificExplanationItem value={currentRecording?.data.doshas.pittaSub.sadhaka} refKey={"sadhaka"} />
              <SpecificExplanationItem value={currentRecording?.data.doshas.pittaSub.pachaka} refKey={"pachaka"} />
              <SpecificExplanationItem value={currentRecording?.data.doshas.pittaSub.alochaka} refKey={"alochaka"} />
              <SpecificExplanationItem value={currentRecording?.data.doshas.pittaSub.bhrajaka} refKey={"bhrajaka"} />
              <SpecificExplanationItem value={currentRecording?.data.doshas.pittaSub.ranjaka} refKey={"ranjaka"} />
            </>
          } />
        </SectionTwo>
        <div className='mt-8'></div>
        <SectionTwo>
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
          <CollapsiblePanel title={"Kapha Summary"} content={
            <>
              <SpecificExplanationItem value={currentRecording?.data.doshas.kaphaSub.kledaka} refKey={"kledaka"} />
              <SpecificExplanationItem value={currentRecording?.data.doshas.kaphaSub.sleshaka} refKey={"sleshaka"} />
              <SpecificExplanationItem value={currentRecording?.data.doshas.kaphaSub.bodhaka} refKey={"bodhaka"} />
              <SpecificExplanationItem value={currentRecording?.data.doshas.kaphaSub.avalambaka} refKey={"avalambaka"} />
              <SpecificExplanationItem value={currentRecording?.data.doshas.kaphaSub.tarpaka} refKey={"tarpaka"} />
            </>
          } />
        </SectionTwo>
        {/* <SectionTwo>
        <div>
          <h2 className='ml-8'>Tissues</h2>
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
        <CollapsiblePanel title={"Tissues"} content={"Need description"} />
      </SectionTwo> */}
        <SectionTwo >
          <div className='mt-8'>
            <h2 className='ml-8 text-black text-xl'>Energy Plexus</h2>
            <ChakraDiagram data={currentRecording?.data} />
          </div>
          <div></div>
        </SectionTwo>

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

          <div className=' ml-32 '>

            <Pie filled={auth.graphsExpanded} data={[
              {
                value: vataPercentage,
                text: "V",
                subtext: "Vata",
                styleClass: "stroke-primary-red fill-primary-red",
                // onClick: () => setOpen(<BasicModalElement title='Vata' descriptionKey="vata" />)
              },
              {
                value: pittaPercentage,
                text: "P",
                subtext: "Pitta",
                styleClass: "stroke-primary-yellow fill-primary-yellow",
                // onClick: () => setOpen(<BasicModalElement title='Pitta' descriptionKey="pitta" />)
              },
              {
                value: kaphaPercentage,
                text: "K",
                subtext: "Kapha",
                styleClass: "stroke-primary-green fill-primary-green",
                // onClick: () => setOpen(<BasicModalElement title='Kapha' descriptionKey="kapha" />)
              }
            ]} />
          </div>


          <div className='' style={{
            width: "180mm"
          }}>
            <TotalPowerBar totalPower={currentRecording?.data.frequencyDomain.total_power} />
          </div>

          <div className='flex flex-col' style={{
            height: "100mm"
          }}>
            <h2 className='ml-8'>Vata</h2>
            <div className='flex flex-row justify-start items-start pl-4' style={{
              height: "100mm"
            }}>
              {
                currentRecording?.data.doshas.vataSub ?
                  <BarGraph
                    yScale={[0, 10]}
                    valueRange={[1.01, 3.6]}
                    colourRange={['primary-yellow', 'primary-green', 'primary-red']}
                    expanded={auth.graphsExpanded}
                    object={currentRecording?.data.doshas.vataSub}
                    accessors={['prana', 'apana', 'udana', 'samana', 'vyana']}
                    labels={['V1', 'V2', 'V3', 'V4', 'V5']}
                  /> : null
              }
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



          <div className='flex flex-col' style={{
            height: "100mm"
          }}>
            <h2 className='ml-8'>Pitta</h2>
            <div className='flex flex-row justify-start items-start pl-4' style={{
              height: "100mm"
            }}>
              {
                currentRecording?.data.doshas.pittaSub ?
                  <BarGraph
                    yScale={[0, 10]}
                    valueRange={[1.01, 3.6]}
                    colourRange={['primary-yellow', 'primary-green', 'primary-red']}
                    expanded={auth.graphsExpanded}
                    object={currentRecording?.data.doshas.pittaSub}
                    accessors={['sadhaka', 'pachaka', 'alochaka', 'bhrajaka', 'ranjaka']}
                    labels={['P1', 'P2', 'P3', 'P4', 'P5']}
                  />
                  : null
              }
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

          <div style={{
            height: "40mm"
          }}></div>

          <div className='flex flex-col' style={{
            height: "100mm"
          }}>
            <h2 className='ml-8'>Kapha</h2>
            <div className='flex flex-row justify-start items-start pl-4' style={{
              height: "100mm"
            }}>
              {
                currentRecording?.data.doshas.kaphaSub ?
                  <BarGraph
                    yScale={[0, 10]}
                    valueRange={[1.01, 3.6]}
                    colourRange={['primary-yellow', 'primary-green', 'primary-red']}
                    expanded={auth.graphsExpanded}
                    object={currentRecording?.data.doshas.kaphaSub}
                    accessors={['kledaka', 'sleshaka', 'bodhaka', 'avalambaka', 'tarpaka']}
                    labels={['K1', 'K2', 'K3', 'K4', 'K5']}
                  />
                  : null
              }
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

          <div className='mt-8' style={{ width: "137mm" }}>
            <h2 className='ml-8'>Energy Plexus</h2>
            <ChakraDiagram data={currentRecording?.data} />
          </div>

        </div>
      </div>
    </>
  )
}
