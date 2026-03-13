import { ReactNode, useEffect, useState } from "react";
import { obscureEmail } from "../utils/functionUtils";
import { debounce } from "lodash";
import { SearchIcon } from "../Common/icons/SearchIcon";
import { searchUser, User } from "../Services/FollowService";
import { format } from "date-fns";
import {
  useAcceptFollowingMutation,
  useCompletelyRemoveFollowMutation,
  useDoctorFollowUserMutation,
  useGetFollowingByPartiesIdQuery,
  useUnfollowSubjectMutation,
} from "../generated/graphql";
import { is } from "date-fns/locale";

const dataSource = {
  endpoint: import.meta.env.VITE_GRAPHQL_URL,
  fetchParams: {
    headers: {
      "X-Hasura-Admin-Secret": import.meta.env.VITE_GRAPHQL_HEADER,
    },
  },
};

export const AdminConnect = () => {
  const [practitioner, setPractitioner] = useState<User>();
  const [patient, setPatient] = useState<User>();

  const { data, status, refetch } = useGetFollowingByPartiesIdQuery(
    dataSource,
    {
      follower_id: practitioner?.id,
      followee_id: patient?.id,
    },
    {
      enabled: !!practitioner && !!patient,
    }
  );

  const following = data?.followers[0];

  const { mutate: connectPractToPatient, isLoading: connectLoading } =
    useDoctorFollowUserMutation(dataSource);
  const { mutate: removeConnection, isLoading: removeLoading } =
    useUnfollowSubjectMutation(dataSource);

  const { mutate: removeFollowing, isLoading: removeFollowingLoading } =
    useCompletelyRemoveFollowMutation(dataSource);

  const { mutate: acceptFollowing, isLoading: acceptFollowingLoading } =
    useAcceptFollowingMutation(dataSource);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 mt-8">
      {status === "loading" && practitioner && patient ? (
        <div className="bg-green-500 md:col-span-2 flex flex-row justify-center text-3xl p-4">
          getting relationship
        </div>
      ) : null}
      {following?.accepted_on ? (
        <div className="bg-green-500 md:col-span-2 flex flex-col justify-center p-4">
          <div className="text-2xl">
            {practitioner?.firstName} has {patient?.firstName} as a patient
          </div>
          <div className="flex flex-row gap-2 mt-4">
            {/* <button className="p-4 bg-white hover:bg-green-600 rounded-md">
              Accept Connection
            </button> */}
            <button
              onClick={() => {
                removeConnection(
                  {
                    id: following.id,
                  },
                  {
                    onSettled(data, error, variables, context) {
                      refetch();
                    },
                  }
                );
              }}
              className="p-4 rounded-md bg-red-500 hover:bg-red-700 text-white"
            >
              Remove Connection
            </button>
          </div>
        </div>
      ) : null}
      {following && !following?.accepted_on ? (
        <div className="bg-orange-500 md:col-span-2 flex flex-col justify-center p-4">
          <div className="text-2xl">
            {practitioner?.firstName} has {patient?.firstName} as a patient but
            patient has not accepted
          </div>
          <div className="flex flex-row gap-2 mt-4">
            <button
              onClick={() => {
                acceptFollowing(
                  {
                    id: following?.id,
                  },
                  {
                    onSettled(data, error, variables, context) {
                      refetch();
                    },
                  }
                );
              }}
              className="p-4 bg-white hover:bg-green-600 rounded-md"
            >
              Accept Connection
            </button>
            <button
              onClick={() => {
                removeFollowing(
                  {
                    id: following.id,
                  },
                  {
                    onSettled(data, error, variables, context) {
                      refetch();
                    },
                  }
                );
              }}
              className="p-4 rounded-md bg-red-500 hover:bg-red-700 text-white"
            >
              Remove Connection
            </button>
          </div>
        </div>
      ) : null}
      {data && !following ? (
        <div className="bg-orange-500 md:col-span-2 flex flex-col justify-center p-4">
          <div className="text-2xl">
            {practitioner?.firstName} does not have {patient?.firstName} as a
            patient
          </div>
          <div className="flex flex-row gap-2 mt-4">
            <button
              onClick={() => {
                connectPractToPatient(
                  {
                    follower_id: practitioner?.id,
                    followee_id: patient?.id,
                    accepted_on: new Date(),
                  },
                  {
                    onSettled(data, error, variables, context) {
                      refetch();
                    },
                  }
                );
              }}
              className="p-4 bg-white hover:bg-green-600 rounded-md"
            >
              Add as Patient
            </button>
          </div>
        </div>
      ) : null}
      <div className="col-span-1">
        <div className="text-4xl mb-2">Practitioner</div>
        {practitioner ? <ShowUser user={practitioner} /> : null}
        <SearchColumn
          placeholder="Search Practitioner"
          setSelected={(user) => {
            setPractitioner(user);
          }}
        />
      </div>
      <div className="col-span-1">
        <div className="text-4xl mb-2">Patient</div>
        {patient ? <ShowUser user={patient} /> : null}
        <SearchColumn
          placeholder="Search Patient"
          setSelected={(user) => {
            setPatient(user);
          }}
        />
      </div>
    </div>
  );
};

interface SearchColumndProps {
  placeholder: string;
  setSelected: (user: User) => void;
}

const SearchColumn = ({ placeholder, setSelected }: SearchColumndProps) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const onSearch = async (e: any) => {
    if (!e.target.value) {
      setUsers([]);
      return;
    }
    if (e.target.value.length < 3) return;
    setLoading(true);
    const users = await searchUser(e.target.value);
    setUsers(users);
    setLoading(false);
  };

  return (
    <div className="border border-charcoal p-5 rounded-md">
      <div className="flex flex-row justify-start mx-4 mt-10 ">
        <div className="flex flex-1 max-w-md jusify-start border-b-2 border-charcoal ">
          <input
            type="text"
            name="search"
            id="search"
            placeholder={placeholder}
            onChange={debounce(onSearch, 500)}
            className="flex-1 bg-opacity-0 focus:outline-0 "
          />
          <button className="">
            <SearchIcon />
          </button>
        </div>
      </div>
      {loading && (
        <div className="flex flex-row text-center py-8">Searching...</div>
      )}
      {users?.map((user) => (
        <UserItem
          key={user.id}
          firstName={user.firstName}
          lastName={user.lastName}
          email={user.email}
          action={
            <button
              onClick={() => setSelected(user)}
              className="absolute right-4 bg-blue-700 text-white px-2 py-1 rounded-md"
            >
              Select
            </button>
          }
        />
      ))}
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

const ShowUser = ({ user }: { user: User }) => {
  return (
    <div className="flex flex-col bg-light-grey p-4 mb-4 rounded-md">
      <div>{user.id}</div>
      <div className="text-xl">
        {user.firstName} {user.lastName}
      </div>
      <div className="text-md">{user.email}</div>
      <div className="text-md">
        Gender: <span className="uppercase">{user.gender}</span>
      </div>
      <div className="text-md">
        DoB: {format(new Date(user.dateOfBirth), "dd MMM yyyy")}
      </div>
    </div>
  );
};
