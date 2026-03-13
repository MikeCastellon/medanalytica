import React from 'react'
import { useDescriptionModal } from '../../Hooks/DescriptionModal'
import { BasicModalElement } from '../Modals/BasicModalElement'
import { ValueBox } from '../ValueBox'

type SDNNCardType = {
  value: number
}

export const SDNNCard = ({ value }: SDNNCardType) => {
  const { setOpen } = useDescriptionModal()
  return (
    <ValueBox
      onClick={() => setOpen(<BasicModalElement title='SDNN' descriptionKey="sdnn" />)}
      valueKey={"val"}
      value={value}
      title={"SDNN"}
      idealRange={[49, 70]}
      colourRange={["text-primary-red", "text-primary-green", "text-primary-green"]}
      valueRange={[49, 70]}
    />
  )
}
