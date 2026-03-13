import React from 'react'
import { Order_By, useGetAllHeartDataForOwnerQuery } from '../generated/graphql'
import { Outlet, useMatch } from '@tanstack/react-location'
import { LocationGenerics } from '../Router/CustomRouter'
import { UserRecordingMenuItem } from './UserRecordingMenuItem'

const dataSource = {
  endpoint: import.meta.env.VITE_GRAPHQL_URL,
  fetchParams: {
    headers: {
      // 'Authorization': `Bearer ${auth.user?.token}`,
      'X-Hasura-Admin-Secret': import.meta.env.VITE_GRAPHQL_HEADER
    }
  }
}


export const BasicUserRootPage = () => {
  const { params: { userId } } = useMatch<LocationGenerics>()

  return (
    <div className='flex flex-row h-full'>
      Show Recording screen Here
      <div className='flex flex-col mt-2'>
        <Outlet />
      </div>
    </div>
  )
}
