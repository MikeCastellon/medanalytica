import { Outlet, useMatch } from '@tanstack/react-location'
import React from 'react'
import { LocationGenerics } from '../Router/CustomRouter'
import { Order_By, useGetAllHeartDataForOwnerQuery } from '../generated/graphql'
import { UserRecordingNav } from './recordingPages/UserRecordingNav'
import { MenuTopWrapper } from '../Dashboard/MenuTopWrapper'
import { SummaryProvider } from '../Hooks/SummaryContext'


const dataSource = {
  endpoint: import.meta.env.VITE_GRAPHQL_URL,
  fetchParams: {
    headers: {
      // 'Authorization': `Bearer ${auth.user?.token}`,
      'X-Hasura-Admin-Secret': import.meta.env.VITE_GRAPHQL_HEADER
    }
  }
}

export const BasicUserRecordingLayout = () => {
  const { params: { userId, recordingId } } = useMatch<LocationGenerics>()


  return (
    <div>
      <MenuTopWrapper >
        <UserRecordingNav />
      </MenuTopWrapper>
      <div className='h-20'></div>
      <div className='p-4'>
        <SummaryProvider >
          <Outlet />
        </SummaryProvider>
      </div>
    </div>
  )
}
