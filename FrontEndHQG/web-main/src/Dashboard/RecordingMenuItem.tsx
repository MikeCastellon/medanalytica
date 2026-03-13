import { Link, useLocation, useMatch, useRouter } from '@tanstack/react-location'
import { format } from 'date-fns'
import { Ecg_Files, Exact, GetAllHeartDataForOwnerQuery, Heart_Data, Maybe, Rr_Files, useDeleteRecordingMutation, useUpdateRecordingByPkMutation } from '../generated/graphql'
import { useRecordingPopOver } from '../Hooks/RecordingPopOver'
import { LocationGenerics } from '../Router/CustomRouter'
import { TRecording } from './RecordingTypes'

import * as Popover from '@radix-ui/react-popover';
import { useEffect, useState } from 'react'
import { Field, Form, Formik } from 'formik'
import * as Switch from '@radix-ui/react-switch';
import * as Yup from 'yup';
import { useAuth } from '../Hooks/AuthContext'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { Subject } from 'rxjs'
import { CheckIcon } from '../Common/icons/CheckIcon'
import { MoreDotsIcon } from '../Common/icons/MoreDotsIcon'


const RecordingEditSchema = Yup.object().shape({
  id: Yup.string().required(),
  title: Yup.string().max(50).required('Title is required'),
  trend_recording: Yup.boolean(),
})

const dataSource = {
  endpoint: import.meta.env.VITE_GRAPHQL_URL,
  fetchParams: {
    headers: {
      // 'Authorization': `Bearer ${auth.user?.token}`,
      'X-Hasura-Admin-Secret': import.meta.env.VITE_GRAPHQL_HEADER
    }
  }
}

