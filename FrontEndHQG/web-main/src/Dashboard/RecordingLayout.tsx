import { Navigate, Outlet, useMatch } from "@tanstack/react-location";
import { useEffect, useState } from "react";
import { NotesModal } from "../Common/Modals/NotesModal";
import { useGetValuesParametersQuery } from "../generated/graphql";
import { SummaryProvider } from "../Hooks/SummaryContext";
import { useUserContext } from "../Hooks/UserContext";
import { LocationGenerics } from "../Router/CustomRouter";
import { summariseRecording, restructureValuesMetadata, buildReport } from "../utils/summariseRecording";
import { MenuMain } from "./MenuMain";
import { MenuTopWrapper } from "./MenuTopWrapper";


const dataSource = {
  endpoint: import.meta.env.VITE_GRAPHQL_URL,
  fetchParams: {
    headers: {
      // 'Authorization': `Bearer ${auth.user?.token}`,
      'X-Hasura-Admin-Secret': import.meta.env.VITE_GRAPHQL_HEADER
    }
  }
}


export const RecordingLayout = () => {
  const [rrWarning, setrrWarning] = useState(false)
  const { error } = useMatch<LocationGenerics>()
  const { currentRecording } = useUserContext()



  useEffect(() => {
    if (currentRecording?.rr_metadata?.total_rejected && (currentRecording?.rr_metadata?.total_rejected / currentRecording?.rr_metadata?.total_rr) > 0.15) {
      setrrWarning(true)
    } else {
      setrrWarning(false)
    }
  }, [currentRecording])



  if (error) {
    return <Navigate to="/login" />
  }

  return (
    <>
      {/* <div className="w-[380px] "></div> */}
      <div className="ml-[380px]">
        <SummaryProvider>
          <MenuTopWrapper >
            <MenuMain />
          </MenuTopWrapper>
          <div className="mt-28">
            {
              rrWarning ?
                <div className="flex-column border-2 border-primary-yellow rounded-md p-2  mx-2">
                  <div
                    onClick={() => setrrWarning(false)}
                    className="flex flex-row justify-between cursor-pointer">

                    <div></div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex flex-row">
                    <div className="pr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 stroke-primary-yellow">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      This recording indicates a high probability of an irregular heart rhythm leading to possible inaccurate results (falsely elevated values) on HQP.
                      Further evaluation with a licensed heart professional may be warranted if this pattern continues.
                    </div>
                  </div>
                </div>
                : null
            }
            <Outlet />
          </div>
        </SummaryProvider>
      </div>
    </>
  )
}