import React from 'react'
import { useDescriptionModal } from '../../Hooks/DescriptionModal'
import { BasicModalElement } from '../Modals/BasicModalElement'
import { ValueBox } from '../ValueBox'

type RMSSDCardType = {
  value: number
}

export const RMSSDCard = ({ value }: RMSSDCardType) => {
  const { setOpen } = useDescriptionModal()
  return (
    <ValueBox
      onClick={() => setOpen(<BasicModalElement title='RMSSD' descriptionKey="rmssd" />)}
      valueKey={"val"}
      value={value}
      title={"RMSSD"}
      idealRange={['25', '50+']}
      colourRange={["text-primary-red", "text-primary-green", "text-primary-red"]}
      valueRange={[24, 350]}
    />
  )
}