export const RecordingMenuItem = ({ recording: { id, title, created_on, data, ecg_file, rr_file, trend_recording } }: { recording: TRecording }) => {
  const router = useRouter<LocationGenerics>()
  const location = useLocation()
  const currentPage = location.current.pathname.split("/")[7]

  const queryClient = useQueryClient()

  const { data: { schemaVersion } } = useMatch<LocationGenerics>()
  // const { setOpen } = useRecordingPopOver()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const [willRecalculate, setWillReclculate] = useState<boolean>(false)
  const { mutate } = useUpdateRecordingByPkMutation(dataSource, {
    onSuccess: () => {
      setIsOpen(false)
      router.cleanMatchCache()
      queryClient.refetchQueries(['GetAllHeartDataForOwner'])
    },
    onError: (e) => {
      console.log("MyError", e);
    }
  })

  const deleteRecording = useDeleteRecordingMutation(dataSource)

  const recalculateRecording = useMutation(['recalculate'], () => {
    return axios({
      method: "post",
      url: `${import.meta.env.VITE_API_URL}/v1/files/ecg/reprocess/${id}`,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
    })
  }, {
    onSuccess: () => {
      setIsOpen(false)
    }
  })

  useEffect(() => {

  }, [title])


  return (
    <Link
      to={`single/${id}${currentPage ? '/' + currentPage : ''}`}
      activeOptions={{ exact: id === "." }} >

      {({ isActive }) => (
        <div className={`${isActive ? "bg-light-grey bg-opacity-5" : ""} group flex flex-row h-14 px-2 pt-1 border-charcoal border-b-[1px]  hover:bg-desaturated-grey hover:bg-opacity-0 text-charcoal hover:text-black cursor-pointer hover:border-l-4  hover:border-black`}>
          <div className='flex flex-col w-full  '>
            <div className='text-lg h-6 overflow-hidden text-ellipse'>{title}</div>
            <div className=' text-xs text-primary-grey '>
              {format(new Date(created_on), 'dd MMM yyyy  kk:mm')}
            </div>
          </div>
          {
            data?.schema_version === schemaVersion ?
              <div className='w-6 flex flex-col justify-center items-center text-primary-green '>
                <CheckIcon className='h-4 w-4' />
              </div> : null
          }
          <div className={`${isActive ? "flex" : "hidden"} group-hover:flex w-6 flex-col justify-center items-center mx-1 text-xs `}>
            v{data?.schema_version}
          </div>
          <Popover.Root open={isOpen}>

            <div
              className='w-6 flex flex-col justify-center items-center hover:bg-light-grey rounded-md mb-1 '
              onClick={(e) => {
                e.preventDefault()
                console.log("Show Recording modal");
                setIsOpen(true)
              }}
            >
              <Popover.Anchor className='' asChild >
                {/* <MoreDotsIcon /> */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 stroke-primary-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </Popover.Anchor>
            </div>
            <Popover.Portal>
              <Popover.Content
                side="right"
                sideOffset={10}
                className='flex flex-col w-80 bg-white shadow-lg rounded-lg border-charcoal border-[1px] p-2'
                onClick={(e) => {
                  e.preventDefault()
                }}
              >
                <div className='flex flex-row justify-end'>
                  <button
                    onClick={() => setIsOpen(false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>

                {!isDeleting && !willRecalculate ?
                  <Formik
                    initialValues={{
                      id: id,
                      title: title,
                      trend_recording: trend_recording
                    }}
                    validationSchema={RecordingEditSchema}
                    onSubmit={(values) => {
                      mutate({
                        id: values.id,
                        title: values.title,
                        trend_recording: values.trend_recording
                      })
                    }}
                  >
                    {({ errors, touched, values, setFieldValue, submitForm }) => (
                      <Form>
                        <label htmlFor="Title" className='text-sm'>Title:</label>
                        <Field name="title" className='border-charcoal border-[1px] rounded-md px-2 w-full' />
                        {errors.title && touched.title ? (
                          <div className='text-red-600'>{errors.title}</div>
                        ) : null}
                        <div className='flex flex-row space-x-2 mt-2 '>
                          <label htmlFor="Title" className='text-sm'>Trending:</label>
                          <Switch.Root
                            onClick={() => {
                              setFieldValue('trend_recording', !values.trend_recording)
                            }}
                            className={`w-9 h-5  rounded-full border-desaturated-grey border-2 ${values.trend_recording ? 'bg-primary-green' : ''} `}
                          >
                            <Switch.SwitchThumb
                              defaultChecked={trend_recording}
                              className={`h-4 w-4 border-charcoal block rounded-full ${values.trend_recording ? 'translate-x-4 bg-white' : 'bg-charcoal'} transition ease-in-out delay-150`}></Switch.SwitchThumb>
                          </Switch.Root>
                        </div>
                        {errors.trend_recording && touched.trend_recording ? (
                          <div className='text-red-600'>{errors.trend_recording}</div>
                        ) : null}
                        <div className='flex flex-row space-x-2 justify-end'>
                          <button type='button' onClick={() => setIsDeleting(true)} className='text-sm text-primary-red hover:bg-primary-red border-primary-red border-2 rounded-md hover:text-white py-1 px-2  mt-4'>Delete Recording</button>
                          <button type='button' onClick={() => setWillReclculate(true)} className='text-sm text-primary-yellow hover:bg-primary-yellow border-primary-yellow border-2 rounded-md hover:text-white py-1 px-2  mt-4'>Recalculate</button>
                          <button type='submit' onClick={submitForm} className='text-sm text-primary-green hover:bg-primary-green border-primary-green border-2 rounded-md hover:text-white py-1 px-2  mt-4'>Save</button>
                        </div>

                      </Form>
                    )}
                  </Formik>
                  : null}
                {
                  isDeleting ?
                    <div>
                      <p>You are about to <span className='text-primary-red'>DELETE</span> this recording.</p>
                      <p>Are you sure you want to permanently delete recording?</p>
                      <div className='flex flex-row space-x-2 justify-end'>
                        <button type='button' onClick={() => setIsDeleting(false)} className='text-sm text-primary-green hover:bg-primary-green border-primary-green border-2 rounded-md hover:text-white py-1 px-2  mt-4'>No Don't Delete</button>
                        <button type='button' onClick={() => {
                          console.log("Delete this recording", id);
                          deleteRecording.mutate({
                            id: id
                          }, {
                            onSuccess: () => {
                              console.log("Successfully deleted recording");
                              setIsDeleting(false)
                              setIsOpen(false)
                            },
                            onError: () => {
                              console.log("Could not delete recording");

                            }
                          })
                        }} className='text-sm text-primary-red hover:bg-primary-red border-primary-red border-2 rounded-md hover:text-white py-1 px-2  mt-4'>Yes, delete</button>
                      </div>
                    </div>
                    : null
                }
                {
                  willRecalculate ?
                    <div>
                      {
                        recalculateRecording.isLoading ?
                          <div className='flex flex-col justify-center items-center mt-4'>
                            <svg aria-hidden="true" className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-charcoal" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                            <p>Please wait while the recording recalculates...</p>
                            <span className="sr-only">Loading...</span>
                          </div> : null
                      }
                      {
                        recalculateRecording.isError ?
                          <div>
                            <p className='text-center'>
                              Sorry, could not recalculate recording at this moment. Please try again later.
                            </p>
                            <div className='flex flex-row space-x-2 justify-end'>
                              <button type='button' onClick={() => setWillReclculate(false)} className='text-sm text-primary-red hover:bg-primary-red border-primary-red border-2 rounded-md hover:text-white py-1 px-2  mt-4'>Close</button>
                            </div>
                          </div> : null
                      }
                      {
                        !recalculateRecording.isLoading && !recalculateRecording.isError ?
                          <div>
                            <p>You are about to <span className='text-primary-yellow'>RECALCULATE</span> this recording.</p>
                            <p>This will permenantly update the recording with the most current formulas and add the up to date badge
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block stroke-primary-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                              </svg>
                            </p>
                            <div className='flex flex-row space-x-2 justify-end'>
                              <button type='button' onClick={() => recalculateRecording.mutate()} className='text-sm text-primary-green hover:bg-primary-green border-primary-green border-2 rounded-md hover:text-white py-1 px-2  mt-4'>Yes, Recalucalte</button>
                              <button type='button' onClick={() => setWillReclculate(false)} className='text-sm text-primary-red hover:bg-primary-red border-primary-red border-2 rounded-md hover:text-white py-1 px-2  mt-4'>No Don't Recalculate</button>
                            </div>
                          </div> : null
                      }
                    </div>
                    : null
                }
                <Popover.Arrow className='fill-charcoal  ' />
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>

        </div>
      )}
    </Link>
  )
}
