import { Link, Outlet, useLocation, useMatch } from '@tanstack/react-location'
import { LocationGenerics } from '../../Router/CustomRouter'
import { useGetAnswerSetAnswersForUserQuery, useGetQuestionnaireAnswerSetSQuery, useGetQuestionnaireByIdQuery } from '../../generated/graphql'
import { Loader } from '../../Common/Loader'
import { format } from 'date-fns'
import { AddiIcon } from '../../Common/icons/AddiIcon'

const dataSource = {
  endpoint: import.meta.env.VITE_GRAPHQL_URL,
  fetchParams: {
    headers: {
      // 'Authorization': `Bearer ${auth.user?.token}`,
      'X-Hasura-Admin-Secret': import.meta.env.VITE_GRAPHQL_HEADER
    }
  }
}

export const QuestionSetWrapper = () => {

  const location = useLocation()

  const { params: { userId, questionSetId } } = useMatch<LocationGenerics>()

  const { data, isLoading } = useGetAnswerSetAnswersForUserQuery(dataSource, {
    owner_id: userId,
    question_set_id: questionSetId,
    question_set_id_ID: questionSetId
  })

  if (isLoading) {
    return (
      <div className='flex flex-col min-h-[400px] justify-center items-center'>
        <div className=' w-80 '>
          <Loader />
          <div className='text-center mt-2'>Getting question set...</div>
        </div>
      </div>
    )
  }


  // if (isLoading || answerGroupsLoading) {
  //   return (
  //     <div className='flex flex-col min-h-[400px] justify-center items-center'>
  //       <div className=' w-80 '>
  //         <Loader />
  //         <div className='text-center mt-2'>Getting questionnaire...</div>
  //       </div>
  //     </div>
  //   )
  // }

  return (
    <div className='flex flex-row h-full mt-16'>
      <div className='flex flex-col max-w-xs w-full mt-2 h-full'>
        <div className='text-xl px-2 py-2 '>
          <Link to={`/${userId}/questionnaires/questionsets/${questionSetId}`} className='flex flex-row items-center '>
            <div className='p-1 bg-primary-red shadow-md text-white rounded-full'>
              <AddiIcon />
            </div>
            <span className='pl-3'>New Entry</span>
          </Link>
        </div>
        <div className='h-4'></div>
        <div className='text-xl px-2 py-2 bg-desaturated-grey border-b-[1px] border-primary-grey'>
          <div>Answers</div>
        </div>
        {
          data?.answer_set.map((answerGroupItem) => {
            return (
              <Link to={answerGroupItem.id} activeOptions={{ exact: answerGroupItem.id === "." }} >
                {
                  ({ isActive }) => (

                    <div className={`flex flex-row justify-between items-center py-2 border-b-[1px] border-desaturated-grey ${isActive ? " bg-desaturated-grey " : ""}`}>
                      <div className='px-3'>{format(new Date(answerGroupItem.date_created), 'dd MMM yyyy  kk:mm')}</div>
                      <div className='pr-3'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                      </div>
                    </div>
                  )
                }
              </Link>
            )
          })
        }

      </div>
      <div className='flex flex-col mt-2 p-12 w-full'>
        {
          data ?
            <div className='flex flex-col justify-between h-44 gradient-background items-start p-4'>
              <div className='flex flex-row'>
                <button type="button" onClick={() => location.history.back()} className='bg-white px-5 py-1 rounded-md '>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 fill-primary-green">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
                  </svg>
                </button>
              </div>
              <div className='flex-row'>
                <div className='text-4xl text-white'>{data.question_set_by_id?.title}</div>
                {/* <p className='text-white text-lg'>Question sets are a subset of questionnaires and can be completed without the context of a questionnaire</p> */}
              </div>
            </div> : null
        }
        <Outlet />
      </div>
    </div>

  )
}
