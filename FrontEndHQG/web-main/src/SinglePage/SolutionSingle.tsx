import { useLocation, useMatch } from '@tanstack/react-location'
import React from 'react'
import { DisplayWrapper } from '../Common/DisplayWrapper'
import { useGetSingleSolutionQuery } from '../generated/graphql'
import { SubjectContextBox } from '../Common/SubjectContextBox'

const dataSource = {
  endpoint: import.meta.env.VITE_GRAPHQL_URL,
  fetchParams: {
    headers: {
      'X-Hasura-Admin-Secret': import.meta.env.VITE_GRAPHQL_HEADER
    }
  }
}

export const SolutionSingle = () => {

  const {
    params: { userId, subjectId, solutionId },
  } = useMatch()

  const location = useLocation()

  const { data, isLoading, isError, error } = useGetSingleSolutionQuery(dataSource, {
    id: solutionId
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
      <div className='flex flex-row justify-stretch '>
        <div className='ml-[83px] w-[380px]'>
          <SubjectContextBox 
            userId={userId}
            subjectId={subjectId}
            />
        </div>
        <div className='flex flex-col flex-1 p-4'>
          <div className='flex h-44 gradient-background items-end p-4'>

            <div className='flex flex-row'>
              <button type="button" onClick={() => location.history.back()} className='bg-white px-5 py-1 rounded-md '>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 fill-primary-green">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
                </svg>
              </button>
            </div>
          </div>
          <div className='text-4xl mb-8 mt-4'>{data.Solution_by_id?.title}</div>
          <div>Category: <span className='italic '>{data.Solution_by_id?.category?.name}
          </span> </div>
          <div className='text-sm'>Tags:
            <div className='flex flex-row gap-2'>
              {data.Solution_by_id?.tags?.map((t: string) => {
                return (
                  <div key={t} className='text-xs bg-desaturated-grey  px-2 py-1 rounded-md '>{t}</div>
                )
              })}</div>
          </div>
          <div className='text-sm pb-4 mt-9' dangerouslySetInnerHTML={{ __html: data?.Solution_by_id?.content || "" }}></div>


        </div>
      </div>
    </>
  )
}
