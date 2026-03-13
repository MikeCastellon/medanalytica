import { createContext, useContext, useMemo, useState } from "react";
import { TRecording } from "../Dashboard/RecordingTypes";

type TRecordingFn = {
  activeRecording?: TRecording
  recordingsList?: TRecording[]
}

type TRecordingsContext = {
  update: (data: TRecordingFn) => void
} & TRecordingsState;

type TRecordingsState = {
  activeRecording: TRecording | null,
  recordingsList: TRecording[],
}

const RecordingsContext = createContext<TRecordingsContext>(null!);

const RecordingsProvider = (props: { children: React.ReactNode }) => {

  const [recordings, setRecordings] = useState<TRecordingsState>({
    activeRecording: null,
    recordingsList: []
  })

  const update = ({ activeRecording, recordingsList }: TRecordingFn) => {
    setRecordings({
      ...recordings,
      ...(activeRecording ? { activeRecording } : {}),
      ...(recordingsList ? { recordingsList } : {})
    })
  }

  const contextValue = useMemo(
    () => ({
      ...recordings,
      update,
    }), [recordings]
  );

  return (
    <RecordingsContext.Provider value={contextValue} children={props.children} />
  )
}

export function useRecordings() {
  return useContext(RecordingsContext)
}