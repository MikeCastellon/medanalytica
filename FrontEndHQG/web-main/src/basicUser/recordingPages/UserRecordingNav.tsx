import { Link } from '@tanstack/react-location';
import React from 'react'
import { Summary } from '../../Common/icons/Summary';
import { CheckIcon } from '../../Common/icons/CheckIcon';

export const UserRecordingNav = () => {
  return (
    <div className=' flex flex-col lg:flex-row lg:flex-wrap items-stretch gap-1 py-2 px-2'>
      {(
        [
          [".", "Summary", false, Summary],
        ] as const
      ).map(([to, label, search, icon]) => {
        return (
          <Link
            key={to}
            to={to}
            // search={search}
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
