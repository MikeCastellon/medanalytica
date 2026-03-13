import React, { ReactNode } from 'react'
import * as Dialog from '@radix-ui/react-dialog';
import { useDescriptionModal } from '../../Hooks/DescriptionModal';


export const Modal = () => {
  const { isOpen, setClosed, descriptionElement } = useDescriptionModal()
  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay
          onClick={setClosed}
          className='fixed top-0 bottom-0 bg-gray-600 bg-opacity-50 overflow-auto w-full z-50 flex flex-col justify-center items-center py-24'
        >
          {descriptionElement}
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
