import { Link, useLocation, useMatch } from "@tanstack/react-location";
import React, { useState } from "react";
import { Book } from "../Common/icons/Book";
import { Loader } from "../Common/Loader";
import {
  Order_By,
  useGetAllHeartDataForOwnerQuery,
  useGetQuestionSetsQuery,
} from "../generated/graphql";
import { LocationGenerics } from "../Router/CustomRouter";
import axios from "axios";

const dataSource = {
  endpoint: import.meta.env.VITE_GRAPHQL_URL,
  fetchParams: {
    headers: {
      // 'Authorization': `Bearer ${auth.user?.token}`,
      "X-Hasura-Admin-Secret": import.meta.env.VITE_GRAPHQL_HEADER,
    },
  },
};

export const ListQuestionSets = () => {
  const location = useLocation();
  const {
    params: { subjectId },
  } = useMatch<LocationGenerics>();

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
        // ...(query.get('trend') ? { trend_recording: { _eq: query.get('trend') } } : { trend_recording: { _is_null: false } }),
      },
      order_by: Order_By.Desc,
    },
    {
      enabled: !!subjectId,
      refetchInterval: 3000,
    }
  );

  const { data, isLoading } = useGetQuestionSetsQuery(dataSource);
  const [copied, setCopied] = useState(false);

  const [mailSent, setMailSent] = useState(false);

  const sendQuestionnaire = (
    email: string,
    full_name: string,
    questionnaire_link: string
  ) => {
    const formdata = new FormData();
    formdata.append("email", email);
    formdata.append("full_name", full_name);
    formdata.append("questionnaire_link", questionnaire_link);

    setMailSent(true);
    axios({
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formdata,
      url: `${import.meta.env.VITE_API_URL}/v1/mailer/questionnaire`,
      // url: `http://localhost:8000/v1/mailer/questionnaire`,
      onUploadProgress: (ev: ProgressEvent) => {
        const progress = Math.round((ev.loaded / ev.total) * 100);
        console.log("Progress: ", progress);
      },
    })
      .then(() => {
        console.log("Successfully sent mail");
        setMailSent(false);
      })
      .catch(() => {
        console.log("Could not send the mail at this moment");
        setMailSent(false);
      })
      .finally(() => {
        setMailSent(false);
      });
  };

  return (
    <div className="ml-[380px] p-8">
      <div className="flex flex-col justify-between h-44 gradient-background items-start p-4">
        <div className="flex flex-row">
          <button
            type="button"
            onClick={() => location.history.back()}
            className="bg-white px-5 py-1 rounded-md "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 fill-primary-green"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
              />
            </svg>
          </button>
        </div>
        <div className="flex-row">
          <div className="text-4xl text-white">Question Sets</div>
          <p className="text-white text-lg">
            Question sets are a subset of questionnaires and can be completed
            without the context of a questionnaire
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col min-h-[400px] justify-center items-center">
          <div className=" w-80 ">
            <Loader />
            <div className="text-center mt-2">Getting questionnaires...</div>
          </div>
        </div>
      ) : null}

      {data ? (
        <div className="mt-4">
          <div className="flex flex-col mt-6">
            {/* <div className=' text-2xl mb-4 '>{title}</div> */}
            <div className="grid grid-cols-4 gap-4">
              {data.question_set.map((q) => {
                return (
                  <Link to={q.id}>
                    <div className="  flex-1 rounded-lg shadow-md ">
                      <div className=" flex flex-row justify-center items-center h-28 gradient-background rounded-md text-white ">
                        <div className="flex flex-row justify-center items-center w-24 h-24 bg-white rounded-full bg-opacity-10 ">
                          <Book solid={false} />
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="text-lg">{q.title}</div>
                        <div className="flex flex-col mt-2">
                          <div>Part of:</div>
                          {q.questionnaires &&
                            q.questionnaires.map((qn) => {
                              return (
                                <div className="text-sm text-primary-grey">
                                  {qn?.questionnaire_id?.title}
                                </div>
                              );
                            })}
                        </div>
                        <div className=" flex flex-row justify-end gap-2 px-4 mt-4 ">
                          <Link to={`${q.id}/fill`}>
                            <div className="group relative flex flex-col justify-center items-center border-2 border-primary-grey rounded-full h-10 w-10 text-primary-grey hover:border-primary-green hover:text-primary-green">
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
                                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                />
                              </svg>
                              <span className="group-hover:opacity-100 w-12 transition-opacity bg-gray-800 px-1 text-sm text-gray-100 rounded-md absolute left-1/2 -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto cursor-pointer ">
                                {"Fill-in"}
                              </span>
                            </div>
                          </Link>
                          <Link to={`${q.id}/view`}>
                            <div className="group relative flex flex-col justify-center items-center border-2 border-primary-grey rounded-full h-10 w-10 text-primary-grey hover:border-primary-green hover:text-primary-green">
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
                                  d="M7.875 14.25l1.214 1.942a2.25 2.25 0 001.908 1.058h2.006c.776 0 1.497-.4 1.908-1.058l1.214-1.942M2.41 9h4.636a2.25 2.25 0 011.872 1.002l.164.246a2.25 2.25 0 001.872 1.002h2.092a2.25 2.25 0 001.872-1.002l.164-.246A2.25 2.25 0 0116.954 9h4.636M2.41 9a2.25 2.25 0 00-.16.832V12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 12V9.832c0-.287-.055-.57-.16-.832M2.41 9a2.25 2.25 0 01.382-.632l3.285-3.832a2.25 2.25 0 011.708-.786h8.43c.657 0 1.281.287 1.709.786l3.284 3.832c.163.19.291.404.382.632M4.5 20.25h15A2.25 2.25 0 0021.75 18v-2.625c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125V18a2.25 2.25 0 002.25 2.25z"
                                />
                              </svg>
                              <span className="group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-sm text-gray-100 rounded-md absolute left-1/2 -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto cursor-pointer ">
                                {"View"}
                              </span>
                            </div>
                          </Link>

                          <div className="group flex relative">
                            <span
                              className="group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-sm text-gray-100 rounded-md absolute left-1/2 
    -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto cursor-pointer "
                            >
                              {copied ? "Copied!!" : "Copy Link"}
                            </span>
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(
                                  `${
                                    import.meta.env.VITE_BASE_URL
                                  }/${subjectId}/questionnaires/questionsets/${
                                    q.id
                                  }`
                                );
                                setCopied(true);
                                setTimeout(() => {
                                  setCopied(false);
                                }, 2000);
                              }}
                            >
                              <div className="flex flex-col justify-center items-center border-2 border-primary-grey rounded-full h-10 w-10 text-primary-grey hover:border-primary-green hover:text-primary-green">
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
                                    d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
                                  />
                                </svg>
                              </div>
                            </button>
                          </div>

                          {subject && subject?.user?.email ? (
                            <div className="group flex relative">
                              <span
                                className="group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-sm text-gray-100 rounded-md absolute left-1/2 
    -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto cursor-pointer "
                              >
                                {mailSent ? "mailing" : "Mail this"}
                              </span>

                              <button
                                onClick={() => {
                                  if (
                                    subject?.user?.email &&
                                    subject?.user?.firstName
                                  ) {
                                    sendQuestionnaire(
                                      subject?.user?.email,
                                      `${subject?.user?.firstName} ${subject?.users_by_pk?.last_name}`,
                                      `${
                                        import.meta.env.VITE_BASE_URL
                                      }/${subjectId}/questionnaires/questionsets/${
                                        q.id
                                      }`
                                    );
                                  }
                                }}
                              >
                                <div className="flex flex-col justify-center items-center border-2 border-primary-grey rounded-full h-10 w-10 text-primary-grey hover:border-primary-green hover:text-primary-green">
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
                                      d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                                    />
                                  </svg>
                                </div>
                              </button>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
