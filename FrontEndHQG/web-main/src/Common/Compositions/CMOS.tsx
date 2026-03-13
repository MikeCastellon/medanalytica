import React from 'react'
import { useAuth } from '../../Hooks/AuthContext'
import { useDescriptionModal } from '../../Hooks/DescriptionModal'
import { cmos_colors, total_power } from '../../utils/gradients'
import { HorisontalBar } from '../graphs/HorisontalBar'
import { BasicModalElement } from '../Modals/BasicModalElement'


type CMOSProps = {
  cmos: number
  descriptionKey?: string
  descriptionTitle?: string
}

export const CMOSBar = ({ cmos, descriptionKey, descriptionTitle }: CMOSProps) => {
  const auth = useAuth()
  const { setOpen } = useDescriptionModal()

  return (
    <div
      className='cursor-pointer'
      onClick={() =>
        (descriptionKey && descriptionTitle) ?
          setOpen(<BasicModalElement title={descriptionTitle} descriptionKey={descriptionKey} />)
          : null}
    >
      <HorisontalBar
        fixed={0}
        refKey='cmos'
        title='CMOS '
        value={cmos}
        // idealRange={[]}
        absoluteRange={[1, 100]}
        markersBottom={[
          // {
          //   pos: 1,
          //   text: "low"
          // },
          // {
          //   pos: 100,
          //   text: "high"
          // }
        ]}
        markersInside={[{
          pos: 1,
          text: "1"
        },
        {
          pos: 15,
          text: "15"
        },
        {
          pos: 30,
          text: "30"
        },
        {
          pos: 50,
          text: "50"
        },
        {
          pos: 100,
          text: "100"
        },
        ]}
        gradientsColors={cmos_colors}
        expanded={auth.graphsExpanded}
      />
    </div>
  )
}
