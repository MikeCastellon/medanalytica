import { Link, useLocation, useMatch } from '@tanstack/react-location'
import _ from 'lodash'
import { useGetAnswerGroupByIdQuery, useGetQuestionnaireConclusionsQuery } from '../../generated/graphql'
import { LocationGenerics } from '../../Router/CustomRouter'
import { Loader } from '../../Common/Loader'


const dataSource = {
  endpoint: import.meta.env.VITE_GRAPHQL_URL,
  fetchParams: {
    headers: {
      // 'Authorization': `Bearer ${auth.user?.token}`,
      'X-Hasura-Admin-Secret': import.meta.env.VITE_GRAPHQL_HEADER
    }
  }
}

export const UserAnswerGroupDisplay = () => {
  const location = useLocation()
  const { params: { userId, subjectId, questionSetId, questionnaireId, answerGroupId } } = useMatch<LocationGenerics>()

  const { data, isLoading } = useGetAnswerGroupByIdQuery(dataSource, {
    id: answerGroupId
  })

  const { data: conclusions, isLoading: conclusionIsLoading } = useGetQuestionnaireConclusionsQuery(dataSource, {
    questionnaire_eq: questionnaireId
  })


  if (isLoading && conclusionIsLoading) {
    return (
      <div className='flex flex-col min-h-[400px] justify-center items-center'>
        <div className=' w-80 '>
          <Loader />
          <div className='text-center mt-2'>Getting answer data...</div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className='flex flex-row flex-wrap gap-2 mt-8 max-w-5xl'>
        {
          data ?
            data.answer_group_by_id?.answer_sets?.map((answerSet) => {
              return (
                <Link key={answerSet?.id} to={`/${userId}/questionnaires/questionsets/${answerSet?.question_set?.id}/${answerSet?.id}`}>
                  <div className=' p-2 w-60 flex flex-col shadow-lg rounded-md'>
                    <div className='pb-4 mt-2 mb-4 px-2 text-xl text-primary-grey border-b-[1px] border-desaturated-grey'>{answerSet?.question_set?.title}</div>
                    <div className='flex flex-col justify-center items-center'>
                      <div className='flex flex-col justify-center items-center w-16 h-16 bg-desaturated-blue rounded-full '>
                        <div className='text-2xl text-primary-blue text-center '>{
                          answerSet?.answers?.reduce((prev, curr, arr) => {
                            return curr?.option?.value ? prev + curr?.option?.value : prev
                          }, 0)
                        }</div>
                      </div>
                      <div className='my-2 text-lg'>
                        Total Score
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })
            : null
        }

      </div>

    </>
  )
}
