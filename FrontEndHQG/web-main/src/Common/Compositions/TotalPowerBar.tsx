import React from 'react'
import { useAuth } from '../../Hooks/AuthContext'
import { useDescriptionModal } from '../../Hooks/DescriptionModal'
import { total_power } from '../../utils/gradients'
import { HorisontalBar } from '../graphs/HorisontalBar'
import { BasicModalElement } from '../Modals/BasicModalElement'


type TotalPowerBarProps = {
  totalPower: number
}

export const TotalPowerBar = ({ totalPower }: TotalPowerBarProps) => {
  const auth = useAuth()
  const { setOpen } = useDescriptionModal()

  return (
    <div className='cursor-pointer' onClick={() => setOpen(<BasicModalElement title='Total Power' descriptionKey="total_power" />)}>
      <HorisontalBar
        refKey='total_power'
        title='Total Power'
        value={totalPower}
        idealRange={[1500, 3500]}
        absoluteRange={[100, 6000]}
        markersBottom={[
          {
            pos: 100,
            text: "low"
          },
          {
            pos: 6000,
            text: "high"
          }
        ]}
        gradientsColors={total_power}
        expanded={auth.graphsExpanded}
        fixed={0}
      />
    </div>
  )
}
