import React, { useState } from 'react'
import * as SwitchPrimitive from '@radix-ui/react-switch';

type SwitchProps = {
  defaultChecked: boolean
  onChange: (value: boolean) => void
}

export const Switch = ({ defaultChecked, onChange }: SwitchProps) => {
  const [checked, setChecked] = useState(defaultChecked)
  return (
    <SwitchPrimitive.Root
      onClick={() => {
        setChecked(!checked)
        onChange(!checked)
      }}
      className={`w-9 h-5  rounded-full border-desaturated-grey border-2 ${checked ? 'bg-primary-green' : 'bg-desaturated-grey '} `}
    >
      <SwitchPrimitive.SwitchThumb
        // defaultChecked={trend_recording}
        className={`h-4 w-4  block rounded-full ${checked ? 'translate-x-4 bg-white ' : 'bg-white '} transition ease-in-out delay-150`}></SwitchPrimitive.SwitchThumb>
    </SwitchPrimitive.Root>
  )
}
