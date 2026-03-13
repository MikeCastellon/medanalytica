import axios from "axios";
import _ from "lodash";
import { bufferCount, fromEvent, map, scan } from "rxjs";
import { assign, createMachine, interpret, send } from "xstate";
import { db, RecordingObj } from "../../utils/dexieStorage";
// import { send } from "xstate/lib/actions";

interface BluetoothContext {
  message: string
  isCapable: boolean
  userId: string

  device: BluetoothDevice
  server: BluetoothRemoteGATTServer
  service: BluetoothRemoteGATTService
  writeCharacteristic: BluetoothRemoteGATTCharacteristic
  readCharacteristic: BluetoothRemoteGATTCharacteristic

  isStreaming: boolean
  stream: any[] | []
  isRecording: boolean
  recording: any[] | []
  recordingMaxSize: number

  uploadProgress: number
  recordingObj: RecordingObj
}

type BluetoothEvent =
  | {
    type: "STARTSCAN",
    userId: string,
  }
  | {
    type: "TOGGLESTREAM",
    value: boolean
  }
  | {
    type: "UPDATESTREAM",
    value: number[]
  }
  | {
    type: "TOGGLERECORDING",
    value: boolean
  } | {
    type: "UPDATERECORDING",
    value: number[]
  }
  | {
    type: 'STOPSTREAMING'
  } |
  {
    type: 'STARTRECORDING'
  }
  | {
    type: 'RETRY'
  }
  | {
    type: 'UPLOAD'
  }
  | {
    type: 'UPLOAD_PROGRESS',
    value: number
  }
  | {
    type: 'DISCONNECTED'
  }
  | {
    type: "SAVERECORDING",
    value: RecordingObj
  }

let txBuffer = new ArrayBuffer(20);
export const startStData = new Uint8Array(txBuffer);
startStData[0] = 0x01
startStData[1] = 0x40
startStData[2] = 0x01
startStData[3] = 0x00
startStData[4] = 0x00

let txBuffer_3 = new ArrayBuffer(20);
export const stopStData = new Uint8Array(txBuffer_3);
stopStData[0] = 0x03
stopStData[1] = 0x40
stopStData[2] = 0x01
stopStData[3] = 0x00
stopStData[4] = 0x00

const deviceName = 'HeartQuest'
const serviceUUID = "dbf90001-1d19-11eb-adc1-0242ac120002"
const writeChar = "dbf90003-1d19-11eb-adc1-0242ac120002"
const dataStreamChar = "dbf90005-1d19-11eb-adc1-0242ac120002"

const filterOpt = {
  filters: [
    {
      name: deviceName
    }
  ],
  optionalServices: [serviceUUID, writeChar, dataStreamChar]
}

function guardCapable(context: BluetoothContext) {
  return context.isCapable === true
}

