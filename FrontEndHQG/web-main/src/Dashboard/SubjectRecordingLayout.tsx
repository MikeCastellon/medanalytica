import {
  Link,
  Outlet,
  useMatch,
  useMatchRoute,
  useNavigate,
} from "@tanstack/react-location";
import { useAuth } from "../Hooks/AuthContext";
import {
  Heart_Data,
  Order_By,
  useGetAllHeartDataForOwnerQuery,
  useUnfollowSubjectMutation,
  useUpdateUserProfileMutation,
} from "../generated/graphql";
import differenceInYears from "date-fns/differenceInYears";
import { RecordingMenuItem } from "./RecordingMenuItem";
import { LocationGenerics } from "../Router/CustomRouter";
import * as Popover from "@radix-ui/react-popover";
import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Loader } from "../Common/Loader";
import { UserCreateUpdateForm } from "../Common/UserCreateUpdateUserForm";
import { format, parse, sub } from "date-fns";
import { AddiIcon } from "../Common/icons/AddiIcon";
import { MoreDotsIcon } from "../Common/icons/MoreDotsIcon";
import { SearchIcon } from "../Common/icons/SearchIcon";
import { compareMachine } from "../Services/CompareRecordingMachine";
import { useActor } from "@xstate/react";
import { useUserContext } from "../Hooks/UserContext";
import { db, RecordingObj } from "../utils/dexieStorage";
import { useLiveQuery } from "dexie-react-hooks";
import axios from "axios";
import { ForgotPassword, UpdateSubject } from "../Services/AuthService";
import { developmentFeature } from "../utils/development";
import { useFollowing } from "../Hooks/useFolloweeContext";
import { maskEmail, maskMobileNumber } from "../utils/functionUtils";
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

enum PasswordResetStatus {
  NOT_STARTED,
  PENDING,
  SUCCESS,
  ERROR,
}

export const SubjectRecordingLayout = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { followees, refetch: refetchFollowing } = useFollowing();

  const {
    params: { userId, subjectId },
  } = useMatch<LocationGenerics>();

  const queryClient = useQueryClient();

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

  const { currentRecording } = useUserContext();

  const checkCompare = matchRoute({ to: "*/" });
  const isCompare = checkCompare
    ? checkCompare["*"]
      ? checkCompare["*"].split("/")[0] === "compare"
      : false
    : false;
  const isQuestionnaire = checkCompare
    ? checkCompare["*"]
      ? checkCompare["*"].split("/")[0] === "questionnaires"
      : false
    : false;

  const [_, send] = useActor(compareMachine);

  const followIndex = followees.findIndex((f) => f.user.id === subjectId);
  const followDetail = followIndex ? followees[followIndex] : null;

  const [search, setSearch] = useState<string>("");
  const [recordings, setRecordings] = useState<Heart_Data[]>();
  const updateUser = useUpdateUserProfileMutation(dataSource);
  const unFollowSubject = useUnfollowSubjectMutation(dataSource);
  useEffect(() => {
    queryClient.refetchQueries(["GetAllHeartDataForOwner"]);
  }, [subjectId]);

  useEffect(() => {
    if (subject && subject.heart_data.length !== 0) {
      setRecordings(subject.heart_data as Heart_Data[]);
    }
    if (subject?.heart_data.length === 0) {
      setRecordings([]);
    }

    return () => {
      setSearch(search);
      if (subject && subject.heart_data.length !== 0) {
        setRecordings(subject.heart_data as Heart_Data[]);
      }
    };
  }, [subjectId, subject]);

  useEffect(() => {
    if (!isCompare) {
      send({ type: "CLEAR" });
    }
  }, [isCompare, currentRecording]);

  const onSearch = (value: string) => {
    if (subject && subject.heart_data.length !== 0) {
      const hd = [...subject.heart_data];
      setRecordings(
        hd.filter(({ title }) =>
          title.toLocaleLowerCase().match(value.toLocaleLowerCase())
        ) as Heart_Data[]
      );
    }
  };

  if (isQuestionnaire) {
    <Outlet />;
  }

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

          <SubjectContextBox 
            userId={userId}
            subjectId={subjectId}
            />

            {/* Search Recording */}
            <div className="flex flex-row align-middle mx-4 mt-10 border-b-2 border-charcoal ">
              <button className="">
                <SearchIcon className="stroke-primary-red" />
              </button>
              <input
                type="text"
                name="search"
                id="search"
                onChange={(v) => onSearch(v.target.value)}
                className="flex-1 bg-opacity-0 active:border-b-2 active:border-red-600  focus:border-b-2 focus:border-red-600 "
              />
            </div>

            {/* Add A Recording */}
            <div className="px-2 mt-8  pb-1">
              <Link
                to={`/${userId}/dashboard/${subjectId}`}
                className="flex flex-row items-center "
              >
                <div className="p-1 bg-primary-red shadow-md text-white rounded-full">
                  <AddiIcon />
                </div>
                <span className="pl-3">Add Recording</span>
              </Link>
            </div>

            <FailedRecordings />

            <div className="mt-8 max-h-[1500px] overflow-auto scrollbar-hide">
              {recordings &&
                recordings.length !== 0 &&
                !isCompare &&
                !isQuestionnaire &&
                recordings?.map((hd) => {
                  return (
                    <RecordingMenuItem key={hd.id} recording={{ ...hd }} />
                  );
                })}
              {recordings &&
                recordings.length !== 0 &&
                isCompare &&
                !isQuestionnaire &&
                recordings.map((hd, i) => {
                  return (
                    <div
                      key={i}
                      onClick={() => send({ type: "SELECT", value: hd })}
                      className={`
                      ${
                        compareMachine.state.context.leftRecording?.id === hd.id
                          ? "bg-desaturated-green bg-opacity-5"
                          : ""
                      }
                      ${
                        compareMachine.state.context.rightRecording?.id ===
                        hd.id
                          ? "bg-desaturated-blue bg-opacity-5"
                          : ""
                      }
                       group flex flex-row h-14 px-2 pt-1 border-charcoal border-b-[1px]  hover:bg-desaturated-grey hover:bg-opacity-0 text-charcoal hover:text-black cursor-pointer hover:border-l-4  hover:border-black`}
                    >
                      <div className="flex flex-col w-full  ">
                        <div className="text-lg h-6 overflow-hidden text-ellipse">
                          {hd.title}
                        </div>
                        <div className=" text-xs text-primary-grey ">
                          {format(
                            new Date(hd.created_on),
                            "dd MMM yyyy  kk:mm"
                          )}
                        </div>
                      </div>
                    </div>
                    // <RecordingMenuItem key={hd.id} recording={{ ...hd }} />
                  );
                })}
              <div className="bg-primary-red text-white flex text-center justify-center">
                List end
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col flex-1">
        {
          // currentRecording ?
          <Outlet />
          //  : <div className='ml-[380px]'>Loading Current Recording</div>
        }
      </div>
    </div>
  );
};

