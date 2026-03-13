import * as Popover from "@radix-ui/react-popover";
import {
  Link,
  Outlet,
  useMatch,
  useMatchRoute,
} from "@tanstack/react-location";
import { useActor } from "@xstate/react";
import { differenceInYears } from "date-fns";
import { AddiIcon } from "../Common/icons/AddiIcon";
import { Loader } from "../Common/Loader";
import {
  Order_By,
  useGetAllHeartDataForOwnerQuery,
} from "../generated/graphql";
import { LocationGenerics } from "../Router/CustomRouter";
import { compareMachine } from "../Services/CompareRecordingMachine";
import { developmentFeature } from "../utils/development";
import { useAuth } from "../Hooks/AuthContext";
import { SubjectContextBox } from "../Common/SubjectContextBox";

const dataSource = {
  endpoint: import.meta.env.VITE_GRAPHQL_URL,
  fetchParams: {
    headers: {
      // 'Authorization': `Bearer ${auth.user?.token}`,
      "X-Hasura-Admin-Secret": import.meta.env.VITE_GRAPHQL_HEADER,
    },
  },
};

export const QuestionnaireMain = () => {
  const auth = useAuth();
  const {
    params: { userId, subjectId, recordingId },
    data: {},
  } = useMatch<LocationGenerics>();

  const matchRoute = useMatchRoute();

  const {
    data: subject,
    isLoading: subjectLoading,
    refetch: subjectRefetch,
  } = useGetAllHeartDataForOwnerQuery(
    dataSource,
    {
      _eq: subjectId || "",
      id: subjectId,
      where: {
        owner: { _eq: subjectId },
        deleted_on: { _is_null: true },
      },
      order_by: Order_By.Desc,
    },
    {
      enabled: !!subjectId,
      refetchInterval: 3000,
    }
  );


  return (
    <div className="relative h-full ">
      <div className="w-[300px] absolute ml-20 z-10 inset-0 ">
        {subjectLoading ? (
          <div className="flex flex-col justify-center items-center bg-desaturated-grey h-[1080px]">
            <Loader />
            <div className="uppercase mt-2">Loading User</div>
          </div>
        ) : (
          <div className={`transition-all duration-100  `}>
            {/* User details */}
          <SubjectContextBox userId={userId} subjectId={subjectId} />
          <hr className="mt-7" />
          </div>
        )}
      </div>
      <div className="flex flex-col flex-1">{<Outlet />}</div>
    </div>
  );
};