export const bluetoothMachine = createMachine<BluetoothContext, BluetoothEvent>({
  predictableActionArguments: true,
  id: 'bluetooth',
  context: {
    isCapable: false,
    recordingMaxSize: 300000,
    stream: [],
    recording: []
  } as BluetoothContext,
  initial: 'checkCapable',
  states: {
    checkCapable: {
      entry: [assign({
        isCapable: 'bluetooth' in navigator ? true : false
      })],
      always: {
        target: 'ready',
        actions: [assign<BluetoothContext, BluetoothEvent>({
          message: 'Your browser has bluetooth',
          isCapable: 'bluetooth' in navigator,
          recording: [],
          isRecording: false
        })],
        cond: 'guardCapable'
      }
    },
    ready: {
      on: {
        STARTSCAN: {
          target: 'getDevice',
          actions: assign<BluetoothContext, any>({
            userId: (_, e) => (e as {
              type: "STARTSCAN",
              userId: string
            }).userId, message: 'Looking for device'
          }),
        }
      }
    },
    getDevice: {
      invoke: {
        id: 'getDevice',
        src: () => navigator.bluetooth.requestDevice(filterOpt).then((v) => delayBleReturn(v)),

        onDone: {
          target: 'getServer',
          actions: assign<BluetoothContext, any>({
            device: (_, e) => e.data,
            message: 'Device Found'
          }),
        },
        onError: {
          target: 'checkCapable'
        }
      }
    },
    getServer: {
      invoke: {
        id: 'getServer',
        src: ({ device }) => {
          if (device && device?.gatt) {
            return device.gatt.connect().then((v) => delayBleReturn(v))
          } else {
            throw Error("Could not connect to Device")
          }
        },
        onDone: {
          target: 'getService',
          actions: assign<BluetoothContext, any>({
            server: (_, e) => e.data,
            message: 'Server Found',
          }),
        },
        onError: {
          target: 'checkCapable',
          actions: (_, event) => {
            console.log(event);
          }
        }
      },

    },
    getService: {
      invoke: {
        id: 'getService',
        src: ({ server, device }) => (cb) => {

          device.addEventListener('gattserverdisconnected', () => {
            console.log("Device Disconected From State Machine")
            cb({ type: 'DISCONNECTED' })
          })


          if (server) {
            return server.getPrimaryService(serviceUUID).then((v) => delayBleReturn(v))
          } else {
            throw Error("Could not connect to Server")
          }
        },
        onDone: {
          target: 'startStreaming',
          actions: assign<BluetoothContext, any>({
            service: (_, e) => e.data,
            message: 'Service Found',
          })
        },
        onError: {
          target: 'serviceFailure',
        }
      },
    },
    startStreaming: {
      invoke: {
        id: 'startStreaming',
        src: ({ service }) => {
          if (service) {
            return service.getCharacteristic(writeChar).then((char) => char.writeValue(startStData)).then((v) => delayBleReturn(v))
          } else {
            throw Error("Could not connect to Service")
          }
        },
        onDone: {
          target: 'startNotifications',
          actions: assign<BluetoothContext, any>({
            writeCharacteristic: (_, e) => e.data,
            message: "Stream Started",
          }),

        },
        onError: {
          target: 'serviceFailure',
          actions: () => assign<BluetoothContext, any>({
            message: 'Could not start stream'
          })
        }
      },
    },
    startNotifications: {
      invoke: {
        id: 'isStreaming',
        src: ({ service }) => {
          if (service) {
            return service.getCharacteristic(dataStreamChar).then((char) => {
              console.log("Notify");
              return char.startNotifications()
            }).then((v) => delayBleReturn(v))
          } else {
            throw Error("Could not connect to Service")
          }
        },
        onDone: {
          target: 'streaming',
          actions: assign<BluetoothContext, any>({
            readCharacteristic: (ctx, e) => e.data,
            message: "Should be streaming",
          })

        },
        onError: {
          actions: () => {
            console.log("Some Error in isStreaming");
          }
        },
      },
      on: {
        STOPSTREAMING: {
          target: 'stoppingStream',
        }
      }
    },
    streaming: {
      invoke: {
        id: 'streaming',
        src: (ctx) => (cb, onReceive) => {
          // console.log("START LISTENING TO STREAM");
          // let _closed$ = new Subject<boolean>()
          let event$ = fromEvent(ctx.readCharacteristic, 'characteristicvaluechanged').pipe(
            map(extractValues),
            // takeUntil(_closed$)
          )
          // console.log(event$);

          // let recordingObservable: Subscription
          // const streamObservable = 
          event$.pipe(
            bufferCount(15),
            scan(streamScan, []),
          ).subscribe((v) => {
            // console.log("STREAMING");
            cb({ type: "TOGGLESTREAM", value: true })
            cb({ type: "UPDATESTREAM", value: v })
          })

          onReceive((recEvent) => {
            // console.log("Received Event", recEvent);
            if (recEvent.type === "START_REC") {
              console.log("START RECORDING");

              cb({ type: "TOGGLERECORDING", value: true })
              cb({ type: "UPDATERECORDING", value: [] })

              event$.pipe(
                bufferCount(100),
                scan(recordingScan, []),
              ).subscribe((v) => {
                // console.log("RECORDING");
                cb({ type: "TOGGLERECORDING", value: true })
                if (v.length <= ctx.recordingMaxSize) {
                  cb({ type: "UPDATERECORDING", value: v })
                } else {
                  cb({ type: 'UPLOAD' })
                }
              })
            }

            // if (recEvent.type === "STOP_STREAM") {
            //   console.log("STOPPING");

            //   _closed$.next(false)
            //   cb({ type: 'STOPSTREAMING2' })
            // }
          })

          return () => {
            console.log("Should run cleanup");
            // console.log("Cleanup not implement");
          }
        }
      },
      on: {
        TOGGLESTREAM: {
          actions: assign<BluetoothContext, any>({
            isStreaming: (_, e) => (e as {
              type: "TOGGLESTREAM",
              value: boolean
            }).value
          })
        },
        UPDATESTREAM: {
          actions: [assign<BluetoothContext, any>({
            stream: (_, e) => (e as {
              type: "UPDATESTREAM",
              value: number[]
            }).value
          })]
        },
        TOGGLERECORDING: {
          actions: assign<BluetoothContext, any>({
            isRecording: (_, e) => (e as {
              type: "TOGGLERECORDING",
              value: boolean
            }).value
          })
        },
        UPDATERECORDING: {
          actions: assign<BluetoothContext, any>({
            recording: (_, e) => (e as {
              type: "UPDATERECORDING",
              value: number[]
            }).value
          })
        },
        STOPSTREAMING: {
          target: 'stoppingStream',
          actions: assign<BluetoothContext, any>({
            isStreaming: false,
            isRecording: false
          })
        },
        // STOPSTREAMING2: {
        //   target: 'stoppingStream',
        //   actions: assign({
        //     isStreaming: false,
        //     isRecording: false
        //   })
        // },
        STARTRECORDING: {
          actions: send({ type: 'START_REC' }, { to: 'streaming' })
        },
        UPLOAD: {
          target: 'saving'
        },
        DISCONNECTED: {
          target: 'checkCapable',
          actions: [() => console.log("DISCONNECT DEVICE")
          ]
        },

      }
    },
    saving: {
      invoke: {
        id: 'saving',
        src: (ctx) => (cb) => {
          const recordingString = convertRecordingToString(ctx.recording)
          const recordingObj = new RecordingObj("New Recording", recordingString, ctx.userId, 1000)
          cb({
            type: "SAVERECORDING",
            value: recordingObj
          })
          return db.recordings.add(recordingObj)
        },
        onDone: {
          target: 'uploading',
          actions: assign<BluetoothContext, any>({
            recordingObj: (ctx, e) => ctx.recordingObj.setId(e.data)
          })
        },
        onError: {
          target: 'uploading',
          actions: assign<BluetoothContext, any>({
            message: "could not save recording before upload"
          })
        }
      },
      on: {
        SAVERECORDING: {
          actions: assign<BluetoothContext, any>({
            recordingObj: (_, e) => e.value
          })
        }
      }
    },
    uploading: {
      invoke: {
        id: 'uploading',
        src: (ctx) => async (cb) => {
          const formData = ctx.recordingObj.toFormData() //buildRecordingPostObject(ctx.userId, recordingString)
          return axios({
            method: 'post',
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            data: formData,
            url: `${import.meta.env.VITE_API_URL}/v1/recordings`,
            onUploadProgress: (ev: ProgressEvent) => {
              const progress = Math.round((ev.loaded / ev.total) * 100);
              console.log("Progress: ", progress);
              cb({ type: 'UPLOAD_PROGRESS', value: progress })
            },
          })
        },
        onDone: {
          target: 'checkCapable',
          actions: (ctx) => {
            if (ctx.recordingObj.id) db.recordings.where("id").equals(ctx.recordingObj.id).delete()
          }
        },
        onError: {
          target: 'checkCapable',
          actions: (_, e) => {
            console.log("Could not upload", e);
          }
        },

      },
      on: {
        UPLOAD_PROGRESS: {
          actions: assign<BluetoothContext, any>({
            uploadProgress: (_, e) => (e as {
              type: 'UPLOAD_PROGRESS';
              value: number;
            }).value
          })
        }
      }
    },
    stoppingStream: {
      invoke: {
        id: 'stoppingStream',
        src: ({ server, service }) => {
          return service.getCharacteristic(writeChar).then((char) => char.writeValue(stopStData))
            .then(() => {
              server.disconnect()
            })
        },
        onDone: {
          target: 'checkCapable',
          actions: () => {
            console.log("Successfully disconnected from stream and device");
          },
        },
        onError: {
          actions: () => {
            console.log("Could not completely disconnect");

          }
        }
      }
    },
    serviceFailure: {
      on: {
        RETRY: { target: 'getDevice' }
      }
    },
  }
},
  {
    guards: {
      guardCapable,
    },
  });




