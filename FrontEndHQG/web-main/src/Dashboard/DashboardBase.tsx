import { useMatch } from "@tanstack/react-location";
import React, { ReactNode, useState } from "react";
import { AddSubjectForm } from "../Authentication/Screens/AddSubjectForm";
import { SectionTwo } from "../Common/SectionTwo";
import { ValueBox } from "../Common/ValueBox";
import { useGetUsersByEmailQuery } from "../generated/graphql";
import { LocationGenerics } from "../Router/CustomRouter";
import { debounce } from "lodash";
import { Loader } from "../Common/Loader";
import _ from "lodash";
import { useDoctorFollowUserMutation } from "../generated/graphql";
import { UserCreateUpdateForm } from "../Common/UserCreateUpdateUserForm";
import { SearchIcon } from "../Common/icons/SearchIcon";
import { useAuth } from "../Hooks/AuthContext";
import { developmentFeature } from "../utils/development";
import { useFollowing } from "../Hooks/useFolloweeContext";
import { obscureEmail } from "../utils/functionUtils";

const dataSource = {
  endpoint: import.meta.env.VITE_GRAPHQL_URL,
  fetchParams: {
    headers: {
      // 'Authorization': `Bearer ${auth.user?.token}`,
      "X-Hasura-Admin-Secret": import.meta.env.VITE_GRAPHQL_HEADER,
    },
  },
};

export const DashboardBase = () => {
  const auth = useAuth();
  const { followees, refetch: refetchFollowing } = useFollowing();
  const development = developmentFeature(auth);
  const {
    params: { userId, subjectId },
    data: { practitioner },
  } = useMatch<LocationGenerics>();

  const [search, setSearch] = useState<string>("");
  const [connectSuccess, setConnectSuccess] = useState<string | null>();
  const [connectError, setConnectError] = useState<string | null>();

  const query = useGetUsersByEmailQuery(
    dataSource,
    {
      email: search,
    },
    {
      enabled: !!search,
    }
  );

  const doctorConnectToPatient = useDoctorFollowUserMutation(dataSource, {
    onSuccess: () => {
      setSearch("");
      setConnectSuccess("Successfully connected subject");
      refetchFollowing();
    },
    onError: () => {
      setConnectError("Could not connect to subject, please try again later.");
    },
  });

  const onSearch = (e: any) => {
    setSearch(e.target.value);
  };

  return (
    <div className="flex pl-[320px] mt-12">
      <SectionTwo>
        <div>
          <h1>Dashboard</h1>
          {development ? (
            <div className="flex flex-row justify-center mx-4 mt-10 ">
              <div className="flex flex-1 max-w-md justify-center border-b-2 border-charcoal ">
                <input
                  type="text"
                  name="search"
                  id="search"
                  placeholder="Search User"
                  onChange={debounce(onSearch, 500)}
                  className="flex-1 bg-opacity-0 focus:outline-0 "
                />
                <button className="">
                  <SearchIcon />
                </button>
              </div>
            </div>
          ) : null}
          <div className="text-sm mt-2 text-primary-green">
            {connectSuccess}
          </div>
          <div className="text-sm mt-2 text-primary-red">{connectError}</div>
          {search ? (
            <div>
              <div className="flex flex-row items-center gap-2">
                <h2 className="">Search Results</h2>
                {query.isFetching ? (
                  <svg
                    aria-hidden="true"
                    className="mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-charcoal"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                ) : (
                  query.data?.userByEmail?.total
                )}
              </div>

              <div className=" text-gray-900 bg-white rounded-lg border border-gray-200  mt-2">
                {query.data?.userByEmail?.users &&
                  query.data?.userByEmail?.users.map((u) => {
                    let connected = false;
                    if (followees && u?.id) {
                      connected = findUserById(followees, u?.id);
                    }
                    return (
                      <UserItem
                        key={u?.id}
                        firstName={u?.firstName || ""}
                        lastName={u?.lastName || ""}
                        email={u?.email || ""}
                        action={
                          connected ? (
                            <button
                              className="border-[1px] border-primary bg-desaturated-grey px-2 py-1 rounded-lg "
                              disabled
                            >
                              connected
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                doctorConnectToPatient.mutate({
                                  follower_id: userId,
                                  followee_id: u?.id,
                                });
                              }}
                              className="border-[1px] border-charcoal px-2 py-1 rounded-lg "
                            >
                              connect
                            </button>
                          )
                        }
                      />
                    );
                  })}
              </div>
            </div>
          ) : null}
        </div>
        <div>
          <div className=" max-w-lg  ">
            <h1>Register Patient</h1>
            <p className=" text-primary-grey ">
              You can register a subject by completing the form below.
            </p>
            <AddSubjectForm />
          </div>
        </div>
      </SectionTwo>
    </div>
  );
};

type UserItemProps = {
  firstName: string;
  lastName: string;
  email: string;
  action: ReactNode | null;
};

const UserItem = ({ firstName, lastName, email, action }: UserItemProps) => {
  return (
    <div className="inline-flex relative items-center py-2 px-4 w-full text-sm font-medium rounded-t-lg border-b border-gray-200 hover:bg-gray-100  focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 ">
      <div>
        <svg
          aria-hidden="true"
          className="mr-2 w-8 h-8 fill-current"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </div>
      <div className="flex-1">
        <h3>
          {firstName} {lastName}
        </h3>
        <p>{obscureEmail(email)}</p>
      </div>
      {action && action}
    </div>
  );
};

const findUserById = (list: any[], id: string) => {
  let result = _.find(list, function (n) {
    return n.user.id === id;
  });
  return result ? true : false;
};
