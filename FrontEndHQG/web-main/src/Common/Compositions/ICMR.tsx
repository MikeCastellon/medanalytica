import React from 'react'
import { useAuth } from '../../Hooks/AuthContext'
import { useDescriptionModal } from '../../Hooks/DescriptionModal'
import { cmos_colors, icmr_colors, total_power } from '../../utils/gradients'
import { HorisontalBar } from '../graphs/HorisontalBar'
import { BasicModalElement } from '../Modals/BasicModalElement'


type ICMRProps = {
  icmr: number,
  refKey: string
  title: string
  descriptionKey?: string
  descriptionTitle?: string

}

export const ICMR = ({ icmr, refKey, title, descriptionKey, descriptionTitle }: ICMRProps) => {
  const auth = useAuth()
  const { setOpen } = useDescriptionModal()

  return (
    <div
      className='cursor-pointer'
      onClick={() => {
        (descriptionKey && descriptionTitle) ?
          setOpen(<BasicModalElement title={descriptionTitle} descriptionKey={descriptionKey} />)
          : null
      }}
    >
      <HorisontalBar
        refKey={refKey}
        title={title}
        value={icmr}
        // idealRange={[3.3, 6.6]}
        absoluteRange={[0, 10]}
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
          //   {
          //   pos: 1,
          //   text: "1"
          // },
          // {
          //   pos: 15,
          //   text: "15"
          // },
          // {
          //   pos: 30,
          //   text: "30"
          // },
          // {
          //   pos: 50,
          //   text: "50"
          // },
          // {
          //   pos: 100,
          //   text: "100"
          // },
        ]}
        gradientsColors={icmr_colors}
        expanded={auth.graphsExpanded}
      />
    </div>
  )
}
