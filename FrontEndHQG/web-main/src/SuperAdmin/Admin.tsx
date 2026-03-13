import React, {
  ReactNode,
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { MainHeader } from "../Common/MainHeader";
import axios from "axios";
import { debounce } from "lodash";
import { SearchIcon } from "../Common/icons/SearchIcon";
import _ from "lodash";
import { Loader } from "../Common/Loader";
import * as Dialog from "@radix-ui/react-dialog";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { XMark } from "../Common/icons/XMark";
import { ForgotPassword } from "../Services/AuthService";
import { useDoctorFollowUserMutation } from "../generated/graphql";
import { Link } from "@tanstack/react-location";

const AUTH_URL = import.meta.env.VITE_AUTH_URL;
const AUTHORIZATION = import.meta.env.VITE_AUTHORIZATION;
const APP_ID = import.meta.env.VITE_AUTH_APP_ID;

export const Admin = () => {
  const [search, setSearch] = useState<string>("");
  const [error, setError] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [users, setUsers] = useState([]);

  const [numberOfResults, setNumberOfResults] = useState(25);
  const [pageNumber, setPageNumber] = useState(0);

  const [totalResults, setTotalResults] = useState(0);
  const [pages, setPages] = useState(() => totalResults / numberOfResults);

  useEffect(() => {
    setUsers([]);
    axios({
      method: "POST",
      url: `${AUTH_URL}/api/user/search`,
      headers: {
        Authorization: `${AUTHORIZATION}`,
        "Content-Type": "application/json",
      },
      data: {
        search: {
          numberOfResults: numberOfResults,
          queryString: search,
          startRow: pageNumber,
          sortFields: [
            {
              name: "insertInstant",
              order: "desc",
            },
          ],
        },
      },
    })
      .then((v) => {
        setUsers(v.data.users);
        setTotalResults(v.data.total);
      })
      .catch((err) => {
        console.log(err.message);
        setUsers([]);
        setError(
          "Could not get system users at this time, please contact the administrator"
        );
        setErrorMessage(err.message);
      });

    return () => {};
  }, [search]);

  const onSearch = (e: any) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <div className="p-10">
        {/* <h1>Super Admin</h1>
        <div className="h-10"></div> */}
        {error ? (
          <div
            className="flex flex-col items-start p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
            role="alert"
          >
            <div className="flex flex-row">
              <svg
                className="flex-shrink-0 inline w-4 h-4 mr-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>

              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium">Error!</span> {error}
              </div>
            </div>
            <div>
              <span className="font-medium">Message: </span> {errorMessage}
            </div>
          </div>
        ) : null}

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

        <div className="h-10"></div>

        <div>
          Total Results: {totalResults} {search ? "" : "<-all users"}
        </div>
        <div className=" text-gray-900 bg-white rounded-lg border border-gray-200  mt-2">
          {users?.map((u: any) => {
            return (
              <UserItem
                key={u?.id}
                userId={u.id}
                firstName={u?.firstName || ""}
                lastName={u?.lastName || ""}
                email={u?.email || ""}
                dateCreated={
                  u?.insertInstant ? epochToHumanReadable(u?.insertInstant) : ""
                }
                registration={getRegistration(u?.registrations)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

type UserItemProps = {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  dateCreated: string;
  registration: any;
  action?: ReactNode | null;
};

enum PasswordResetStatus {
  NOT_STARTED,
  PENDING,
  SUCCESS,
  ERROR,
}

const dataSource = {
  endpoint: import.meta.env.VITE_GRAPHQL_URL,
  fetchParams: {
    headers: {
      // 'Authorization': `Bearer ${auth.user?.token}`,
      "X-Hasura-Admin-Secret": import.meta.env.VITE_GRAPHQL_HEADER,
    },
  },
};

const UserItem = ({
  userId,
  firstName,
  lastName,
  email,
  dateCreated,
  registration,
}: UserItemProps) => {
  const roles: Array<string> = registration?.roles;
  const [showEmail, setShowEmail] = useState(false);
  const [admin, setAdmin] = useState(roles?.includes("admin"));

  const [loading, setLoading] = useState(false);

  const [nRoles, setNRoles] = useState(roles ? [...roles] : []);

  const [sendResetMail, setSendResetMail] = useState<PasswordResetStatus>(
    PasswordResetStatus.NOT_STARTED
  );
  const { mutate } = useDoctorFollowUserMutation(dataSource);

  const onChange = (e: any) => {
    let val = e.target.value;
    if (nRoles.includes(val)) {
      const resultRem = nRoles.filter((item: string) => item !== val);
      updateUserRoles([...resultRem]);
      mutate({
        followee_id: userId,
        follower_id: userId,
        accepted_on: new Date().toISOString(),
      });
      setNRoles(resultRem);
    } else {
      const resultAdd = [...nRoles, val];
      updateUserRoles([...resultAdd]);
      setNRoles(resultAdd);
      mutate({
        followee_id: userId,
        follower_id: userId,
        accepted_on: new Date().toISOString(),
      });
    }
  };

  const updateUserRoles = (updateRoles: string[]) => {
    setLoading(true);
    axios({
      method: "PUT",
      url: `${AUTH_URL}/api/user/registration/${userId}/${APP_ID}`,
      headers: {
        Authorization: `${AUTHORIZATION}`,
        "Content-Type": "application/json",
      },
      data: {
        registration: {
          ...registration,
          roles: updateRoles,
        },
      },
    })
      .then((d) => {
        console.log(d);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

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
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>
      <div
        className="flex-1"
        onMouseEnter={() => setShowEmail(true)}
        onMouseLeave={() => setShowEmail(false)}
      >
        <div className="text-lg">
          {firstName} {lastName}
        </div>
        <div className="text-sm">
          {email ? (showEmail ? email : obscureEmail(email)) : ""}
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <div>Date created: {dateCreated}</div>
      </div>
      <div className="flex flex-1 flex-col items-end">
        {loading ? <Loader /> : null}
      </div>
      <div className=" flex flex-col items-end">
        <label className="relative inline-flex items-center mr-5 cursor-pointer">
          <input
            type="checkbox"
            value="user"
            className="sr-only peer"
            checked={nRoles.includes("user")}
            onChange={onChange}
            disabled={admin || loading}
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
          <span className="ml-3 text-sm font-medium text-gray-900 ">User</span>
        </label>
      </div>
      <div className="flex flex-col items-end">
        <label className="relative inline-flex items-center mr-5 cursor-pointer">
          <input
            type="checkbox"
            value="professional"
            className="sr-only peer"
            checked={nRoles.includes("professional")}
            onChange={onChange}
            disabled={admin || loading}
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
          <span className="ml-3 text-sm font-medium text-gray-900 ">
            Professional
          </span>
        </label>
      </div>
      <div>
        <PasswordModal
          userId={userId}
          firstname={firstName}
          lastname={lastName}
          email={email}
        />
      </div>
      <div>
        <button
          onClick={() => {
            setSendResetMail(PasswordResetStatus.PENDING);
            ForgotPassword({ email: email })
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
  );
};

const obscureEmail = (email: string) => {
  const [name, domain] = email.split("@");
  return `${name[0]}${new Array(name.length).join("*")}@${domain}`;
};

function epochToHumanReadable(epochTime: number) {
  let date = new Date(epochTime);

  // Extracting day, month, and year from the date
  let day = date.getDate();
  let year = date.getFullYear();

  // Array of month names to get the month as a string
  let monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = monthNames[date.getMonth()];

  return `${day} ${month} ${year}`;
}

const getRegistration = (registrations: [any]) => {
  const registration = _.find(registrations, { applicationId: APP_ID });
  return registration;
};

type PasswordModalProp = {
  userId: string;
  firstname: string;
  lastname: string;
  email: string;
};

export const PasswordModal = ({
  userId,
  firstname,
  lastname,
  email,
}: PasswordModalProp) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("Change Password");

  const updateUserPassword = (email: string, password: string) => {
    setLoading(true);
    axios({
      method: "PATCH",
      url: `${AUTH_URL}/api/user/${userId}`,
      headers: {
        Authorization: `${AUTHORIZATION}`,
        "Content-Type": "application/json",
      },
      data: {
        user: {
          email,
          password,
        },
      },
    })
      .then((d) => {
        setSuccess("✅ Change Successful");
      })
      .catch((err) => {
        setSuccess("Error!");
      })
      .finally(() => {
        setLoading(false);
        setIsOpen(false);
      });
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger>{success}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          // onClick={() => setIsOpen(false)}
          className="fixed top-0 bottom-0 bg-gray-600 bg-opacity-50 overflow-auto w-full z-50 flex flex-col justify-center items-center py-24"
        >
          <div
            className={`flex flex-col w-full md:w-1/4 min-h-40 bg-white shadow-md rounded-lg overflow-y-auto p-3 z-50`}
          >
            <div className="flex flex-row justify-between border-desaturated-grey border-b-[1px]">
              <div className="text-charcoal text-lg  mb-3 uppercase">
                Change Password
              </div>
              <button type="button" onClick={() => setIsOpen(false)}>
                <XMark />
              </button>
            </div>
            <div className="mt-2 text-md">
              Changing password for {firstname} {lastname}
            </div>
            <div className="mt-2 text-md">Email: {email}</div>
            {loading ? (
              <div className="flex flex-1 flex-col items-center mt-4">
                <Loader />
              </div>
            ) : null}
            <Formik
              initialValues={{
                password: "",
                confirmPassword: "",
              }}
              validationSchema={ChangePasswordSchema}
              onSubmit={(v) => {
                updateUserPassword(email, v.password);
              }}
            >
              {({ errors, touched }) => (
                <Form className="flex flex-col mt-8 w-full px-2">
                  <div className="flex flex-row">
                    <Field
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="flex flex-1 border-[1px] border-charcoal border-opacity-25 rounded-md p-2"
                    />
                    <button
                      type="button"
                      className="pl-2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
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
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      ) : (
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
                            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                  {errors.password && touched.password ? (
                    <div className="text-red-600">{errors.password}</div>
                  ) : null}
                  <div className="mt-6"></div>

                  <Field
                    name="confirmPassword"
                    type={showPassword ? "text" : "Password"}
                    placeholder="Password"
                    className="flex border-[1px] border-charcoal border-opacity-25 rounded-md p-2"
                  />
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <div className="text-red-600">{errors.confirmPassword}</div>
                  ) : null}
                  <button
                    type="submit"
                    className="bg-charcoal rounded-sm text-white py-2  mt-4 disabled:bg-primary-grey"
                    disabled={loading}
                  >
                    Change Password
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

const ChangePasswordSchema = Yup.object().shape({
  password: Yup.string().required("Password Required"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});
