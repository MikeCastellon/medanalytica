import { Link, useMatch } from '@tanstack/react-location'
import { useAuth } from '../Hooks/AuthContext'
import { Logo } from './Logo'


export const MainHeader = () => {
  const auth = useAuth()

  return (
    <div className='flex justify-between items-center h-16 bg-primary-red text-white border-b-2 border-white '>
      <div className='flex flex-row w-16 h-16 text-center items-center justify-center text-xl'>
        <Logo />
      </div>
      <div className='flex-1 ml-5 text-xl'>{auth.user?.firstName} {auth.user?.lastName}</div>
      <div className='flex flex-1 w-16 h-16 text-center items-center justify-end mr-8'>
        <div className='flex  text-center items-center justify-center'>
          {auth.user?.roles.includes("admin") ?
            <>
              <Link
                className=' px-2 py-1 rounded-md hover:bg-white hover:text-charcoal text-xs'
                to={`/${auth.user?.id}/dashboard`}
              >
                DASHBOARD
              </Link>
              <Link
                className=' px-2 py-1 rounded-md hover:bg-white hover:text-charcoal text-xs'
                to={`/${auth.user?.id}/admin`}
              >
                ADMIN
              </Link>
            </>
            : null}
          <button
            className=' px-2 py-1 rounded-md hover:bg-white hover:text-charcoal text-xs'
            onClick={auth.logout}
          >
            LOGOUT
          </button>
        </div>
        {/* <div className='flex  text-center items-center justify-center'>
          <Link
            to={`/${userId}/account`}
            className=' px-2 py-1 rounded-md hover:bg-white hover:text-charcoal text-xs'
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </Link>
        </div> */}
      </div>
    </div>
  )
}
