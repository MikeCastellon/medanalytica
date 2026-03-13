import React from 'react'
import { useAuth } from '../../Hooks/AuthContext'
import { useDescriptionModal } from '../../Hooks/DescriptionModal'
import { energy_index, poly_vagal, psActivity } from '../../utils/gradients'
import { HorisontalBar } from '../graphs/HorisontalBar'
import { BasicModalElement } from '../Modals/BasicModalElement'

type PolyVagalCollectionProps = {
  paraActivity: number
  energyIndex: number
  polyVagal: number
}

export const PolyVagalCollection = ({ paraActivity, energyIndex, polyVagal }: PolyVagalCollectionProps) => {
  const auth = useAuth()
  const { setOpen } = useDescriptionModal()
  return (
    <div className='cursor-pointer border-2 border-secondary-grey rounded-lg'
      onClick={() => setOpen(<BasicModalElement title='Poly Vagal' descriptionKey="dorsalVagus" />)}
    >
      <h2 className='ml-2 mt-2'>Poly Vagal</h2>
      <div className='ml-8 mb-3'>Dorsal Vagus N. triggers shut down/freeze physiology</div>
      <HorisontalBar
        refKey='para-activity'
        title='Parasympathetic Activity'
        value={paraActivity}
        idealRange={[15, 30]}
        absoluteRange={[0, 70]}
        gradientsColors={psActivity}
        expanded={auth.graphsExpanded}
      />
      <HorisontalBar
        refKey='energy-index'
        title='Energy Index'
        value={energyIndex}
        idealRange={[3500, 1500]}
        absoluteRange={[5000, 100]}
        markersInside={[{
          pos: 5000,
          text: "5K"
        },
        {
          pos: 1000,
          text: "1K"
        },
        {
          pos: 500,
          text: "0.5"
        },
        {
          pos: 100,
          text: "0.1"
        },
        ]}
        gradientsColors={energy_index}
        expanded={auth.graphsExpanded}
        fixed={0}
      />
      <HorisontalBar
        refKey='poly-vagal'
        title='Poly-Vagal'
        value={polyVagal}
        idealRange={[0.25, 1.0]}
        absoluteRange={[0.25, 3.0]}
        markersInside={[{
          pos: 0.5,
          text: "0.5"
        },
        {
          pos: 0.8,
          text: "0.8"
        }, {
          pos: 1.2,
          text: "1.2"
        },
        {
          pos: 3.0,
          text: "3.0"
        }
        ]}
        markersBottom={[{
          pos: 0.5,
          text: "Ventral nucleous"
        },
        {
          pos: 1.4,
          text: "Balanced"
        }, {
          pos: 2.8,
          text: "Dorsal nucleous"
        },

        ]}
        gradientsColors={poly_vagal}
        expanded={auth.graphsExpanded}
      />
    </div>
  )
}
