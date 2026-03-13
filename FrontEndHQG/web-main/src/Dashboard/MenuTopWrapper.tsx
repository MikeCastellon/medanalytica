import React, { useState } from 'react'
import { useScrollHook } from '../Hooks/ScrollHook';
import { useMediaQuery } from 'react-responsive'
import { Hamburger } from '../Common/icons/Hamburger';
import { XMark } from '../Common/icons/XMark';


interface Props {
  children: React.ReactNode;
}



export const MenuTopWrapper: React.FC<Props> = ({ children }) => {

  const isDesktop = useMediaQuery({ minWidth: 1560 })

  const [menuExpanded, setMenuExpanded] = useState(false)

  const offset = useScrollHook()

  return (
    <div>
      <div className={`flex flex-col 2xl:flex-row ${offset >= 64 ? 'fixed top-0' : 'absolute -top-[' + (64 - offset) + 'px]'} backdrop-blur-md left-[380px] right-0 justify-between  h-18 border-b-2 border-light-grey mb-4 bg-white/30 z-10`}>

        {
          !isDesktop ?
            <div className=' flex flex-col lg:flex-row lg:flex-wrap items-stretch gap-1 py-2 px-2'>
              {
                !menuExpanded ?
                  <button
                    type='button'
                    className='flex flex-row items-center gap-1 xl:block text-center pt-2 pb-1 px-2  hover:bg-light-grey rounded-md leading-4 whitespace-pre-line font-light'
                    onClick={() => setMenuExpanded(!menuExpanded)}
                  >
                    <Hamburger />
                  </button> :
                  <button
                    type='button'
                    className='flex flex-row items-center gap-1 xl:block text-center pt-2 pb-1 px-2  hover:bg-light-grey rounded-md leading-4 whitespace-pre-line font-light'
                    onClick={() => setMenuExpanded(!menuExpanded)}
                  >
                    <XMark />
                  </button>

              }
            </div>
            :
            children
        }
      </div>
      {
        menuExpanded && !isDesktop ?
          <div className={`flex flex-col 2xl:flex-row ${offset >= 64 ? 'fixed top-0' : 'absolute -top-[' + (64 - offset) + 'px]'} mt-12  backdrop-blur-md left-[380px] right-0 justify-between  h-18 border-b-2 border-t-2 border-light-grey mb-4 bg-white/30 z-10`}>
            {children}
          </div>
          : null
      }
    </div>
  )
}

