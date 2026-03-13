import React, { ReactNode } from 'react'
import * as Collapsible from '@radix-ui/react-collapsible';

type CollapsiblePanelProps = {
  title: string | ReactNode
  content: string | ReactNode | JSX.Element
}

export const CollapsiblePanel = ({ title, content }: CollapsiblePanelProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div id="exlude-from-print">

      <Collapsible.Root open={open} onOpenChange={setOpen} className='flex flex-col border-2 border-desturated-grey rounded-md p-2 transition-all duration-300 my-4 '>
        <Collapsible.Trigger className='transition-all duration-300' onClick={(e) => e.stopPropagation()}>
          {title}
        </Collapsible.Trigger>
        <Collapsible.Content className='border-t-2 border-desaturated-grey mt-2 transition-all duration-300 max-h-[650px] overflow-auto'>
          {content}
        </Collapsible.Content>
      </Collapsible.Root>
    </div>
  )
}
