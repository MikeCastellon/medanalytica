import * as Dialog from '@radix-ui/react-dialog';
import { Loader } from '../Loader';
import { useCreateDisclaimerAgreementMutation, useDisclaimerQueryQuery, useUpdateDisclaimerAgreementMutation } from '../../generated/graphql';
import { useMatch } from '@tanstack/react-location';
import { LocationGenerics } from '../../Router/CustomRouter';
import { useAuth } from '../../Hooks/AuthContext';

const dataSource = {
  endpoint: import.meta.env.VITE_GRAPHQL_URL,
  fetchParams: {
    headers: {
      'X-Hasura-Admin-Secret': import.meta.env.VITE_GRAPHQL_HEADER
    }
  }
}

export const DisclaimerModal = () => {
  const auth = useAuth()
  const { params: { userId } } = useMatch<LocationGenerics>()

  const { data, isLoading } = useDisclaimerQueryQuery(dataSource, {
    id: "1",
    disclaimerId: "1",
    userId: userId
  })

  const { mutate, isLoading: agreeLoading } = useUpdateDisclaimerAgreementMutation(dataSource, {
    onSuccess: () => {
      auth.setDisclaimerToAgreed()
    }
  })

  const { mutate: newAgreement, isLoading: newAgreeLoading } = useCreateDisclaimerAgreementMutation(dataSource, {
    onSuccess: () => {
      auth.setDisclaimerToAgreed()
    }
  })

  return (
    <Dialog.Root open={!auth.disclaimerAgreed}>
      <Dialog.Portal>
        <Dialog.Overlay
          className='fixed top-0 bottom-0 bg-gray-600 bg-opacity-50 overflow-auto w-full z-50 flex flex-col justify-center items-center py-24'
        >
          <div className={` flex flex-col w-full md:w-1/2   min-h-40 bg-white shadow-md rounded-lg  overflow-y-auto p-3 z-50`}>
            <div className='text-charcoal text-lg border-desaturated-grey border-b-[1px] mb-3 uppercase' >{data?.Disclaimers_by_id?.Title}</div>
            {isLoading ?
              <Loader /> :
              <div>
                <div className='text-sm text-primary-grey pb-4' dangerouslySetInnerHTML={{ __html: data?.Disclaimers_by_id?.Disclaimer ?? "Sorry could not get te Disclaimer at this moment" }}></div>
                <div className='flex flex-row justify-end gap-2'>
                  <button
                    onClick={auth.logout}
                    type="button"
                    className='border-2 border-primary-red hover:text-white hover:bg-primary-red rounded-md px-2'
                  >Logout</button>
                  <div className=''>OR</div>
                  {
                    agreeLoading ? <Loader /> : null
                  }
                  <button
                    onClick={() => {
                      if (data?.Disclaimer_Acknowledgement[0]) {
                        mutate({
                          disclaimerAgreementId: data?.Disclaimer_Acknowledgement[0].id
                        })
                      } else {
                        newAgreement({
                          disclaimerId: "1",
                          UserId: userId
                        })
                      }
                    }}
                    type="button"
                    disabled={agreeLoading || newAgreeLoading}
                    className='flex flex-row border-2 border-primary-green hover:text-white hover:bg-primary-green rounded-md px-2 disabled:bg-primary-grey'>
                    Agree</button>
                </div>
              </div>
            }
          </div>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
