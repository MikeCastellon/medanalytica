import { useMatch } from '@tanstack/react-location'
import React, { ReactNode, useEffect } from 'react'
import { useScrollHook } from '../../Hooks/ScrollHook'
import { LocationGenerics } from '../../Router/CustomRouter'
import { useUserContext } from '../../Hooks/UserContext'
import { Heart_Data, Order_By, useGetAllHeartDataForOwnerQuery } from '../../generated/graphql'
import { findRecordingById } from '../../utils/functionUtils';



type DisplayWrapperProps = {
  children: ReactNode
}
const dataSource = {
  endpoint: import.meta.env.VITE_GRAPHQL_URL,
  fetchParams: {
    headers: {
      // 'Authorization': `Bearer ${auth.user?.token}`,
      'X-Hasura-Admin-Secret': import.meta.env.VITE_GRAPHQL_HEADER
    }
  }
}

export const UserDisplayWrapper = ({ children }: DisplayWrapperProps) => {
  const { params: { userId, recordingId } } = useMatch<LocationGenerics>()

  const offset = useScrollHook()
  const { currentRecording, setCurrentRecording } = useUserContext()
  const { data: subject, isLoading: subjectLoading, refetch: subjectRefetch } = useGetAllHeartDataForOwnerQuery(dataSource, {
    _eq: userId || "",
    id: userId,
    where: {
      owner: { _eq: userId },
      deleted_on: { _is_null: true },
    },
    order_by: Order_By.Desc
  }, {
    enabled: !!userId,
  })

  useEffect(() => {
    const currentRecording1 = subject?.heart_data && recordingId ? subject.heart_data.find((h) => findRecordingById(h, recordingId)) as Heart_Data : undefined
    currentRecording1 && setCurrentRecording(currentRecording1)
  })

  if (!currentRecording) {
    return (
      <div
        className={`flex flex-col m-5 mt-28    `}>
        <div>Loading current recording</div>
      </div>
    )
  }

  return (
    <div className={`flex flex-col m-5`}>
      {children}
    </div>
  )
}
