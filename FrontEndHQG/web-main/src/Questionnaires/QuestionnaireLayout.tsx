import { useLocation, useMatch, useMatchRoute, useRouter } from '@tanstack/react-location'
import { useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { Loader } from '../Common/Loader'
import { Create_Answer_Set_Input, InputMaybe, useCreateAnswerGroupMutation, useGetQuestionnaireByIdQuery } from '../generated/graphql'
import { LocationGenerics } from '../Router/CustomRouter'
import { answer } from './QuestionSetLayout'
import { QuestionSetOption } from './QuestionSetOption'
import { TrendAnswerSets } from './TrendAnswerSets'

const dataSource = {
  endpoint: import.meta.env.VITE_GRAPHQL_URL,
  fetchParams: {
    headers: {
      // 'Authorization': `Bearer ${auth.user?.token}`,
      'X-Hasura-Admin-Secret': import.meta.env.VITE_GRAPHQL_HEADER
    }
  }
}

export const QuestionnaireLayout = () => {
  const location = useLocation()

  const router = useRouter<LocationGenerics>()
  const { params: { subjectId, questionnaireId } } = useMatch<LocationGenerics>()

  const [currentQuestionSet, setCurrentQuestionSet] = useState<number>(0)

  const [answersArray, setAnswersArray] = useState<((answer | null)[] | null)[]>([])

  const { data, isLoading } = useGetQuestionnaireByIdQuery(dataSource, {
    id: questionnaireId
  })

  const { mutate, isLoading: answerGroupLoading } = useCreateAnswerGroupMutation(dataSource, {
    onError: (err) => {
      console.log("Answer Group Insert Error");
      console.log(err);
    },
    onSuccess: () => {
      console.log("Submission Successful");
      location.history.back()
    }
  })

  useEffect(() => {

    if (data && data.questionnaire_by_id?.question_sets?.length) {
      setAnswersArray(data.questionnaire_by_id.question_sets.map((qset) => {
        return qset?.question_set_id?.questions ? qset?.question_set_id?.questions?.map(() => null) : null
      }))
    }

  }, [data])

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

  const updateAnswerArrayWithOption = (i: number, qid: string, opt: any, answers: (answer | null)[]) => {

    const newAnswers = [...answers]
    newAnswers[i] = opt?.id === answers[i]?.option.id ? null : {
      question: {
        id: qid
      },
      option: {
        id: opt?.id ?? ""
      },
      value: opt?.value || 0
    }
    return newAnswers
  }

  const checkAnswersCompleted = (answersArray: ((answer | null)[] | null)[], index: number) => {
    const currentAnswers = answersArray?.[index]
    const currentAnswersCompleted = currentAnswers ? !currentAnswers.includes(null) : false
    return currentAnswersCompleted
  }

  const currentAnswers = answersArray?.[currentQuestionSet]
  const currentAnswersCompleted = currentAnswers ? !currentAnswers.includes(null) : false

  const currentTotal = currentAnswers && currentAnswers.reduce((prev, curr, arr) => {
    return curr ? prev + curr.value : prev
  }, 0)


  const questionSets = data?.questionnaire_by_id?.question_sets
  const questionSet = questionSets?.[currentQuestionSet]


  return (
    <div className='ml-[380px] p-8'>
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
              <div className='text-4xl text-white'>{data.questionnaire_by_id?.title}</div>
              <div className='text-2xl text-white'>{data?.questionnaire_by_id?.question_sets ? data?.questionnaire_by_id?.question_sets[currentQuestionSet]?.question_set_id?.title : ""}</div>
              <p className='text-white text-lg'>This questionnaire is composed of multiple question sets. All question sets need to be completed to submit the full questionnaire</p>
            </div>
          </div> : null
      }


      {
        answersArray.length > 0 ?
          <div className='flex flex-row justify-center gap-3 mt-6'>
            {
              answersArray.map((aa, i) => {
                return (
                  < BubbleWithChecked checked={checkAnswersCompleted(answersArray, i)} text={"Q: " + (i + 1)} />
                )
              })
            }
          </div>
          : null

      }

      {
        questionSet?.question_set_id?.id ?
          <TrendAnswerSets owner_id={subjectId} question_set_id={questionSet?.question_set_id?.id} />
          : null
      }


      <div className='flex flex-col items-center'>
        {
          data && data.questionnaire_by_id?.question_sets ?
            <div className='flex flex-1 flex-col w-5/6'>
              <div className=' bg-gray-100 rounded-md mt-8 px-4 py-2'>
                <h2>DETAIL:</h2>
                <div
                  className=' text-lg text-primary-grey pb-4 '
                  dangerouslySetInnerHTML={{ __html: data.questionnaire_by_id?.question_sets[currentQuestionSet]?.question_set_id?.instructions || "" }}></div>
              </div>

              <div className='flex flex-col mt-4 '>
                {
                  questionSet?.question_set_id?.questions &&
                  questionSet?.question_set_id?.questions.map((qs, i) => {
                    return (
                      <div key={i} className='mt-12 border-b-[1px] border-secondary-grey pb-6'>
                        <div className='text-2xl text-primary-grey'>
                          {i + 1}. {qs?.question}
                        </div>
                        <div
                          className='text-sm text-primary-grey pb-4 mt-2'
                          dangerouslySetInnerHTML={{ __html: qs?.instructions || "" }}></div>
                        <div className='flex flex-row gap-6 ml-8'>
                          {
                            qs?.option_group?.options &&
                            qs?.option_group?.options.map((opt) => {
                              return (
                                <QuestionSetOption
                                  onClick={() => {
                                    const newAnswers = [...answersArray]

                                    newAnswers[currentQuestionSet] = updateAnswerArrayWithOption(i, qs.id, opt, answersArray[currentQuestionSet] ?? [])
                                    setAnswersArray(newAnswers)
                                  }}
                                  active={opt?.id === answersArray[currentQuestionSet]?.[i]?.option.id}
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

              <div className='flex flex-row justify-end mt-4'>
                <div className='text-sm text-primary-grey'>TOTAL SCORE: {currentTotal}</div>
              </div>

              <div className='flex flex-row justify-between mt-2'>
                {
                  questionSets?.length &&
                    currentQuestionSet > 0 ?
                    <button
                      type="button"
                      // disabled={!currentAnswersCompleted}
                      className={`px-2 rounded-md border-2 border-primary-green text-primary-green hover:bg-primary-green hover:text-white disabled:bg-primary-grey  disabled:border-primary-grey`}
                      onClick={() => {
                        const nextQuestionSetIdx = currentQuestionSet - 1
                        setCurrentQuestionSet(nextQuestionSetIdx)
                        window.scrollTo(0, 0)
                      }}
                    >Back</button>
                    : <div></div>
                }
                {
                  questionSets?.length &&
                    currentQuestionSet < questionSets?.length - 1 ?
                    <button
                      type="button"
                      disabled={!currentAnswersCompleted || answerGroupLoading}
                      className={`px-2 rounded-md border-2 border-primary-green ${currentAnswersCompleted ? "text-primary-green" : "text-white"} hover:bg-primary-green hover:text-white disabled:bg-primary-grey  disabled:border-primary-grey`}
                      onClick={() => {
                        const nextQuestionSetIdx = currentQuestionSet + 1
                        setCurrentQuestionSet(nextQuestionSetIdx)
                        window.scrollTo(0, 0)
                      }}
                    >Next</button>
                    :
                    <button
                      type="button"
                      disabled={!currentAnswersCompleted || answerGroupLoading}
                      className={`px-2 rounded-md border-2 border-primary-green ${currentAnswersCompleted ? "text-primary-green" : "text-white"} hover:bg-primary-green hover:text-white disabled:bg-primary-grey  disabled:border-primary-grey`}
                      onClick={() => {
                        console.log("SUBMIT THIS QUESTIONNAIRE");

                        const constructAnswersSets = answersArray.map((ansSet, i) => {
                          const cleanAnswers = ansSet?.map((a) => {
                            const newA = {
                              question: {
                                id: a?.question.id
                              },
                              option: {
                                id: a?.option.id
                              }
                            }
                            return newA
                          })
                          return {
                            owner_id: subjectId,
                            question_set: {
                              id: questionSets?.[i]?.question_set_id?.id
                            },
                            answers: cleanAnswers
                          }
                        })

                        console.log(constructAnswersSets);


                        mutate({
                          owner_id: subjectId,
                          questionnaireId: questionnaireId,
                          answerSets: constructAnswersSets
                        })

                      }}
                    >Submit</button>
                }

              </div>

            </div>
            : null
        }
      </div>
    </div>
  )
}

type BubbleWithChecked = {
  checked: boolean
  text?: string
}

const BubbleWithChecked = ({ checked, text }: BubbleWithChecked) => {
  return (
    <div className={` flex flex-col justify-center items-center  `}>
      <div className={` w-14 h-14 flex flex-col justify-center items-center rounded-full border-2 ${checked ? "border-primary-green" : "border-primary-grey"} `}>
        {
          checked ?
            <div className='w-12 h-12 flex flex-col justify-center items-center rounded-full bg-primary-green text-white'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            :
            <div className='w-12 h-12 flex flex-col justify-center items-center rounded-full bg-primary-grey text-white'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
            </div>
        }
      </div>
      <div>{text}</div>
    </div>
  )
}