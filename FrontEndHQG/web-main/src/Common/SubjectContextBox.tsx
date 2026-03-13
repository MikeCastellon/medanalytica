import * as Popover from "@radix-ui/react-popover";
import { useState } from "react";
import { MoreDotsIcon } from "./icons/MoreDotsIcon";
import { UserCreateUpdateForm } from "./UserCreateUpdateUserForm";
import { ForgotPassword, UpdateSubject } from "../Services/AuthService";
import { GetAllHeartDataForOwnerQuery, useGetSubjectDetailsQuery, useUnfollowSubjectMutation } from "../generated/graphql";
import { differenceInYears, format } from "date-fns";
import { useQueryClient } from "@tanstack/react-query";
import { Followee } from "../Services/FollowService";
import { useNavigate } from "@tanstack/react-location";
import { maskEmail, maskMobileNumber } from "../utils/functionUtils";
import { useFollowing } from "../Hooks/useFolloweeContext";

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
type SubjectContextBoxProps = {
    userId: string;
    subjectId: string;
}

export const SubjectContextBox = ({ userId, subjectId }: SubjectContextBoxProps) => {

    
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { followees, refetch: refetchFollowing } = useFollowing();
  const followIndex = followees.findIndex((f) => f.user.id === subjectId);
  const followDetail = followIndex ? followees[followIndex] : null;

  const unFollowSubject = useUnfollowSubjectMutation(dataSource);

  const { data: subject, isLoading: subjectLoading, refetch: subjectRefetch } =
    useGetSubjectDetailsQuery(
      dataSource,
      {
        _eq: subjectId || "",
        id: subjectId,
      },
      {
        enabled: !!subjectId,
      }
    );

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [maskEmailState, setMaskEmailState] = useState<boolean>(true);
  const [maskMobileState, setMaskMobileState] = useState<boolean>(true);
  const [sendResetMail, setSendResetMail] = useState<PasswordResetStatus>(
    PasswordResetStatus.NOT_STARTED
  );

    return (
        <div className="mx-2 mt-4">
              {subject && !subjectLoading && (
                <div className="flex flex-row justify-between ">
                  <div className="text-charcoal text-2xl">
                    {subject.users_by_pk?.first_name}{" "}
                    {subject.users_by_pk?.last_name}
                  </div>
                  <Popover.Root open={isOpen}>
                    <div
                      className=" w-6 flex flex-col justify-center items-center hover:bg-light-grey rounded-md mb-1 cursor-pointer "
                      onClick={(e) => {
                        e.preventDefault();
                        setIsOpen(true);
                      }}
                    >
                      <Popover.Anchor className="">
                        <MoreDotsIcon />
                      </Popover.Anchor>
                    </div>
                    <Popover.Portal>
                      <Popover.Content
                        side="right"
                        sideOffset={10}
                        className="flex flex-col  bg-white shadow-lg rounded-lg border-charcoal border-[1px] p-2 z-50"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <div className="flex flex-row justify-between items-center border-b-2 border-b-desaturated-grey py-1">
                          <div>Manage User</div>
                          <button onClick={() => setIsOpen(false)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </button>
                        </div>
                        {!isDeleting && !isEditing && (
                          <div className="flex flex-row gap-2">
                            <button
                              type="button"
                              onClick={() => setIsEditing(true)}
                              className="text-sm text-primary-yellow hover:bg-primary-yellow border-primary-yellow border-2 rounded-md hover:text-white py-1 px-2  mt-4"
                            >
                              Edit User
                            </button>
                            <button
                              type="button"
                              onClick={() => setIsDeleting(true)}
                              className="text-sm text-primary-red hover:bg-primary-red border-primary-red border-2 rounded-md hover:text-white py-1 px-2  mt-4"
                            >
                              Remove User
                            </button>
                          </div>
                        )}

                        {isEditing && (
                          <div>
                            <UserCreateUpdateForm
                              initialValues={{
                                email: subject?.user?.email || "",
                                firstName: subject?.user?.firstName || "",
                                lastName: subject?.users_by_pk?.last_name || "",
                                mobilePhone:
                                  subject?.users_by_pk?.mobile_phone || "",
                                birthDay: subject?.users_by_pk?.birth_date
                                  ? new Date(
                                      subject.users_by_pk.birth_date
                                    ).getDate()
                                  : 0,
                                birthMonth: subject?.users_by_pk?.birth_date
                                  ? new Date(
                                      subject.users_by_pk.birth_date
                                    ).getMonth()
                                  : 0,
                                birthYear: subject?.users_by_pk?.birth_date
                                  ? new Date(
                                      subject.users_by_pk.birth_date
                                    ).getFullYear()
                                  : 0,
                                gender: subject?.users_by_pk?.data
                                  ? JSON.parse(subject.users_by_pk.data).data
                                      .gender
                                  : "male",
                              }}
                              formSize={"small"}
                              additionalActions={
                                <button
                                  type="button"
                                  onClick={() => setIsEditing(false)}
                                  className="px-2 rounded-md border-2 border-charcoal hover:bg-charcoal  text-xs text-charcoal hover:text-white py-2  mt-2 mb-2"
                                >
                                  Cancel Edit
                                </button>
                              }
                              onFormSubmit={(values, cb) => {
                                UpdateSubject({
                                  id: subjectId,
                                  firstName: values.firstName,
                                  lastName: values.lastName,
                                  mobilePhone: values.mobilePhone,
                                  email: values.email,
                                  metadata: {
                                    gender: values.gender,
                                  },
                                  birthDate: format(
                                    new Date(
                                      values.birthYear,
                                      values.birthMonth,
                                      values.birthDay
                                    ),
                                    "yyyy-MM-dd"
                                  ),
                                }).then(() => {
                                  queryClient.refetchQueries([
                                    "GetAllHeartDataForOwner",
                                  ]);
                                  subjectRefetch();
                                  setIsEditing(false);
                                });
                              }}
                            />
                          </div>
                        )}
                        {isDeleting && (
                          <div>
                            <p>
                              You are about to{" "}
                              <span className="text-primary-red">REMOVE</span>{" "}
                              this user from your list.
                            </p>
                            <p>
                              Are you sure you want to remove the use from your
                              list?
                            </p>
                            <div className="flex flex-row space-x-2 justify-end">
                              <button
                                type="button"
                                onClick={() => setIsDeleting(false)}
                                className="text-sm text-primary-green hover:bg-primary-green border-primary-green border-2 rounded-md hover:text-white py-1 px-2  mt-4"
                              >
                                No Don't Remove
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  console.log(
                                    "Deleting: ",
                                    followDetail?.user.id
                                  );
                                  followDetail
                                    ? unFollowSubject.mutate(
                                        {
                                          id: followDetail.id,
                                        },
                                        {
                                          onSuccess: () => {
                                            setIsDeleting(false);
                                            refetchFollowing();
                                            navigate({
                                              to: `/${userId}/dashboard`,
                                              replace: true,
                                            });
                                          },
                                        }
                                      )
                                    : null;
                                }}
                                className="text-sm text-primary-red hover:bg-primary-red border-primary-red border-2 rounded-md hover:text-white py-1 px-2  mt-4"
                              >
                                Yes, Remove
                              </button>
                            </div>
                          </div>
                        )}

                        <Popover.Arrow className="fill-charcoal  " />
                      </Popover.Content>
                    </Popover.Portal>
                  </Popover.Root>
                </div>
              )}
              {subject && (
                <div className="text-black text-lg">
                  Age:{" "}
                  {differenceInYears(
                    new Date(),
                    new Date(subject.users_by_pk?.birth_date)
                  )}{" "}
                </div>
              )}
              {subject && subject.users_by_pk && subject.users_by_pk.data && (
                <div className="text-black text-lg">
                  {" "}
                  Gender:
                  <span className=" capitalize ">
                    {" " + JSON.parse(subject.users_by_pk?.data).data.gender}
                  </span>
                </div>
              )}
              {subject && (
                <div
                  className="text-black text-lg"
                  onMouseEnter={() => setMaskEmailState(false)}
                  onMouseLeave={() => setMaskEmailState(true)}
                >
                  Email:{" "}
                  {subject?.user?.email
                    ? maskEmailState
                      ? maskEmail(subject?.user?.email)
                      : subject?.user?.email
                    : ""}
                </div>
              )}
              {subject && (
                <div
                  className="text-black text-lg"
                  onMouseEnter={() => setMaskMobileState(false)}
                  onMouseLeave={() => setMaskMobileState(true)}
                >
                  Mobile:{" "}
                  {subject?.users_by_pk?.mobile_phone
                    ? maskMobileState
                      ? maskMobileNumber(subject?.users_by_pk?.mobile_phone)
                      : subject?.users_by_pk?.mobile_phone
                    : ""}
                </div>
              )}
              <div>
                <button
                  onClick={() => {
                    setSendResetMail(PasswordResetStatus.PENDING);
                    ForgotPassword({ email: subject?.user?.email || "" })
                      .then(() => {
                        setSendResetMail(PasswordResetStatus.SUCCESS);
                      })
                      .catch(() => {
                        setSendResetMail(PasswordResetStatus.ERROR);
                      });
                  }}
                  className=" bg-primary-grey hover:bg-black text-white rounded-md px-3 py-1 mt-4 ml-2"
                >
                  {(() => {
                    switch (sendResetMail) {
                      case PasswordResetStatus.NOT_STARTED:
                        return <span>Send Password Reset Email</span>;
                      case PasswordResetStatus.PENDING:
                        return <span>Sending...</span>;
                      case PasswordResetStatus.SUCCESS:
                        return <span>Email Sent</span>;
                      case PasswordResetStatus.ERROR:
                        return <span>Error</span>;
                    }
                  })()}
                </button>
              </div>
            </div>
    )

}