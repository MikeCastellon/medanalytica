import { Link, Outlet, useMatch } from '@tanstack/react-location'
import React from 'react'
import { LocationGenerics } from '../Router/CustomRouter'
import { Order_By, useGetAllHeartDataForOwnerQuery } from '../generated/graphql'
import { MainHeader } from '../Common/MainHeader'
import { SecondaryMenu } from './SecondaryMenu'
import { UserRecordingMenuItem } from './UserRecordingMenuItem'
import { AddiIcon } from '../Common/icons/AddiIcon'
import { useAuth } from '../Hooks/AuthContext'


const dataSource = {
  endpoint: import.meta.env.VITE_GRAPHQL_URL,
  fetchParams: {
    headers: {
      // 'Authorization': `Bearer ${auth.user?.token}`,
      'X-Hasura-Admin-Secret': import.meta.env.VITE_GRAPHQL_HEADER
    }
  }
}

export const BasicUserRecordingsLayout = () => {
  const { params: { userId } } = useMatch<LocationGenerics>()

  const { data, isLoading, refetch: subjectRefetch } = useGetAllHeartDataForOwnerQuery(dataSource, {
    _eq: userId || "",
    id: userId,
    where: {
      owner: { _eq: userId },
      deleted_on: { _is_null: true },
      // ...(query.get('trend') ? { trend_recording: { _eq: query.get('trend') } } : { trend_recording: { _is_null: false } }),
    },
    order_by: Order_By.Desc
  }, {
    enabled: !!userId,
    refetchInterval: 3000
  })
  return (
    <div>
      <MainHeader />
      <SecondaryMenu />
      <div className='flex flex-row h-full'>
        <div className='flex flex-col min-w-[380px] max-w-xs w-full bg-light-grey mt-2 h-full'>
          <h1 className='p-6'>Your Recordings</h1>
          <div className='text-xl px-2 py-2 '>
            <Link to={`/${userId}/recordings/`} className='flex flex-row items-center '>
              <div className='p-1 bg-primary-red shadow-md text-white rounded-full'>
                <AddiIcon />
              </div>
              <span className='pl-3'>New Recording</span>
            </Link>
          </div>
          <div className='mt-8 max-h-[1500px] overflow-auto scrollbar-hide'>
            {
              isLoading ? <div className='text-xl text-center py-2 mb-2'>Loading Recordings...</div> : null
            }
            {data?.heart_data && data?.heart_data.length !== 0 &&
              data?.heart_data.map((hd) => {
                return (
                  <UserRecordingMenuItem key={hd.id} recording={{ ...hd }} />
                )
              })
            }

            <div className="bg-primary-red text-white flex text-center justify-center">List end</div>
          </div>
        </div>
        <div className='flex flex-col mt-2 ml-4 w-full'>
          <Outlet />
          {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
        </div>
      </div>
    </div>
  )
}
