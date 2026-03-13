import { useMatch } from '@tanstack/react-location';
import { useActor, useInterpret, useMachine } from '@xstate/react';
import React, { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import { Line, LineChart, ResponsiveContainer } from 'recharts';
import {
  Subject,
  bufferCount,
  scan,
  finalize,
  Observable,
  Subscription,
  share,
} from 'rxjs';
import { LocationGenerics } from '../Router/CustomRouter';
import {
  GetHeartQuestDevice,
  GetHeartQuestServer,
  GetHeartQuestService,
  startStData,
  stopStData,
} from '../Services/Bluetooth/BluetoothService';
import {
  bleService,
  bluetoothMachine,
} from '../Services/Bluetooth/StateMachine';
import { BarcodeObject, createBarcodeString } from '../utils/functionUtils';
import differenceInYears from 'date-fns/differenceInYears';
import { watch } from 'rxjs-watcher';
import { ProgressDonut } from '../Common/ProgressDonut';
import { recordingDisplay } from '../assets/recording_display';
import { useUserContext } from '../Hooks/UserContext';
import {
  Order_By,
  useGetAllHeartDataForOwnerQuery,
} from '../generated/graphql';
import { Loader } from '../Common/Loader';
// import { useMachine } from '@xstate-ninja/react'

const dataSource = {
  endpoint: import.meta.env.VITE_GRAPHQL_URL,
  fetchParams: {
    headers: {
      'X-Hasura-Admin-Secret': import.meta.env.VITE_GRAPHQL_HEADER,
    },
  },
};

export const SubjectBase = () => {
  const {
    params: { userId, subjectId, recordingId },
    data: {
      // subject
    },
  } = useMatch<LocationGenerics>();
  // const { subject, subjectLoading, currentRecording, subjectRefetch } = useUserContext()

  const [state, send] = useActor(bleService);
  const [startInterval, setStartInterval] = useState<boolean>(false);
  const [countDownDuration, setCountdownDuration] = useState<number>(0);
  const [understandShow, setUnderstandShow] = useState(true);

  // const { data: subject, isLoading: subjectLoading, refetch: subjectRefetch } = useGetAllHeartDataForOwnerQuery(dataSource, {
  //   _eq: subjectId || "",
  //   id: subjectId,
  //   where: {
  //     owner: { _eq: subjectId },
  //     deleted_on: { _is_null: true },
  //     // ...(query.get('trend') ? { trend_recording: { _eq: query.get('trend') } } : { trend_recording: { _is_null: false } }),
  //   },
  //   order_by: Order_By.Desc
  // }, {
  //   enabled: !!subjectId,
  // })

  // useEffect(() => {

  // }, [subject, subjectLoading])

  if (state.matches('stoppingStream')) {
    location.reload();
  }

  // const generateQrObject = (): string => {
  //   const gender = JSON.parse(subject?.users_by_pk?.data ?? "").data.gender

  //   if (subject && subject?.user?.firstName && gender) {
  //     return createBarcodeString({
  //       name: subject?.user.firstName,
  //       ownerId: subjectId,
  //       age: differenceInYears(new Date(), new Date(subject.users_by_pk?.birth_date)),
  //       gender: gender,
  //       sampleRate: 1000,
  //       onClose: function (): void {
  //         throw new Error('Function not implemented.')
  //       }
  //     })
  //   } else {
  //     return ""
  //   }
  // }

  // if (!subject || subjectLoading) {
  //   return <div>Loading Subject data</div>
  // }

  const counterValid = countDownDuration > 0;

  useEffect(() => {
    let interval =
      counterValid &&
      setInterval(() => {
        console.log('Counting');

        setCountdownDuration((current) => current - 1);
      }, 1000);

    return () => {
      interval && send('STARTRECORDING');
      interval && setStartInterval(false);
      interval && clearInterval(interval);
    };
  }, [counterValid]);

  return (
    <div className="flex flex-col ml-[400px] mt-16">
      {/* <pre>{JSON.stringify(state.context, null, 2)}</pre>
      <pre>{JSON.stringify(state.value, null, 2)}</pre> */}
      {/* <div>{startInterval ? "stated" : "stopped"}</div>
      <div>{countDownDuration}</div> */}
      {/* <button className='border-2 border-charcoal px-2 py1 rounded-md' onClick={() => {
        setStartInterval(true)
        setCountdownDuration(5)
      }}>Start timer</button> */}

      {state.context.isCapable && (
        <>
          <div className="flex flex-row mb-2 space-x-2">
            {state.matches('ready') ? <h1>Record in browser</h1> : null}

            {state.matches('streaming') ? (
              <button
                className="border-2 border-charcoal px-2 py1 rounded-md"
                onClick={() => {
                  send('STOPSTREAMING');
                }}
              >
                ABORT
              </button>
            ) : null}
            {state.matches('streaming') &&
              !state.context.isRecording &&
              !understandShow && (
                <button
                  disabled={state.context.isRecording}
                  className="border-2 border-charcoal px-2 py1 rounded-md"
                  onClick={() => {
                    setStartInterval(true);
                    setCountdownDuration(5);
                  }}
                >
                  RECORD
                </button>
              )}
          </div>
          <div className="flex flex-col mb-2 space-x-2">
            <div className="text-primary-grey text-sm">
              {state.context.message}
            </div>
          </div>
          <div className="w-full h-96 relative border-t-2 border-b-2">
            {/* Static Visual ECG display */}
            {state.context?.stream.length === 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  width={500}
                  height={300}
                  data={recordingDisplay
                    .split('\n')
                    .map((v: any, i: any) => ({ x: i * 2, y: v }))}
                  margin={{
                    top: 55,
                    right: -20,
                    left: -20,
                    bottom: 5,
                  }}
                >
                  <Line
                    type="monotone"
                    isAnimationActive={false}
                    dataKey="y"
                    stroke="red"
                    strokeOpacity={0.3}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : null}
            {state.matches('ready') ? (
              <div className="flex flex-col justify-center h-96 items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
                <div className="flex flex-col border-2 border-desaturated-grey rounded-md pt-8 px-4 pb-4 w-64 text-center bg-white z-50 shadow-md">
                  Click start to connect and stream your heart rate from the HQP
                  <br />
                  <br />
                  <button
                    className="border-2 border-primary-red text-primary-red hover:border-charcoal hover:bg-charcoal hover:text-white px-2 py1 rounded-md"
                    onClick={() => {
                      send({ type: 'STARTSCAN', userId: subjectId });
                    }}
                  >
                    START
                  </button>
                </div>
              </div>
            ) : null}

            {state.matches('streaming') ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  width={500}
                  height={300}
                  data={state.context.stream.map((v: any, i: any) => ({
                    x: i * 2,
                    y: v,
                  }))}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <Line
                    type="monotone"
                    isAnimationActive={false}
                    dataKey="y"
                    stroke="red"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : null}
            {state.context.isRecording && (
              <div className="absolute left-2 shadow-lg rounded-xl top-2 z-50 bg-white ">
                <ProgressDonut
                  progress={
                    (state.context.recording.length /
                      state.context.recordingMaxSize) *
                    100
                  }
                />
              </div>
            )}
            {state.matches('uploading') ? (
              <div className="absolute left-2 shadow-lg rounded-xl top-2 z-50 bg-white ">
                <ProgressDonut
                  progress={state.context.uploadProgress}
                  primaryColor="blue"
                />
              </div>
            ) : null}
            {(state.matches('getDevice') ||
              state.matches('getServer') ||
              state.matches('getService') ||
              state.matches('startStreaming')) && (
              <div className="flex flex-col justify-center h-96 items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  ">
                <div className="flex flex-col border-2 border-desaturated-grey rounded-md pt-8 px-4 pb-4 w-64 text-center bg-white z-20">
                  <Loader />
                  <div className="mt-4">
                    Please wait while we connect to the HeartQuest
                  </div>
                  {/* <div className='text-9xl text-desaturated-grey'>{countDownDuration}</div> */}
                </div>
              </div>
            )}
            {state.matches('streaming') && understandShow && (
              <div className="flex flex-col justify-center h-96 items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  ">
                <div className="flex flex-col border-2 border-desaturated-grey rounded-md pt-8 px-4 pb-4 w-64 text-center bg-white z-20">
                  Your device should be streaming your heart rate with a red
                  line in this section. Please wait for a consistant heart
                  pattern before you start the recording. <br />
                  <br />
                  <button
                    className="border-2 border-charcoal px-2 py1 rounded-md"
                    onClick={() => {
                      setUnderstandShow(false);
                    }}
                  >
                    I Understand
                  </button>
                </div>
              </div>
            )}

            {startInterval && counterValid && (
              <div className="flex flex-col justify-center h-96 items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  ">
                <div className="flex flex-col border-2 border-desaturated-grey rounded-md pt-8 px-4 pb-4 w-64 text-center bg-white z-20">
                  <div>Starting in</div>
                  <div className="text-9xl text-desaturated-grey">
                    {countDownDuration}
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      <div className="flex flex-row w-full mt-8">
        {/* <div className='flex flex-col w-full items-center '>
          <div className='border-2 border-black rounded-lg px-10 pt-5 pb-5 mt-10'>
            <div className=' text-xl pb-10'>Lead configuration</div>
            <div className='flex flex-row justify-around'>
              <div className='flex flex-col justify-center items-center'>
                <div className='flex flex-col w-10 h-10 bg-green-500 rounded-full text-center font-bold text-white border-2 border-black shadow-2xl justify-center'>L</div>
                <div className='mt-2'>Left Arm</div>
              </div>
              <div className='flex flex-col justify-center items-center'>
                <div className='flex flex-col w-10 h-10 bg-white rounded-full text-center font-bold text-black border-2 border-black shadow-2xl justify-center'>R</div>
                <div className='mt-2'>Right Arm</div>
              </div>
            </div>
          </div>
        </div> */}
        {/* <div className="w-full">
          <div className="text-2xl">Getting started</div>
          <div className="flex flex-row flex-wrap">
            <div className="w-[360px]">
              <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
                <iframe
                  src="https://player.vimeo.com/video/836668728?h=900db75509&byline=0&portrait=0"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <script src="https://player.vimeo.com/api/player.js"></script>
            </div>
            <div className="w-[360px]">
              <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
                <iframe
                  src="https://player.vimeo.com/video/836670203?h=796f29ccf1&byline=0&portrait=0"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <script src="https://player.vimeo.com/api/player.js"></script>
            </div>
            <div className="w-[360px]">
              <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
                <iframe
                  src="https://player.vimeo.com/video/836670727?h=9701f2e473&byline=0&portrait=0"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <script src="https://player.vimeo.com/api/player.js"></script>
            </div>
            <div className="w-[360px]">
              <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
                <iframe
                  src="https://player.vimeo.com/video/836672322?h=e0d7041335&byline=0&portrait=0"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <script src="https://player.vimeo.com/api/player.js"></script>
            </div>
          </div>
        </div> */}
        {/* <div className=' p-4 border-2 border-desaturated-grey rounded-md'>
          <div className='w-20 hover:w-96'>
            {
              generateQrObject() &&
              <QRCode value={generateQrObject()} style={{ height: "auto", maxWidth: "100%", width: "100%" }} viewBox={`0 0 256 256`}
                size={256}
              />
            }
          </div>
        </div>
        <div className='ml-4'>
          <h1>QR Code</h1>
          <p>You can scan the QR Code with the <br ></br> HQ Recorder App to record the ECG</p>
        </div> */}
      </div>
    </div>
  );
};
