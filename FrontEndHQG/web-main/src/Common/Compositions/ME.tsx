import React from 'react'
import { useAuth } from '../../Hooks/AuthContext'
import { useDescriptionModal } from '../../Hooks/DescriptionModal'
import { cmos_colors, me_colors, total_power } from '../../utils/gradients'
import { HorisontalBar } from '../graphs/HorisontalBar'
import { BasicModalElement } from '../Modals/BasicModalElement'


type MEProps = {
  me: number,
  stringValue?: string
  descriptionKey?: string
  descriptionTitle?: string
}

export const MEnergy = ({ me, stringValue, descriptionKey, descriptionTitle }: MEProps) => {
  const auth = useAuth()
  const { setOpen } = useDescriptionModal()

  return (
    <div
      className='cursor-pointer'
      onClick={() => (descriptionKey && descriptionTitle) ?
        setOpen(<BasicModalElement title={descriptionTitle} descriptionKey={descriptionKey} />)
        : null
      }
    >
      <HorisontalBar
        fixed={0}
        refKey={'ME'}
        title={`${stringValue}`}
        value={me}
        // idealRange={[1, 100]}
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
        markersInside={[
          {
            pos: 1,
            text: "1%"
          },
          {
            pos: 25,
            text: "25%"
          },
          {
            pos: 50,
            text: "50%"
          },
          {
            pos: 75,
            text: "75%"
          },
          {
            pos: 100,
            text: "100%"
          },
        ]}
        gradientsColors={me_colors}
        expanded={auth.graphsExpanded}
      />
    </div>
  )
}