export const bleService = interpret(bluetoothMachine).start()








const delayBleReturn = (v: any, delay = 200) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(v), delay)
  })
}

const extractValues = (v: any) => {
  let value: DataView = v?.target?.value
  let values: number[] = []

  const access = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]
  access.forEach((d) => {
    values.push(value.getInt16(d, true))
  })
  return values
}

const streamScan = (acc: any[], curr: any) => {
  const newCurr = curr.flat()
  return [...acc, ...newCurr].slice(-3000)
}

const recordingScan = (acc: any[], curr: any) => {
  const newCurr = curr.flat()
  return [...acc, ...newCurr]
}

const buildRecordingPostObject = (userId: string, convertedRecordingString: string, recordingName: string = "Recording", sampleRate: number = 1000) => {
  const textFile = new File([convertedRecordingString], "test_recording.txt", { type: "text/plain" });
  const formData = new FormData();
  formData.append('recordingFile', textFile);
  formData.append('ownerId', userId);
  formData.append('sampleRate', sampleRate.toString());
  formData.append('title', recordingName)
  return formData
}

const uploadRecording = (formData: FormData) => {

  return axios({
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
    url: `${import.meta.env.VITE_API_URL}/v1/recordings`,
    onUploadProgress: (ev: ProgressEvent) => {
      const progress = Math.round((ev.loaded / ev.total) * 100);
      console.log("Progress: ", progress);
    },
  })
}

const convertRecordingToString = (recordingDataArray: number[]): string => {
  let datastring = ''
  recordingDataArray.forEach((d) => {
    datastring += `${d}\n`
  })
  return datastring
}

const convertRecordingStringToFile = (recordingString: string): File => {
  return new File([recordingString], "test_recording.txt", { type: "text/plain" });
}