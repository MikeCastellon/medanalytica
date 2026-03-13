import React, { ReactNode, useState } from 'react'

type TDescriptionModalstate = {
  isOpen: boolean
  descriptionElement?: ReactNode
}

type TDescriptionModalContext = {
  setOpen: (descriptionElement: ReactNode) => void
  setClosed: () => void
} & TDescriptionModalstate

const DescriptionModalContext = React.createContext<TDescriptionModalContext>(null!);

export const DescriptionModalProvider = (props: { children: React.ReactNode }) => {
  const [state, setState] = useState<TDescriptionModalstate>({
    isOpen: false,

  })

  const setOpen = (descriptionElement: ReactNode) => {
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
    <DescriptionModalContext.Provider value={contextValue} children={props.children} />
  )
}


export function useDescriptionModal() {
  return React.useContext(DescriptionModalContext)
}