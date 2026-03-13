import { Link, useLocation, useMatch } from '@tanstack/react-location'
import _ from 'lodash'
import React, { useRef, useState } from 'react'
import ReactToPrint, { useReactToPrint } from 'react-to-print'
import { object } from 'yup'
import { Print } from '../Common/icons/Print'
import { Loader } from '../Common/Loader'
import { GetAnswerGroupByIdQuery, useGetAnswerGroupByIdQuery, useGetQuestionnaireConclusionsQuery } from '../generated/graphql'
import { LocationGenerics } from '../Router/CustomRouter'

const dataSource = {
  endpoint: import.meta.env.VITE_GRAPHQL_URL,
  fetchParams: {
    headers: {
      // 'Authorization': `Bearer ${auth.user?.token}`,
      'X-Hasura-Admin-Secret': import.meta.env.VITE_GRAPHQL_HEADER
    }
  }
}


export const AnswerGroupDisplay = () => {
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

  const buildQuestionnaireMetadata = (data: GetAnswerGroupByIdQuery | undefined) => {
    let metadata: any = {}
    data?.answer_group_by_id?.answer_sets?.map((as, i) => {
      metadata[as?.question_set?.key || i] = {
        total: as?.answers?.reduce((prev, curr, arr) => {
          return curr?.option?.value ? prev + curr?.option?.value : prev
        }, 0)
      }
    })
    return metadata
  }

  return (
    <>
      <div className='flex flex-row flex-wrap gap-2 mt-8'>
        {
          data ?
            data.answer_group_by_id?.answer_sets?.map((answerSet) => {
              return (
                <Link key={answerSet?.id} to={`/${userId}/dashboard/${subjectId}/questionnaires/question-sets/${answerSet?.question_set?.id}/view/${answerSet?.id}`}>
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

      <div className='flex flex-row flex-wrap gap-2 mt-12'>
        <h1>Conclusions:</h1>
      </div>
      <div className='flex flex-row flex-wrap gap-2 mt-4'>
        {
          conclusions ?
            conclusions.questionnaire_conclusion.map((c) => {
              return (
                <ConclusionListItem title={c.title} content={c.content} variables={buildQuestionnaireMetadata(data)} />
              )
            })
            : null
        }
      </div>
    </>
  )
}

type ConclusionListItemProps = {
  title?: string | null,
  content?: string | null,
  variables: any
}


const ConclusionListItem = ({ title, content, variables }: ConclusionListItemProps) => {

  const [open, setOpen] = useState(false)
  const componentRef = useRef(null);

  const contentstriped = content?.replace("&lt;", "<").replace("&gt;", ">")

  const interpolate = (template: string, values: any) => {
    // const a = ((v) => ({ ...v }))(values)
    const a = values
    if (a == a) {
      console.log("Template values is working")
    }
    let result

    try {
      result = eval('`' + template + '`')
    } catch (error) {
      console.log(error)
      result = "Could not calculate"
    }

    return result
  }

  return (
    <div className='flex-1 border-[1px]'>

      <div
        className='flex-1 flex flex-row justify-between text-md px-2 py-1 rounded-sm  '
        onClick={() => {
          setOpen(!open)
        }}
      >
        <div>{title}</div>


        <div className='flex flex-col justify-center'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-4 h-4 ${open ? 'rotate-90' : ''}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </div>
      </div>
      {
        open ?
          <div className='flex border-b-[1px] mx-2'></div>
          :
          null
      }


      <div className={` ${open ? '' : 'h-0 overflow-hidden'}`}>
        <div className='flex flex-row justify-end p-2'>
          <ReactToPrint
            content={() => componentRef.current}
            documentTitle={title || "HeartQuest"}
            removeAfterPrint
            trigger={() => <button><Print /></button>}
          />
        </div>

        <div ref={componentRef} className="">
          {
            content ?
              <div className={`cms-content pb-4 px-2 `} dangerouslySetInnerHTML={{ __html: interpolate(contentstriped || "", variables) || "" }}></div>
              : null
          }
          <style>{getPageMargins()}</style>
        </div>
      </div>
    </div>
  )

}

const getPageMargins = () => {
  return `@media page { margin: ${21} ${21} ${21} ${21} !important; }`;
};