import React from 'react'
import { useAuth } from '../../Hooks/AuthContext'
import { useDescriptionModal } from '../../Hooks/DescriptionModal'
import { ans_cns } from '../../utils/gradients'
import { HorisontalBar } from '../graphs/HorisontalBar'
import { BasicModalElement } from '../Modals/BasicModalElement'

type NervousSystemBalanceIndexBarProps = {
  value: number
}

export const NervousSystemBalanceIndexBar = ({ value }: NervousSystemBalanceIndexBarProps) => {
  const auth = useAuth()
  const { setOpen } = useDescriptionModal()
  return (
    <div className='cursor-pointer' onClick={() => setOpen(<BasicModalElement title='Nervous System Balance Index' descriptionKey="cns_ans" />)}>
      <HorisontalBar
        refKey='nsbi'
        title='Nervous System Balance Index'
        value={value}
        idealRange={[1, 3]}
        absoluteRange={[-1, 5]}
        markersBottom={[
          {
            pos: -1,
            text: "cns"
          },
          {
            pos: 5,
            text: "ans"
          }
        ]}
        gradientsColors={ans_cns}
        expanded={auth.graphsExpanded}
      />
    </div>
  )
}