const FailedRecordings = () => {
  const {
    params: { subjectId },
  } = useMatch<LocationGenerics>();
  const recordings = useLiveQuery(() => {
    return db.recordings.where("ownerId").equals(subjectId).toArray();
  }, [subjectId]);

  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  if (!recordings) return null;

  return (
    <div className="mt-4">
      {recordings.map((ro) => {
        const r = new RecordingObj(
          ro.title,
          ro.recordingString,
          ro.ownerId,
          ro.sampleRate
        );
        ro.id ? r.setId(ro.id) : null;

        return (
          <div
            key={r.id}
            className={` group flex flex-row h-14 px-2 pt-1 border-charcoal border-b-[1px] bg-yellow-100  hover:bg-desaturated-grey hover:bg-opacity-0 text-charcoal hover:text-black cursor-pointer hover:border-l-4  hover:border-black`}
          >
            <div className="flex flex-col w-full  ">
              <div className="text-lg h-6 overflow-hidden text-ellipse">
                Unsynced - {r.title}
              </div>
              <div className=" text-xs text-primary-grey ">
                {format(new Date(r.created_on), "dd MMM yyyy  kk:mm")}
              </div>
            </div>

            {!isUploading ? (
              <div
                className={`flex group-hover:flex w-6 flex-row justify-center items-center mx-1 text-xs gap-2 mr-2`}
              >
                <button
                  type="button"
                  className="text-primary-green"
                  onClick={() => {
                    setIsUploading(true);
                    axios({
                      method: "post",
                      headers: {
                        "Content-Type": "multipart/form-data",
                      },
                      data: r.toFormData(),
                      url: `${import.meta.env.VITE_API_URL}/v1/recordings`,
                      onUploadProgress: (ev: ProgressEvent) => {
                        const progress = Math.round(
                          (ev.loaded / ev.total) * 100
                        );
                        console.log("Progress: ", progress);
                        setUploadProgress(progress);
                      },
                    })
                      .then(() => {
                        if (r.id)
                          db.recordings.where("id").equals(r.id).delete();
                      })
                      .finally(() => {
                        setIsUploading(false);
                      });
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  className="text-primary-red"
                  onClick={() => {
                    if (r.id) db.recordings.where("id").equals(r.id).delete();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            ) : null}

            {isUploading ? (
              <div
                className={`flex group-hover:flex w-6 flex-row justify-center items-center mx-1 text-xs gap-1 mr-2`}
              >
                uploading <br />
                {uploadProgress}%
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};
