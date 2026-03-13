import { Navigate, useMatch, useNavigate } from '@tanstack/react-location';
import { max } from 'd3';
import React, { useMemo, useRef } from 'react';
import { Area, AreaChart, ResponsiveContainer, YAxis } from 'recharts';
import { NeuroTransmitterCollection } from '../Common/Compositions/NeuroTransmitterCollection';
import { DisplayWrapper } from '../Common/DisplayWrapper';
import { Dial } from '../Common/graphs/Dial';
import { HorisontalBar } from '../Common/graphs/HorisontalBar';
import { SectionTwo } from '../Common/SectionTwo';
import { useAuth } from '../Hooks/AuthContext';
import { LocationGenerics } from '../Router/CustomRouter';
import { findRecordingById } from '../utils/functionUtils';
import brain_20 from '../brain_images/brain_20.png';
import brain_30 from '../brain_images/brain_30.png';
import brain_50 from '../brain_images/brain_50.png';
import brain_60 from '../brain_images/brain_60.png';
import brain_80 from '../brain_images/brain_80.png';
import brain_100 from '../brain_images/brain_100.png';
import { useQuery } from '@tanstack/react-query';
import {
  Order_By,
  useGetAllHeartDataForOwnerQuery,
  useGetBrainDescriptionQuery,
} from '../generated/graphql';
import { Popover } from '@radix-ui/react-popover';
import _ from 'lodash';
import { useDescriptionModal } from '../Hooks/DescriptionModal';
import { BasicModalElement } from '../Common/Modals/BasicModalElement';
import { CollapsiblePanel } from '../Common/CollapsiblePanel';
import { SpecificExplanationItem } from '../Common/SpecificExplanationItem';
import { ValueTextBox } from '../Common/ValueTextBox';
import { BrainAccordianModalElement } from '../Common/Modals/BrainAccordianModalElement';
import { BrainRawScoresAccordianModalElement } from '../Common/Modals/BrainRawScoresAccordianModalElement';
import { useActor } from '@xstate/react';
import { compareMachine } from '../Services/CompareRecordingMachine';
import { useUserContext } from '../Hooks/UserContext';
import { Print } from '../Common/icons/Print';
import ReactToPrint from 'react-to-print';
import { differenceInYears, format } from 'date-fns';

const dataSource = {
  endpoint: import.meta.env.VITE_GRAPHQL_URL,
  fetchParams: {
    headers: {
      // 'Authorization': `Bearer ${auth.user?.token}`,
      'X-Hasura-Admin-Secret': import.meta.env.VITE_GRAPHQL_HEADER,
    },
  },
};

export const maxCalc = (arr: GraphData[]): number => {
  return max(arr, (d) => d.y) || 0;
};

export const image_array = [
  brain_20,
  brain_30,
  brain_50,
  brain_60,
  brain_80,
  brain_100,
];
const brain_key_array: string[] = [
  'brain_20',
  'brain_30',
  'brain_50',
  'brain_60',
  'brain_80',
  'brain_100',
];
export const brain_value_array = [
  '0-20%',
  '21-39%',
  '40-59%',
  '60-79%',
  '80-99%',
  '100%+',
];

