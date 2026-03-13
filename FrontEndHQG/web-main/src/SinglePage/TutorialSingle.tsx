import { useLocation, useMatch } from '@tanstack/react-location'
import React from 'react'
import { DisplayWrapper } from '../Common/DisplayWrapper'
import { useGetSingleSolutionQuery, useGetTutorialByIdQuery } from '../generated/graphql'

const dataSource = {
  endpoint: import.meta.env.VITE_GRAPHQL_URL,
  fetchParams: {
    headers: {
      'X-Hasura-Admin-Secret': import.meta.env.VITE_GRAPHQL_HEADER
    }
  }
}

export const TutorialSingle = () => {

  const {
    params: { tutorialId },
  } = useMatch()

  const location = useLocation()

  const { data, isLoading, isError, error } = useGetTutorialByIdQuery(dataSource, {
    id: tutorialId
  })

  if (isLoading) {
    return (
      <>
        <div>Getting the solution details</div>
      </>
    )
  }

  if (isError) {
    return (
      <>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </>
    )
  }

  return (
    <>
      <div className='flex flex-col items-center '>
        <div className='flex flex-col w-full md:w-3/5 lg:w-1/2'>
          <div className='flex h-44 gradient-background items-end p-4'>
            <div className='flex flex-row'>
              <button type="button" onClick={() => location.history.back()} className='bg-white px-5 py-1 rounded-md '>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 fill-primary-green">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
                </svg>
              </button>
            </div>
          </div>
          <div className='text-4xl mb-8 mt-4'>{data.tutorials_by_id?.title}</div>
          <div className='text-sm text-primary-grey pb-4 mt-9' dangerouslySetInnerHTML={{ __html: data?.tutorials_by_id?.body || "" }}></div>
        </div>
      </div>
    </>
  )
}
