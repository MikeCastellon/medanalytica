import { Link, useLocation } from '@tanstack/react-location'
import { useGetQuestionSetsQuery } from '../../generated/graphql'
import { Loader } from '../../Common/Loader'
import { Book } from '../../Common/icons/Book'

const dataSource = {
  endpoint: import.meta.env.VITE_GRAPHQL_URL,
  fetchParams: {
    headers: {
      // 'Authorization': `Bearer ${auth.user?.token}`,
      'X-Hasura-Admin-Secret': import.meta.env.VITE_GRAPHQL_HEADER
    }
  }
}

export const ListUserQuestionSets = () => {
  const location = useLocation()

  const { data, isLoading } = useGetQuestionSetsQuery(dataSource)

  return (
    <div className=' p-8'>
      <div className='flex flex-col justify-between h-44 gradient-background items-start p-4'>
        <div className='flex flex-row'>
          <button type="button" onClick={() => location.history.back()} className='bg-white px-5 py-1 rounded-md '>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 fill-primary-green">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
            </svg>
          </button>
        </div>
        <div className='flex-row'>
          <div className='text-4xl text-white'>Question Sets</div>
          <p className='text-white text-lg'>Question sets are a subset of questionnaires and can be completed without the context of a questionnaire</p>
        </div>
      </div>

      {
        isLoading ?
          <div className='flex flex-col min-h-[400px] justify-center items-center'>
            <div className=' w-80 '>
              <Loader />
              <div className='text-center mt-2'>Getting questionnaires...</div>
            </div>
          </div>
          : null
      }

      {
        data ?
          <div className='mt-4'>
            <div className='flex flex-col mt-6'>
              {/* <div className=' text-2xl mb-4 '>{title}</div> */}
              <div className='grid grid-cols-4 gap-4'>{
                data.question_set.map((q) => {
                  return (
                    <Link to={q.id}>
                      <div className='  flex-1 rounded-lg shadow-md '>
                        <div className=' flex flex-row justify-center items-center h-28 gradient-background rounded-md text-white '>
                          <div className='flex flex-row justify-center items-center w-24 h-24 bg-white rounded-full bg-opacity-10 '>
                            <Book solid={false} />
                          </div>
                        </div>
                        <div className='p-4'>
                          <div className='text-lg'>{q.title}</div>
                          <div className='flex flex-col mt-2'>
                            <div>Part of:</div>
                            {
                              q.questionnaires && q.questionnaires.map((qn) => {
                                return (
                                  <div className='text-sm text-primary-grey'>
                                    {qn?.questionnaire_id?.title}
                                  </div>
                                )
                              })
                            }
                          </div>
                          <div className=' flex flex-row justify-end gap-2 px-4 mt-4 '>
                            <Link to={`${q.id}`}>
                              <div className='flex flex-col justify-center items-center border-2 border-primary-grey rounded-full h-10 w-10 text-primary-grey hover:border-primary-green hover:text-primary-green'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
                })
              }</div>
            </div>
          </div> : null
      }
    </div>
  )
}