export const Brain = () => {
  const [compareState, send] = useActor(compareMachine);
  const navigate = useNavigate();
  const auth = useAuth();
  const { setOpen } = useDescriptionModal();
  const {
    params: { userId, subjectId, recordingId },
    data: {
      // currentRecording
    },
  } = useMatch<LocationGenerics>();
  const { currentRecording } = useUserContext();

  if (!currentRecording || !currentRecording.brain_spectrum) {
    return <Navigate to={`/login`} />;
  }

  const componentRef = useRef(null);

  const {
    data: subject,
    isLoading: subjectLoading,
    refetch: subjectRefetch,
  } = useGetAllHeartDataForOwnerQuery(
    dataSource,
    {
      _eq: subjectId || '',
      id: subjectId,
      where: {
        owner: { _eq: subjectId },
        deleted_on: { _is_null: true },
        // ...(query.get('trend') ? { trend_recording: { _eq: query.get('trend') } } : { trend_recording: { _is_null: false } }),
      },
      order_by: Order_By.Desc,
    },
    {
      enabled: !!subjectId,
      refetchInterval: 3000,
    }
  );

  const delta: GraphData[] = currentRecording?.brain_spectrum.delta;
  const theta: GraphData[] = currentRecording.brain_spectrum.theta;
  let alphaReversed = [...currentRecording.brain_spectrum.alpha].reverse();
  const alpha: GraphData[] = alphaReversed;
  let betaReversed = [...currentRecording.brain_spectrum.beta].reverse();
  const beta: GraphData[] = betaReversed;
  let hbetaReversed = [...currentRecording.brain_spectrum.hbeta].reverse();
  const hbeta: GraphData[] = hbetaReversed;
  const graphHeight = 200;
  const maxYs = [
    maxCalc(delta),
    maxCalc(theta),
    maxCalc(alpha),
    maxCalc(beta),
    maxCalc(hbeta),
  ];
  const yDomain = [0, max(maxYs) || 200];
  const total_power = currentRecording?.data?.brain?.total_power;

  return (
    <>
      <DisplayWrapper>
        <div className=" mt-8 "></div>
        <div className="flex ">
          <div className="flex-1"></div>
          <div className="flex flex-row items-center gap-1">
            <ReactToPrint
              content={() => componentRef.current}
              documentTitle={'HeartQuest-Brain'}
              removeAfterPrint
              trigger={() => (
                <button>
                  <Print />
                </button>
              )}
            />
            <button
              type="button"
              className="px-2  text-sm border-2 border-charcoal rounded-md hover:bg-charcoal hover:text-white"
              onClick={() => {
                currentRecording &&
                  send(['START', { type: 'SELECT', value: currentRecording }]);
                currentRecording &&
                  navigate({
                    to: `/${userId}/dashboard/${subjectId}/r/compare/brain`,
                    replace: true,
                  });
              }}
            >
              COMPARE
            </button>
          </div>
        </div>
        <SectionTwo>
          <div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                height: graphHeight,
                width: '100%',
              }}
            >
              <div
                style={{ flex: 1, cursor: 'pointer' }}
                onClick={() => {
                  setOpen(
                    <BasicModalElement title="Delta" descriptionKey="delta" />
                  );
                }}
              >
                <BrainHeading
                  heading={'Delta'}
                  power={`${(
                    (currentRecording?.data?.brain?.delta / total_power) *
                    100
                  ).toFixed()}% - ${currentRecording?.data?.brain?.delta.toFixed()}`}
                />
                <BrainGraph
                  id="delta"
                  graphData={delta}
                  graphHeight={graphHeight}
                  yDomain={yDomain}
                  color={'#BF362D'}
                />
              </div>
              <div
                style={{ flex: 1, cursor: 'pointer' }}
                onClick={() =>
                  setOpen(
                    <BasicModalElement title="Theta" descriptionKey="theta" />
                  )
                }
              >
                <BrainHeading
                  heading={'Theta'}
                  power={`${(
                    (currentRecording?.data?.brain?.theta / total_power) *
                    100
                  ).toFixed()}% - ${currentRecording?.data?.brain?.theta.toFixed()}`}
                />
                <BrainGraph
                  id="theta"
                  graphData={theta}
                  graphHeight={graphHeight}
                  yDomain={yDomain}
                  color={'#E8C401'}
                />
              </div>
              <div
                style={{ flex: 1, cursor: 'pointer' }}
                onClick={() =>
                  setOpen(
                    <BasicModalElement title="Alpha" descriptionKey="alpha" />
                  )
                }
              >
                <BrainHeading
                  heading={'Alpha'}
                  power={`${(
                    (currentRecording?.data?.brain?.alpha / total_power) *
                    100
                  ).toFixed()}% - ${currentRecording?.data?.brain?.alpha.toFixed()}`}
                />
                <BrainGraph
                  id="alpha"
                  graphData={alpha}
                  graphHeight={graphHeight}
                  yDomain={yDomain}
                  color={'#03952C'}
                />
              </div>
              <div
                style={{ flex: 1, cursor: 'pointer' }}
                onClick={() =>
                  setOpen(
                    <BasicModalElement title="Beta" descriptionKey="beta" />
                  )
                }
              >
                <BrainHeading
                  heading={'Beta'}
                  power={`${(
                    (currentRecording?.data?.brain?.beta / total_power) *
                    100
                  ).toFixed()}% - ${currentRecording?.data?.brain?.beta.toFixed()}`}
                />
                <BrainGraph
                  id="beta"
                  graphData={beta}
                  graphHeight={graphHeight}
                  yDomain={yDomain}
                  color={'#2D93BF'}
                />
              </div>
              <div
                style={{ flex: 1, cursor: 'pointer' }}
                onClick={() =>
                  setOpen(
                    <BasicModalElement
                      title="High Beta"
                      descriptionKey="hbeta"
                    />
                  )
                }
              >
                <BrainHeading
                  heading={'High Beta'}
                  power={`${(
                    (currentRecording?.data?.brain?.hbeta / total_power) *
                    100
                  ).toFixed()}% - ${currentRecording?.data?.brain?.hbeta?.toFixed()}`}
                />
                <BrainGraph
                  id="hbeta"
                  graphData={hbeta}
                  graphHeight={graphHeight}
                  yDomain={yDomain}
                  color={'#9337DB'}
                />
              </div>
            </div>
            <h2 className="mt-6">Neurotransmitters</h2>
            <NeuroTransmitterCollection currentRecording={currentRecording} />
            <CollapsiblePanel
              title={'Neurotransmitters Summary'}
              content={
                <>
                  <SpecificExplanationItem
                    value={currentRecording?.data.bnt.dopa}
                    refKey={'dopa'}
                  />
                  <SpecificExplanationItem
                    value={currentRecording?.data.bnt.ct_e}
                    refKey={'ct_e'}
                  />
                  <SpecificExplanationItem
                    value={currentRecording?.data.bnt.ct_ne}
                    refKey={'ct_ne'}
                  />
                  <SpecificExplanationItem
                    value={currentRecording?.data.bnt.ach}
                    refKey={'ach'}
                  />
                  <SpecificExplanationItem
                    value={currentRecording?.data.bnt.gaba}
                    refKey={'gaba'}
                  />
                  <SpecificExplanationItem
                    value={currentRecording?.data.bnt.sert}
                    refKey={'sert'}
                  />
                </>
              }
            />
          </div>
          <div>
            <CollapsiblePanel
              title={'Brain'}
              content={
                <>
                  <SpecificExplanationItem
                    value={currentRecording?.data.bnt.dopa}
                    refKey={'dopa'}
                  />
                  <SpecificExplanationItem
                    value={currentRecording?.data.bnt.ct_e}
                    refKey={'ct_e'}
                  />
                  <SpecificExplanationItem
                    value={currentRecording?.data.bnt.ct_ne}
                    refKey={'ct_ne'}
                  />
                  <SpecificExplanationItem
                    value={currentRecording?.data.bnt.ach}
                    refKey={'ach'}
                  />
                  <SpecificExplanationItem
                    value={currentRecording?.data.bnt.gaba}
                    refKey={'gaba'}
                  />
                  <SpecificExplanationItem
                    value={currentRecording?.data.bnt.sert}
                    refKey={'sert'}
                  />
                </>
              }
            />

            <div className="flex flex-col items-center">
              <div className="flex justify-end w-full -mb-24">
                <div>
                  <div>Brain Guage</div>
                  <div className="flex flex-col">
                    <button
                      onClick={() =>
                        setOpen(
                          <BrainAccordianModalElement title="Brain Gauge Parameters" />
                        )
                      }
                      className="text-sm text-charcoal hover:bg-charcoal border-charcoal border-2 rounded-md hover:text-white py-1 px-2  mt-2"
                    >
                      Parameters
                    </button>
                    <button
                      onClick={() =>
                        setOpen(
                          <BrainRawScoresAccordianModalElement title="Brain Gauge Raw Scores" />
                        )
                      }
                      className="text-sm text-charcoal hover:bg-charcoal border-charcoal border-2 rounded-md hover:text-white py-1 px-2  mt-2"
                    >
                      Raw Scores
                    </button>
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  alignItems: 'center',
                  marginTop: 70,
                }}
              >
                {/* <Popover content={() => <>
                <div style={{}}>
                  The brain color that you see here is the brain state showing up for that patient.
                  It is based on the Brain Power Spectrum.<br /> Look at the number representing this parameter and click on the small brain picture that matches this<br /> range for an explanation.
                </div>
              </>} trigger="hover"> */}
                <img
                  src={GetBrainImage(
                    currentRecording?.data?.brain?.brain_power
                  )}
                  style={{
                    width: 200,
                    filter: 'drop-shadow(0px 0px 7px #999999)',
                  }}
                  alt="brain_image"
                />
                {/* </Popover> */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flex: 1,
                    maxWidth: 350,
                    marginTop: 20,
                    gap: 10,
                  }}
                >
                  {image_array.map((img, i) => {
                    // const brain_desc = _.find(brainDescription.descriptions, (d) => { return d.key === brain_key_array[i] })

                    return (
                      <div key={i} style={{ minWidth: 50 }}>
                        {/* <Popover content={() => <>
                          <div style={{ textAlign: 'left' }}>
                            {brain_value_array[i]}
                          </div><div dangerouslySetInnerHTML={{ __html: brain_desc.hq_professional }}></div>
                        </>} trigger="click"> */}
                        <img
                          src={img}
                          style={{
                            width: 50,
                            filter: 'drop-shadow(0px 0px 7px #999999)',
                          }}
                          alt="brain_image"
                        />
                        <div></div>
                        <div className="text-primary-grey text-xs text-center mt-1">
                          {brain_value_array[i]}
                        </div>
                        {/*  </Popover> */}
                      </div>
                    );
                  })}
                </div>
              </div>
              <Dial
                expanded={auth.graphsExpanded}
                domain={[0, 100]}
                value={
                  currentRecording?.data?.brain?.brain_power > 100
                    ? 100
                    : currentRecording?.data?.brain?.brain_power
                    ? currentRecording?.data?.brain?.brain_power
                    : 0
                }
              />
              <div className="text-2xl align-top">
                {currentRecording?.data?.brain?.brain_power.toFixed() <= 100
                  ? currentRecording?.data?.brain?.brain_power.toFixed()
                  : 100}
              </div>
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
          </div>
        </SectionTwo>
      </DisplayWrapper>
      <div
        style={{
          width: '210mm',
          height: '297mm',
          display: 'none',
        }}
      >
        <div ref={componentRef}>
          <div
            className="flex flex-col justify-center items-start w-full bg-opacity-10 print-content"
            style={{
              width: '210',
            }}
          >
            <div className="mt-2">
              <div className="text-charcoal text-md ">
                {currentRecording?.title}
              </div>
              <div className="text-charcoal text-xs">
                {currentRecording?.created_on
                  ? format(
                      new Date(currentRecording?.created_on),
                      'dd MMM yyyy  kk:mm'
                    )
                  : null}
              </div>
            </div>
          </div>

          <div
            className="flex flex-col justify-center items-start w-full  mt-2"
            style={{
              width: '210',
            }}
          >
            <div className="text-charcoal text-md">
              {subject?.users_by_pk?.first_name}{' '}
              {subject?.users_by_pk?.last_name}
            </div>
            {subject && (
              <div className="text-charcoal text-md">
                Age:{' '}
                {differenceInYears(
                  new Date(),
                  new Date(subject.users_by_pk?.birth_date)
                )}{' '}
              </div>
            )}
            {subject && subject.users_by_pk && subject.users_by_pk.data && (
              <div className="text-charcoal text-md">
                {' '}
                Gender:
                <span className=" capitalize ">
                  {' ' + JSON.parse(subject.users_by_pk?.data).data.gender}
                </span>
              </div>
            )}
          </div>

          <div className="mt-16"></div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              height: graphHeight,
              width: '210mm',
            }}
          >
            <div
              style={{ flex: 1, cursor: 'pointer' }}
              onClick={() => {
                setOpen(
                  <BasicModalElement title="Delta" descriptionKey="delta" />
                );
              }}
            >
              <BrainHeading
                heading={'Delta'}
                power={`${(
                  (currentRecording?.data?.brain?.delta / total_power) *
                  100
                ).toFixed()}% - ${currentRecording?.data?.brain?.delta.toFixed()}`}
              />
              <BrainGraph
                id="delta"
                graphData={delta}
                graphHeight={graphHeight}
                yDomain={yDomain}
                color={'#BF362D'}
              />
            </div>
            <div
              style={{ flex: 1, cursor: 'pointer' }}
              onClick={() =>
                setOpen(
                  <BasicModalElement title="Theta" descriptionKey="theta" />
                )
              }
            >
              <BrainHeading
                heading={'Theta'}
                power={`${(
                  (currentRecording?.data?.brain?.theta / total_power) *
                  100
                ).toFixed()}% - ${currentRecording?.data?.brain?.theta.toFixed()}`}
              />
              <BrainGraph
                id="theta"
                graphData={theta}
                graphHeight={graphHeight}
                yDomain={yDomain}
                color={'#E8C401'}
              />
            </div>
            <div
              style={{ flex: 1, cursor: 'pointer' }}
              onClick={() =>
                setOpen(
                  <BasicModalElement title="Alpha" descriptionKey="alpha" />
                )
              }
            >
              <BrainHeading
                heading={'Alpha'}
                power={`${(
                  (currentRecording?.data?.brain?.alpha / total_power) *
                  100
                ).toFixed()}% - ${currentRecording?.data?.brain?.alpha.toFixed()}`}
              />
              <BrainGraph
                id="alpha"
                graphData={alpha}
                graphHeight={graphHeight}
                yDomain={yDomain}
                color={'#03952C'}
              />
            </div>
            <div
              style={{ flex: 1, cursor: 'pointer' }}
              onClick={() =>
                setOpen(
                  <BasicModalElement title="Beta" descriptionKey="beta" />
                )
              }
            >
              <BrainHeading
                heading={'Beta'}
                power={`${(
                  (currentRecording?.data?.brain?.beta / total_power) *
                  100
                ).toFixed()}% - ${currentRecording?.data?.brain?.beta.toFixed()}`}
              />
              <BrainGraph
                id="beta"
                graphData={beta}
                graphHeight={graphHeight}
                yDomain={yDomain}
                color={'#2D93BF'}
              />
            </div>
            <div
              style={{ flex: 1, cursor: 'pointer' }}
              onClick={() =>
                setOpen(
                  <BasicModalElement title="High Beta" descriptionKey="hbeta" />
                )
              }
            >
              <BrainHeading
                heading={'High Beta'}
                power={`${(
                  (currentRecording?.data?.brain?.hbeta / total_power) *
                  100
                ).toFixed()}% - ${currentRecording?.data?.brain?.hbeta?.toFixed()}`}
              />
              <BrainGraph
                id="hbeta"
                graphData={hbeta}
                graphHeight={graphHeight}
                yDomain={yDomain}
                color={'#9337DB'}
              />
            </div>
          </div>

          <div
            className="flex flex-row"
            style={{
              width: '210mm',
            }}
          >
            <div
              className="flex flex-col items-start mt-16"
              style={{
                width: '105mm',
              }}
            >
              <img
                src={GetBrainImage(currentRecording?.data?.brain?.brain_power)}
                className="ml-20"
                style={{
                  width: 200,
                  filter: 'drop-shadow(0px 0px 7px #999999)',
                }}
                alt="brain_image"
              />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  flex: 1,
                  maxWidth: 350,
                  marginTop: 20,
                  gap: 10,
                }}
              >
                {image_array.map((img, i) => {
                  return (
                    <div key={i} style={{ minWidth: 50 }}>
                      <img
                        src={img}
                        style={{
                          width: 50,
                          filter: 'drop-shadow(0px 0px 7px #999999)',
                        }}
                        alt="brain_image"
                      />
                      <div></div>
                      <div className="text-primary-grey text-xs text-center mt-1">
                        {brain_value_array[i]}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div
              className="flex flex-col items-center pt-28"
              style={{
                width: '105mm',
              }}
            >
              <Dial
                expanded={auth.graphsExpanded}
                domain={[0, 100]}
                value={
                  currentRecording?.data?.brain?.brain_power > 100
                    ? 100
                    : currentRecording?.data?.brain?.brain_power
                    ? currentRecording?.data?.brain?.brain_power
                    : 0
                }
              />
              <div className="text-2xl align-top">
                {currentRecording?.data?.brain?.brain_power.toFixed() <= 100
                  ? currentRecording?.data?.brain?.brain_power.toFixed()
                  : 100}
              </div>
              <h2>Brain Power Spectrum</h2>
            </div>
          </div>
          <div className="flex flex-col items-start">
            <h2 className="mt-6">Neurotransmitters</h2>
            <NeuroTransmitterCollection currentRecording={currentRecording} />
          </div>
        </div>
      </div>
    </>
  );
};

interface BrainGraphProps {
  id: string;
  graphData: GraphData[];
  color: string;
  graphHeight: number;
  yDomain: number[];
}

export interface GraphData {
  x: number;
  y: number;
}

export const BrainGraph = ({
  id,
  graphData,
  graphHeight,
  yDomain,
  color,
}: BrainGraphProps) => {
  return (
    <ResponsiveContainer width="100%" height={graphHeight - 45}>
      <AreaChart data={graphData} margin={{ top: 5, bottom: 5 }}>
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.8} />
            <stop offset="95%" stopColor={color} stopOpacity={0.2} />
          </linearGradient>
        </defs>
        <YAxis type="number" domain={yDomain} hide />
        <Area
          type="monotone"
          dataKey="y"
          stroke={color}
          fillOpacity={1}
          fill={`url(#${id})`}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

interface BrainHeadingProps {
  heading: String;
  power: number | string;
}

export const BrainHeading = ({ heading, power }: BrainHeadingProps) => {
  return (
    <div style={{ flex: 1 }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'center',
          height: 50,
        }}
      >
        <div
          style={{
            textAlign: 'center',
          }}
        >
          {heading.toUpperCase()}
        </div>
        <div
          style={{
            textAlign: 'center',
          }}
        >
          {power}
        </div>
      </div>
    </div>
  );
};
// replace with scaleThreshold
export const GetBrainImage = (value: number) => {
  switch (true) {
    case value < 20:
      return brain_20;
    case value >= 20 && value < 39:
      return brain_30;
    case value >= 39 && value < 59:
      return brain_50;
    case value >= 59 && value < 79:
      return brain_60;
    case value >= 79 && value < 99:
      return brain_80;
    case value >= 99:
      return brain_100;
    default:
      break;
  }
};
