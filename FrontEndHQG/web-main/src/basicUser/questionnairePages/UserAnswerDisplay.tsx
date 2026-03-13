import { useLocation, useMatch } from '@tanstack/react-location'
import React from 'react'
import { LocationGenerics } from '../../Router/CustomRouter'
import { useGetAnswerSetByIdQuery } from '../../generated/graphql'
import { QuestionSetOption } from '../../Questionnaires/QuestionSetOption'

const dataSource = {
  endpoint: import.meta.env.VITE_GRAPHQL_URL,
  fetchParams: {
    headers: {
      // 'Authorization': `Bearer ${auth.user?.token}`,
      'X-Hasura-Admin-Secret': import.meta.env.VITE_GRAPHQL_HEADER
    }
  }
}

export const UserAnswerDisplay = () => {

  const { params: { answerSetId } } = useMatch<LocationGenerics>()

  const { data } = useGetAnswerSetByIdQuery(dataSource, {
    id: answerSetId
  })

  const currentTotal = data?.answer_set_by_id?.answers?.reduce((prev, curr, arr) => {
    const current = curr?.option?.value || 0
    return curr ? prev + current : prev
  }, 0)

  return (
    <div className='flex flex-col items-center'>

      <div className='flex flex-row justify-end mt-4'>
        <div className='text-sm text-primary-grey'>TOTAL SCORE: {currentTotal}</div>
      </div>
      {
        data ?
          <div className='flex flex-1 flex-col w-5/6'>
            <div className=' bg-gray-100 rounded-md mt-8 px-4 py-2'>
              <h2>DETAIL:</h2>
              <div
                className=' text-lg text-primary-grey pb-4 '
                dangerouslySetInnerHTML={{ __html: data.answer_set_by_id?.question_set?.instructions || "" }}></div>
            </div>

            <div className='flex flex-col mt-4 '>
              {
                data.answer_set_by_id?.answers &&
                data.answer_set_by_id?.answers.map((as, i) => {
                  return (
                    <div key={i} className='mt-12 border-b-[1px] border-secondary-grey pb-6'>
                      <div className='text-2xl text-primary-grey'>
                        {i + 1}. {as?.question?.question}
                      </div>
                      <div
                        className='text-sm text-primary-grey pb-4 mt-2'
                        dangerouslySetInnerHTML={{ __html: as?.question?.instructions || "" }}></div>
                      <div className='flex flex-row gap-6 ml-8'>
                        {
                          as?.question?.option_group?.options &&
                          as?.question?.option_group?.options.map((opt) => {
                            return (
                              <QuestionSetOption
                                active={opt?.id === as.option?.id}
                                option={opt} />
                            )
                          })
                        }
                      </div>

                    </div>
                  )
                })
              }

            </div>



          </div>
          : null
      }
    </div>
  )
}
