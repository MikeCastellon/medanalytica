import React from 'react'
import { useAuth } from '../../Hooks/AuthContext'
import { useDescriptionModal } from '../../Hooks/DescriptionModal'
import { minerals } from '../../utils/gradients'
import { HorisontalBar } from '../graphs/HorisontalBar'
import { BasicModalElement } from '../Modals/BasicModalElement'

type MineralBarCollectionProps = {
  k: number
  na: number
  mg: number
  ca: number
}

const lowHighMarkers = [
  {
    pos: 0,
    text: "low"
  },
  {
    pos: 10,
    text: "high"
  }
]

export const MineralBarCollection = ({ k, na, mg, ca }: MineralBarCollectionProps) => {
  const auth = useAuth()
  const { setOpen } = useDescriptionModal()
  return (
    <>
      <h2 className='ml-6 text-black text-xl'>Minerals</h2>
      <div onClick={() => setOpen(<BasicModalElement title='K (Potassium)' descriptionKey="k" />)} className='cursor-pointer'>
        <HorisontalBar
          refKey='k'
          title='K (Potassium)'
          value={k}
          idealRange={[4, 6]}
          absoluteRange={[0, 10]}
          markersBottom={lowHighMarkers}
          gradientsColors={minerals}
          expanded={auth.graphsExpanded} />
      </div>
      <div onClick={() => setOpen(<BasicModalElement title='Na (Sodium)' descriptionKey="na" />)} className='cursor-pointer'>
        <HorisontalBar
          refKey='na'
          title='Na (Sodium)'
          value={na}
          idealRange={[4, 6]}
          absoluteRange={[0, 10]}
          markersBottom={lowHighMarkers}
          gradientsColors={minerals}
          expanded={auth.graphsExpanded} />
      </div>
      <div onClick={() => setOpen(<BasicModalElement title='Mg (Magnesium)' descriptionKey="mg" />)} className='cursor-pointer'>
        <HorisontalBar
          refKey='mg'
          title='Mg (Magnesium)'
          value={mg}
          idealRange={[4, 6]}
          absoluteRange={[0, 10]}
          markersBottom={lowHighMarkers}
          gradientsColors={minerals}
          expanded={auth.graphsExpanded} />
      </div>
      <div onClick={() => setOpen(<BasicModalElement title='Ca (Calcium)' descriptionKey="ca" />)} className='cursor-pointer'>
        <HorisontalBar
          refKey='Ca'
          title='Ca (Calcium)'
          value={ca}
          idealRange={[4, 6]}
          absoluteRange={[0, 10]}
          markersBottom={lowHighMarkers}
          gradientsColors={minerals}
          expanded={auth.graphsExpanded} />
      </div>
    </>
  )
}
