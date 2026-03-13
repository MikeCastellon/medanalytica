import React from 'react'
import { useAuth } from '../../Hooks/AuthContext'
import { useDescriptionModal } from '../../Hooks/DescriptionModal'
import { neuroTransmitters, neuroTransmittersBalance } from '../../utils/gradients'
import { HorisontalBar } from '../graphs/HorisontalBar'
import { BasicModalElement } from '../Modals/BasicModalElement'


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


const balanceMarkers = [
  {
    pos: -13,
    text: "Excitatory Deficiency"
  },
  {
    pos: 13,
    text: "Inhibitory Deficiency"
  }
]


export const NeuroTransmitterCollection = ({ currentRecording }: any) => {
  const auth = useAuth()
  const { setOpen } = useDescriptionModal()
  return (
    <>
      <div onClick={() => setOpen(<BasicModalElement title='Dopa' descriptionKey="dopa" />)} className='cursor-pointer'>
        <HorisontalBar
          refKey='dopa'
          title='Dopa'
          value={currentRecording?.data.bnt.dopa}
          idealRange={[2, 4]}
          absoluteRange={[0, 7.5]}
          // fixed={3}
          markersBottom={lowHighMarkers}
          gradientsColors={neuroTransmitters}
          expanded={auth.graphsExpanded} />
      </div>
      <div onClick={() => setOpen(<BasicModalElement title='Ct E' descriptionKey="ct_e" />)} className='cursor-pointer'>
        <HorisontalBar
          refKey='ct_e'
          title='Ct E'
          value={currentRecording?.data.bnt.ct_e}
          idealRange={[2, 4]}
          absoluteRange={[0, 7.5]}
          // fixed={3}
          markersBottom={lowHighMarkers}
          gradientsColors={neuroTransmitters}
          expanded={auth.graphsExpanded} />
      </div>
      <div onClick={() => setOpen(<BasicModalElement title='Ct Ne' descriptionKey="ct_ne" />)} className='cursor-pointer'>
        <HorisontalBar
          refKey='ct_ne'
          title='Ct_Ne'
          value={currentRecording?.data.bnt.ct_ne}
          idealRange={[2, 4]}
          absoluteRange={[0, 7.5]}
          // fixed={3}
          markersBottom={lowHighMarkers}
          gradientsColors={neuroTransmitters}
          expanded={auth.graphsExpanded} />
      </div>

      <div className='border-2 border-secondary-grey rounded-lg bg-[#FCFCFC]'>
        <HorisontalBar
          refKey='neurobalance'
          title='Neuro Balance'
          value={(currentRecording?.data?.bnt?.dopa + currentRecording?.data?.bnt?.ct_e + currentRecording?.data?.bnt?.ct_ne) - (currentRecording?.data?.bnt?.ach + currentRecording?.data?.bnt?.gaba + currentRecording?.data?.bnt?.sert)}
          idealRange={[-2, 2]}
          absoluteRange={[-15, 15]}
          // fixed={3}
          markersBottom={balanceMarkers}
          gradientsColors={neuroTransmittersBalance}
          expanded={auth.graphsExpanded} />
      </div>

      <div onClick={() => setOpen(<BasicModalElement title='Ach' descriptionKey="ach" />)} className='cursor-pointer'>
        <HorisontalBar
          refKey='ach'
          title='Ach'
          value={currentRecording?.data.bnt.ach}
          idealRange={[2, 4]}
          absoluteRange={[0, 7.5]}
          // fixed={3}
          markersBottom={lowHighMarkers}
          gradientsColors={neuroTransmitters}
          expanded={auth.graphsExpanded} />
      </div>
      <div onClick={() => setOpen(<BasicModalElement title='Gaba' descriptionKey="gaba" />)} className='cursor-pointer'>
        <HorisontalBar
          refKey='gaba'
          title='Gaba'
          value={currentRecording?.data.bnt.gaba}
          idealRange={[2, 4]}
          absoluteRange={[0, 7.5]}
          // fixed={3}
          markersBottom={lowHighMarkers}
          gradientsColors={neuroTransmitters}
          expanded={auth.graphsExpanded} />
      </div>
      <div onClick={() => setOpen(<BasicModalElement title='Sert' descriptionKey="sert" />)} className='cursor-pointer'>
        <HorisontalBar
          refKey='sert'
          title='Sert'
          value={currentRecording?.data.bnt.sert}
          idealRange={[2, 4]}
          absoluteRange={[0, 7.5]}
          // fixed={3}
          markersBottom={lowHighMarkers}
          gradientsColors={neuroTransmitters}
          expanded={auth.graphsExpanded} />
      </div>
    </>
  )
}


