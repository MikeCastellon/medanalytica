import { Link } from '@tanstack/react-location'
import _ from 'lodash'
import React, { ReactNode } from 'react'
import { DisplayWrapper } from '../Common/DisplayWrapper'
import { Book } from '../Common/icons/Book'
import { useGetSolutionsAndCategoryQuery, useGetTutorialsQuery } from '../generated/graphql'

const dataSource = {
  endpoint: import.meta.env.VITE_GRAPHQL_URL,
  fetchParams: {
    headers: {
      'X-Hasura-Admin-Secret': import.meta.env.VITE_GRAPHQL_HEADER
    }
  }
}

export const Tutorials = () => {

  const { data, isLoading, isError } = useGetTutorialsQuery(dataSource)


  if (isLoading) {
    return (
      <>
        <div>Getting your solutions</div>
      </>
    )
  }

  if (isError) {
    return (
      <>
        <div>Could not het solutions at this moment</div>
      </>
    )
  }



  return (
    <div className='ml-[380px]'>
      {data ?
        <div>
          <div className='flex flex-col mt-6'>
            <div className=' text-2xl mb-4 '>Tutorials</div>
            <div className='grid grid-cols-4 gap-4'>
              {
                data.tutorials.map((tut) => {
                  return (
                    <Link key={tut.id} to={tut.id}>
                      <div className='  flex-1 rounded-lg shadow-md '>
                        <div className=' flex flex-row justify-center items-center h-28 gradient-background rounded-md text-white '>
                          <div className='flex flex-row justify-center items-center w-24 h-24 bg-white rounded-full bg-opacity-10 '>
                            {
                              tut.type === "video" ?
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                                </svg>
                                : null
                            }
                            {
                              tut.type === "text" ?
                                <Book solid={false} />
                                : null

                            }

                          </div>
                        </div>
                        <div className='p-4'>
                          <div className='text-lg'>{tut.title}</div>
                          {/* <div className='flex flex-row flex-wrap gap-2 mt-4'>
                        {sol.tags.map((t: string) => {
                          return (
                            <div className='text-sm bg-primary-green px-2 py-1 rounded-md text-white'>{t}</div>
                          )
                        })}
                      </div> */}
                        </div>
                      </div>
                    </Link>
                  )
                })
              }
            </div>
          </div>
        </div>
        : null
      }
    </div>
  )
}

