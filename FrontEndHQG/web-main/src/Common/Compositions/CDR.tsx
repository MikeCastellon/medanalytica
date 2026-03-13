import React from 'react'
import { useAuth } from '../../Hooks/AuthContext'
import { useDescriptionModal } from '../../Hooks/DescriptionModal'
import { cdr_colors, cmos_colors, icmr_colors, total_power } from '../../utils/gradients'
import { HorisontalBar } from '../graphs/HorisontalBar'
import { BasicModalElement } from '../Modals/BasicModalElement'


type CDRProps = {
  cdr: number,
  refKey: string
  title: string
  descriptionKey?: string
  descriptionTitle?: string
}

export const CDR = ({ cdr, refKey, title, descriptionKey, descriptionTitle }: CDRProps) => {
  const auth = useAuth()
  const { setOpen } = useDescriptionModal()

  return (
    <div
      className='cursor-pointer'
      onClick={() =>
        (descriptionKey && descriptionTitle) ?
          setOpen(<BasicModalElement title={descriptionTitle} descriptionKey={descriptionKey} />)
          : null
      }
    >
      <HorisontalBar
        refKey={refKey}
        title={title}
        value={cdr}
        // idealRange={[]}
        absoluteRange={[0, 6]}
        markersBottom={[
          // {
          //   pos: 0,
          //   text: "Depletion"
          // },
          // {
          //   pos: 2,
          //   text: "WNL"
          // },
          // {
          //   pos: 4,
          //   text: "Stagnation"
          // }
        ]}
        markersInside={[
          {
            pos: 0.5,
            text: "Depletion"
          },
          {
            pos: 3,
            text: "WNL"
          },
          {
            pos: 5.5,
            text: "Stagnation"
          },
          // {
          //   pos: 50,
          //   text: "50"
          // },
          // {
          //   pos: 100,
          //   text: "100"
          // },
        ]}
        gradientsColors={cdr_colors}
        expanded={auth.graphsExpanded}
      />
    </div>
  )
}
