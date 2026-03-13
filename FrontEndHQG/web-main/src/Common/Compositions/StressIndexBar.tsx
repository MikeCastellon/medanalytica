import React from 'react'
import { useAuth } from '../../Hooks/AuthContext'
import { useDescriptionModal } from '../../Hooks/DescriptionModal'
import { stress_index } from '../../utils/gradients'
import { HorisontalBar } from '../graphs/HorisontalBar'
import { BasicModalElement } from '../Modals/BasicModalElement'

type StressIndexBarProps = {
  value: number
}

export const StressIndexBar = ({ value }: StressIndexBarProps) => {
  const auth = useAuth()
  const { setOpen } = useDescriptionModal()
  return (
    <div className='cursor-pointer' onClick={() => setOpen(<BasicModalElement title='Stress Index' descriptionKey="stressIndex" />)}>
      <HorisontalBar
        refKey='stress_index'
        title='Stress Index'
        value={value}
        idealRange={[10, 100]}
        absoluteRange={[0, 500]}
        markersBottom={[
          {
            pos: 0,
            text: "low"
          },
          {
            pos: 500,
            text: "high"
          }
        ]}
        gradientsColors={stress_index}
        expanded={auth.graphsExpanded}
        fixed={0}
      />
    </div>
  )
}
