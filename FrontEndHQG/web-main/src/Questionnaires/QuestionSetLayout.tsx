import { useLocation, useMatch } from '@tanstack/react-location'
import { Field, FieldArray, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Loader } from '../Common/Loader'
import { useCreateAnswersMutation, useGetAnswerSetAnswersForUserQuery, useGetQuestionSetByIdQuery } from '../generated/graphql'
import { LocationGenerics } from '../Router/CustomRouter'
import * as Yup from 'yup';
import { number } from 'yup/lib/locale'
import { da } from 'date-fns/locale'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
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

export type answer = {
  question: {
    id: string
  },
  option: {
    id: string
  }
  value: number
}

export const QuestionSetLayout = () => {
  const location = useLocation()
  const [answers, setAnswers] = useState<(answer | null)[]>([])
  const { params: { subjectId, questionSetId } } = useMatch<LocationGenerics>()

  const { data, isLoading } = useGetQuestionSetByIdQuery(dataSource, {
    id: questionSetId
  })

  const { data: pastAnswers } = useGetAnswerSetAnswersForUserQuery(dataSource, {
    owner_id: subjectId,
    question_set_id: questionSetId,
    question_set_id_ID: questionSetId,
  })

  const { mutate, isLoading: insertLoading, } = useCreateAnswersMutation(dataSource, {
    onSuccess: () => {
      if (data && data.question_set_by_id && data.question_set_by_id.questions) {
        setAnswers(data.question_set_by_id?.questions?.map(() => null))
      }
    }
  })

  const previousSubmissionsTotal = pastAnswers?.answer_set.map((pa) => {
    return {
      score: pa.answers ?
        pa.answers.reduce((prev, curr, arr) => {
          const currentValue = (curr && curr.option && curr.option.value) ? curr?.option?.value : 0
          return curr ? prev + currentValue : prev
        }, 0)
        : 0,
      date: pa.date_created
    }
  })

  useEffect(() => {
    if (data && data.question_set_by_id && data.question_set_by_id.questions) {
      setAnswers(data.question_set_by_id?.questions?.map(() => null))
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

  const currentTotal = answers.reduce((prev, curr, arr) => {
    return curr ? prev + curr.value : prev
  }, 0)

  const isComplete = !answers.includes(null)
  const questionsAnswered = answers.filter((v) => v !== null).length

  const updateAnswerSelected = (i: number, qid: string, opt: any) => {

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
    setAnswers(newAnswers)
  }

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
              <div className='text-4xl text-white'>{data.question_set_by_id?.title}</div>
              {/* <p className='text-white text-lg'>Question sets are a subset of questionnaires and can be completed without the context of a questionnaire</p> */}
            </div>
          </div> : null
      }
      <TrendAnswerSets owner_id={subjectId} question_set_id={questionSetId} />

      <div className='flex flex-col items-center'>
        {
          data ?
            <div className='flex flex-1 flex-col w-5/6'>
              <div className=' bg-gray-100 rounded-md mt-8 px-4 py-2'>
                <h2>DETAIL:</h2>
                <div
                  className=' text-lg text-primary-grey pb-4 '
                  dangerouslySetInnerHTML={{ __html: data.question_set_by_id?.instructions || "" }}></div>
              </div>

              <div className='flex flex-col mt-4 '>
                {
                  data.question_set_by_id?.questions &&
                  data?.question_set_by_id?.questions.map((qs, i) => {
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
                                    updateAnswerSelected(i, qs.id, opt)
                                  }}
                                  active={opt?.id === answers[i]?.option.id}
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
              <div className='flex flex-row justify-end mt-2'>
                {insertLoading ? <Loader /> : null}
                <button
                  type="button"
                  disabled={!isComplete || isLoading}
                  className={`px-2 rounded-md border-2 border-primary-green ${isComplete ? "text-primary-green" : "text-white"} hover:bg-primary-green hover:text-white disabled:bg-primary-grey  disabled:border-primary-grey`}
                  onClick={() => {
                    const cleanAnswers = answers.map((a) => {
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
                    mutate({
                      owner_id: subjectId,
                      question_set: questionSetId,
                      answers: cleanAnswers
                    })
                  }}
                >SUBMIT</button>
              </div>
            </div>
            : null
        }
      </div>

    </div>
  )
}
