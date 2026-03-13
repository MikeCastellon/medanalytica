import React, { ReactNode, useState } from 'react'

type TRecordingPopOverstate = {
  isOpen: boolean
  descriptionElement?: ReactNode
}

type TRecordingPopOverContext = {
  setOpen: (descriptionElement: ReactNode) => void
  setClosed: () => void
} & TRecordingPopOverstate

const RecordingPopOverContext = React.createContext<TRecordingPopOverContext>(null!);

export const RecordingPopOverProvider = (props: { children: React.ReactNode }) => {
  const [state, setState] = useState<TRecordingPopOverstate>({
    isOpen: false,
  })

  const setOpen = (descriptionElement?: ReactNode) => {
    setState({
      isOpen: true,
      descriptionElement
    })
  }

  const setClosed = () => {
    setState({
      isOpen: false,
      descriptionElement: null
    })
  }

  const contextValue = React.useMemo(
    () => ({
      ...state,
      setOpen,
      setClosed,
    }), [state]
  );

  return (
    <RecordingPopOverContext.Provider value={contextValue} children={props.children} />
  )
}


export function useRecordingPopOver() {
  return React.useContext(RecordingPopOverContext)
}