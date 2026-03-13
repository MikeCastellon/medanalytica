import { Link } from '@tanstack/react-location';
import React, { useEffect, useState } from 'react'
import { Ayurvedic } from '../Common/icons/Ayurvedic';
import { Book } from '../Common/icons/Book';
import { Brain } from '../Common/icons/Brain';
import { CheckIcon } from '../Common/icons/CheckIcon';
import { Chinese } from '../Common/icons/Chinese';
import { Heart } from '../Common/icons/Heart';
import { Minerals } from '../Common/icons/Minerals';
import { Nerve } from '../Common/icons/Nerve';
import { NervousSystem } from '../Common/icons/NervousSystem';
import { Summary } from '../Common/icons/Summary';
import { NotesModal } from '../Common/Modals/NotesModal';
import { useScrollHook } from '../Hooks/ScrollHook';

export const MenuCompare = () => {

  const offset = useScrollHook()

  return (
    <div className='flex flex-col lg:flex-row lg:flex-wrap items-stretch gap-1 py-2 px-2'>
      {(
        [
          // [".", "Summary", false, Summary],
          [".", "Cardio", true, Heart],
          ["nervous-system", "Nervous System", false, NervousSystem],
          ["minerals-hormones", "Minerals Hormones", false, Minerals],
          ["brain", "Brain", false, Brain],
          ["ayurvedic", "Ayurvedic", false, Ayurvedic],
          ["chinese", "Chinese Medicine", false, Chinese],
        ] as const
      ).map(([to, label, search, icon]) => {
        return (
          <Link
            key={to}
            to={to}
            className={`flex flex-row items-center gap-1 xl:block text-center pt-2 pb-1 px-2  hover:bg-light-grey rounded-md leading-4 whitespace-pre-line font-light`}
            activeOptions={{ exact: to === "." }}
            getActiveProps={() => {
              return { className: `font-bold bg-light-grey ` }
            }}
          >
            <div className='flex justify-center mb-1'>
              {icon ? icon() :
                <CheckIcon />
              }
            </div>
            <div className='hidden lg:flex'>
              {label.split(" ").join("\n")}
            </div>
            <div className='lg:hidden'>
              {label}
            </div>
          </Link>
        );
      })}
    </div>
  )
}
