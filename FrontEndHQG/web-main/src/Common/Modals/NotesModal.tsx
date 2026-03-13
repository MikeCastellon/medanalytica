import React, { ReactNode, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog';
import { useDescriptionModal } from '../../Hooks/DescriptionModal';
import { LocationGenerics } from '../../Router/CustomRouter';
import { useMatch } from '@tanstack/react-location';
import { serializeToHTML, serializeToPlainText, SlateNoteEditor } from '../../Editor/SlateNoteEditor';
import { Descendant } from 'slate';
import { useDelete_Note_By_PkMutation, useGetNotesForRecordingQuery, useInsertOneNoteForRecordingMutation, useUpdateNoteByPkMutation } from '../../generated/graphql';
import { format } from 'date-fns';

const dataSource = {
  endpoint: import.meta.env.VITE_GRAPHQL_URL,
  fetchParams: {
    headers: {
      // 'Authorization': `Bearer ${auth.user?.token}`,
      'X-Hasura-Admin-Secret': import.meta.env.VITE_GRAPHQL_HEADER
    }
  }
}

export const NotesModal = () => {
  const [editorValue, setEditorValue] = useState([])
  const [isOpen, setClosed] = useState<boolean>(false)
  const { params: { userId, subjectId, recordingId }, data: {
    // subject,
    // currentRecording
  } } = useMatch<LocationGenerics>()

  const recordingNotes = useGetNotesForRecordingQuery(dataSource, {
    heart_data_id: recordingId
  })

  const insertNote = useInsertOneNoteForRecordingMutation(dataSource, {
    onSuccess: () => {
      console.log("Successfully saved note");
      recordingNotes.refetch()
      setEditorValue([])
    }
  })

  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Trigger className='flex flex-wrap items-stretch  gap-1 py-2 px-2' onClick={() => setClosed(true)}>
        <button
          className={`block text-center pt-2 pb-1 px-2  hover:bg-light-grey rounded-md leading-4 whitespace-pre-line font-light`}
        >
          <div className='flex justify-center mb-1'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          Notes
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          onClick={() => setClosed(false)}
          className='fixed top-0 bottom-0 bg-gray-600 bg-opacity-50  h-full w-full z-20'
        >
          <div onClick={(e) => e.stopPropagation()} className={`h-full flex flex-col w-1/3  min-h-40 bg-white shadow-md  fixed right-0 top-0 p-3 z-50`}>
            <div className='text-charcoal text-lg border-desaturated-grey border-b-[1px] mb-3 uppercase' >
              Recording Notes
            </div>
            <div className=' z-50 '>
              <SlateNoteEditor updateValue={setEditorValue} />
              <div className='flex flex-row justify-end gap-2 mt-2 px-2'>
                <button
                  onClick={() => insertNote.mutate({
                    heart_data_id: recordingId,
                    author_id: userId,
                    note: editorValue,
                    text: serializeToPlainText(editorValue)
                  })}
                  className='flex flex-row items-center text-xs text-primary-green'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                  Done
                </button>
              </div>
            </div>
            <div className='flex flex-col mt-7 gap-4'>

              {recordingNotes.data && recordingNotes.data.note.map((n: any) => {
                return <DisplayNote key={n.id} note={n} onDeleteDone={() => recordingNotes.refetch()} onUpdateDone={() => recordingNotes.refetch()} />
              })}

            </div>
          </div>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

type DisplayNoteProps = {
  onDeleteDone?: () => void
  onUpdateDone?: () => void
  note: any
}

const DisplayNote = ({ note, onDeleteDone, onUpdateDone }: DisplayNoteProps) => {

  const [editNote, setEditNote] = useState(note.note)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)

  const deleteNote = useDelete_Note_By_PkMutation(dataSource, {
    onSuccess: () => {
      console.log("Successfully deleted note");
      onDeleteDone && onDeleteDone()
    }
  })

  const updateNote = useUpdateNoteByPkMutation(dataSource, {
    onSuccess: () => {
      console.log("Successfully updated note");
      onUpdateDone && onUpdateDone()
    }
  })

  return (
    <div className=' flex flex-col p-2 rounded-sm shadow-md gap-4'>
      {!isEditing && !isDeleting &&
        <>
          <div>
            {editNote.map((nd: any) => {
              return serializeToHTML(nd)
            })}
          </div>
          <div className='flex flex-row justify-between border-t-[1px] border-desaturated-grey border-opacity-50 pt-2'>
            <div className='text-xs text-primary-grey'>{format(new Date(note.created_at), 'dd MMM yyyy  kk:mm')}</div>
            <div className='flex flex-row gap-2'>
              <button onClick={() => setIsEditing(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
              </button>
              <button
                onClick={() => setIsDeleting(true)}
                className='text-primary-red'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </button>
            </div>
          </div>
        </>}

      {isEditing && !isDeleting &&
        <div>
          <SlateNoteEditor updateValue={setEditNote} insertValue={editNote} />
          <div className='flex flex-row justify-between pt-2'>
            <div className='text-xs text-primary-grey'>{format(new Date(note.created_at), 'dd MMM yyyy  kk:mm')}</div>
            <div className='flex flex-row gap-2'>
              <button className='text-charcoal text-xs' onClick={() => {
                setIsEditing(false)
                setEditNote(note.note)
              }}>
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsEditing(false)
                  updateNote.mutate({
                    id: note.id,
                    note: editNote,
                    text: serializeToPlainText(editNote)
                  })
                }}
                className='flex flex-row items-center text-xs text-primary-green'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
                Save
              </button>
            </div>
          </div>
        </div>}

      {isDeleting &&
        <div >
          <div className='text-primary-red'>
            This will permenently delete the note, are you sure you want to delete?
          </div>
          <div className='flex flex-row justify-end gap-2'>
            <button className='text-charcoal text-xs' onClick={() => setIsDeleting(false)}>
              Don't Delete
            </button>
            <button
              onClick={() => {
                deleteNote.mutate({
                  id: note.id
                })
              }}
              className='flex flex-row items-center text-xs text-primary-red border-[1px] border-primary-red px-1 rounded-sm'>
              Delete
            </button>
          </div>

        </div>
      }

    </div>
  )
}