import { format } from 'date-fns'
import React from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useGetAnswerSetAnswersForUserQuery } from '../generated/graphql'

type TrendAnswerSets = {
  owner_id: string
  question_set_id: string
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

export const TrendAnswerSets = ({ owner_id, question_set_id }: TrendAnswerSets) => {

  const { data: pastAnswers } = useGetAnswerSetAnswersForUserQuery(dataSource, {
    owner_id,
    question_set_id,
    question_set_id_ID: question_set_id,
  })

  const previousSubmissionsTotal = pastAnswers?.answer_set.map((pa) => {
    return {
      score: pa.answers ?
        pa.answers.reduce((prev, curr, arr) => {
          const currentValue = (curr && curr.option && curr.option.value) ? curr?.option?.value : 0
          return curr ? prev + currentValue : prev
        }, 0)
        : 0,
      date: format(new Date(pa.date_created), 'dd MMM yyyy  kk:mm')
    }
  }).reverse()

  return (

    previousSubmissionsTotal && previousSubmissionsTotal?.length >= 2 ?
      <div className='mt-4'>
        <div className='pl-8 text-xl text-primary-grey mb-4'>Previous Answer Scores</div>
        <ResponsiveContainer width="95%" height={200}>
          <LineChart data={previousSubmissionsTotal}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis dataKey="score" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="score" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      : null

  )
}
