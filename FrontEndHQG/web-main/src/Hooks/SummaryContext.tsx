import { useMatch } from '@tanstack/react-location'
import _ from 'lodash'
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { Order_By, useGetAllHeartDataForOwnerQuery, useGetSpecificExplanationQuery, useGetValuesParametersQuery } from '../generated/graphql'
import { LocationGenerics } from '../Router/CustomRouter'
import { summariseRecording, restructureValuesMetadata, buildReport } from '../utils/summariseRecording'
import differenceInYears from 'date-fns/differenceInYears'
import { useUserContext } from './UserContext'


const dataSource = {
  endpoint: import.meta.env.VITE_GRAPHQL_URL,
  fetchParams: {
    headers: {
      // 'Authorization': `Bearer ${auth.user?.token}`,
      'X-Hasura-Admin-Secret': import.meta.env.VITE_GRAPHQL_HEADER
    }
  }
}


type TSummaryFn = {
  getSummaryItemByKey: (key: string) => any | null
}

type TSummaryState = {
  summaryItems: any[]
  summaryItemsByKey: any[]
}

type TSummaryContext = TSummaryFn & TSummaryState

const SummaryContext = createContext<TSummaryContext>(null!);

export const SummaryProvider = (props: { children: React.ReactNode }) => {

  const { params: { subjectId }, data: {
    // currentRecording, 
    // subject 
  } } = useMatch<LocationGenerics>()
  const { currentRecording } = useUserContext()
  const { data: subject, isLoading: subjectLoading, refetch: subjectRefetch } = useGetAllHeartDataForOwnerQuery(dataSource, {
    _eq: subjectId || "",
    id: subjectId,
    where: {
      owner: { _eq: subjectId },
      deleted_on: { _is_null: true },
      // ...(query.get('trend') ? { trend_recording: { _eq: query.get('trend') } } : { trend_recording: { _is_null: false } }),
    },
    order_by: Order_By.Desc
  }, {
    enabled: !!subjectId,
  })

  const age = subject && differenceInYears(new Date(), new Date(subject.users_by_pk?.birth_date))
  const gender = subject && subject.users_by_pk?.data && JSON.parse(subject.users_by_pk?.data).data.gender

  const recording = currentRecording?.data as Recording

  const values = useGetValuesParametersQuery(dataSource)
  const explanations = useGetSpecificExplanationQuery(dataSource, {
    age: age,
    gender: ["all", gender?.toLocaleLowerCase()],
    status: "published"
  }, {
    enabled: !!gender
  })
  // console.log(explanations.data);


  const summaryValues = recording && values && values.data && buildReport(summariseRecording(recording, values.data.values), restructureValuesMetadata(values.data.values))
  const summaryValuesByKey = recording && values && values.data && buildReport(summariseRecording(recording, values.data.values), restructureValuesMetadata(values.data.values)).map((d: any) => ({

    ...d,
    explanations: explanations && explanations.data?.match.filter((e) => e.refKey?.id === d.id)

  }))

  // console.log(summaryValuesByKey);


  const getSummaryItemByKey = (key: string) => {
    const item = _.find(summaryValuesByKey, { id: key })
    return item || null
  }


  const context = useMemo(
    () => ({
      summaryItems: summaryValues || [],
      summaryItemsByKey: summaryValuesByKey || [],
      getSummaryItemByKey
    })
    , [recording, values, explanations])

  return (
    <SummaryContext.Provider value={context} children={props.children} />
  )
}

export function useSummary() {
  return useContext(SummaryContext)
}

const matchExplanationsToValue = () => {

}