import { Link } from '@tanstack/react-location'
import React from 'react'
import { useAuth } from '../Hooks/AuthContext'

export const SecondaryMenu = () => {
  const auth = useAuth()

  return (
    <div className='flex justify-between items-center h-12 bg-light-grey '>
      <nav className="">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="flex items-center">
            <ul className="flex flex-row font-medium mt-0 mr-6 space-x-8 text-sm list-none">
              {
                auth.user?.roles?.includes('professional') ?
                  <li className='py-4'>
                    <Link to={`/${auth?.user?.id}/dashboard`} className="text-xl text-gray-900 dark:text-white hover:underline" >Portal</Link>
                  </li> : null
              }
              <li className='py-4'>
                <Link to={`/${auth?.user?.id}/recordings`} className="text-xl text-gray-900 dark:text-white hover:underline" >Home</Link>
              </li>
              <li className='py-4'>
                <Link to={`/${auth?.user?.id}/questionnaires`} className="text-xl text-gray-900 dark:text-white hover:underline" >Questionnaires</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

    </div>
  )
}
