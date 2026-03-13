import { assign } from "xstate";
import { AnyStateMachine, createMachine, interpret, spawn, StateMachine } from "xstate";
import { Heart_Data } from "../generated/graphql";





interface SelectionMachineContext {
  recording: Heart_Data | null
}

type SelectionMachineEvent =

  | {
    type: "CLEAR",
  }

  | {
    type: "SET_RECORDING",
    value: Heart_Data
  }


// const createSelectionMachine = (heartData: Heart_Data) => {
//   return createMachine<SelectionMachineContext, SelectionMachineEvent>({
//     initial: "empty",
//     context: {
//       recording: heartData
//     },
//     states: {
//       empty: {
//         on: {
//           SET_RECORDING: {
//             target: "full",
//             actions: assign({
//               recording: (_, e) => e.value
//             })
//           }
//         }
//       },
//       full: {
//         on: {
//           CLEAR: {
//             target: 'empty',
//             actions: assign({
//               recording: null
//             })
//           }
//         }
//       }
//     },
//   })
// }

interface CompareRecordingMachineContext {
  leftRecording: any | null
  rightRecording: any | null
}
type CompareRecordingMachineEvent =
  | {
    type: "START"
  }
  | {
    type: "SELECT",
    value: Heart_Data
  }
  | {
    type: "CLEAR",
  }
  | {
    type: "CLEAR_RIGHT",
  }
  | {
    type: "CLEAR_LEFT",
  }

export const compareRecordingMachine = createMachine<CompareRecordingMachineContext, CompareRecordingMachineEvent>({
  predictableActionArguments: true,
  id: 'compare',
  context: {
    leftRecording: null,
    rightRecording: null
  } as CompareRecordingMachineContext,
  initial: 'notstarted',
  states: {
    notstarted: {
      on: {
        START: {
          target: "set_left"
        }
      }
    },
    set_left: {
      on: {
        SELECT: {
          target: "set_right",
          actions: assign({
            leftRecording: (ctx, e) => e.value
          })
        },
        CLEAR: {
          target: "set_left",
          actions: assign({
            leftRecording: null,
            rightRecording: null
          })
        }
      }
    },
    set_right: {
      invoke: {
        src: (ctx) => {
          return new Promise((resolve, reject) => {
            if (ctx.leftRecording && ctx.rightRecording) {
              resolve(true)
            } else {
              reject(false)
            }
          })
        },
        onDone: {
          target: "full"
        },
        onError: {}
      },
      on: {
        SELECT: {
          target: "full",
          actions: assign({
            rightRecording: (ctx, e) => e.value
          })
        },
        CLEAR: {
          target: "set_left",
          actions: assign({
            leftRecording: null,
            rightRecording: null
          })
        }
      }
    },
    full: {
      on: {
        CLEAR: {
          target: "set_left",
          actions: assign({
            leftRecording: null,
            rightRecording: null
          })
        },
        CLEAR_LEFT: {
          target: "set_left",
          actions: assign({
            leftRecording: null,
            rightRecording: (ctx) => ctx.rightRecording
          })
        },
        CLEAR_RIGHT: {
          target: "set_right",
          actions: assign({
            leftRecording: (ctx) => ctx.leftRecording,
            rightRecording: null
          })
        }
      }
    }
  }
})

export const compareMachine = interpret(compareRecordingMachine).start()