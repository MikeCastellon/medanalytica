import React, {
  ChangeEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { DisplayWrapper } from "../Common/DisplayWrapper";
import {
  Order_By,
  useGetAllHeartDataForOwnerQuery,
  useGetBrainGaugeDetailsQuery,
  useGetDescriptionByKeyQuery,
  useGetUserMetaDataQuery,
  useUpsertUserMetaDataMutation,
} from "../generated/graphql";
import { CollapsiblePanel } from "../Common/CollapsiblePanel";
import { useDescriptionModal } from "../Hooks/DescriptionModal";
import { divide, set, update } from "lodash";
import { Modal } from "../Common/Modals/Modal";
import ReactToPrint from "react-to-print";
import { Print } from "../Common/icons/Print";
import { useMatch } from "@tanstack/react-location";
import { LocationGenerics } from "../Router/CustomRouter";
import { useUserContext } from "../Hooks/UserContext";
import { differenceInYears, format } from "date-fns";
import { useBrainGaugeHook } from "../Hooks/BrainGaugeHook";
import { Field, Form, Formik } from "formik";
import { bg, ca } from "date-fns/locale";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ProgressBar from "../Common/graphs/ProgessBar";
import { Loader } from "../Common/Loader";
import { Dashboard } from "../Dashboard/Dashboard";
import DashboardMenu from "../Dashboard/DashboardMenu";
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

const BrainGauge = () => {
  const componentRef = useRef(null);
  const {
    isAuthenticated,
    selectedSubject,
    isLoading: brainGLoading,
    login,
    logout,
    refetchData: getData,
    data: bgData,
    error: bgError,
    selectSubjectByNumber,
    state,
  } = useBrainGaugeHook();
  const { setOpen } = useDescriptionModal();
  const [beforePrint, setBeforePrint] = useState(false);
  const [brainData, setBrainData] = useState({
    rt1: "",
    rtv1: "",
    toj: "",
    dd: "",
    rt2: "",
    rtv2: "",
    se_ad: "",
    si_ad: "",
  });

  const {
    params: { userId, subjectId },
  } = useMatch<LocationGenerics>();

  const { data, isLoading } = useGetDescriptionByKeyQuery(dataSource, {
    key: "brain-gauge-interp",
  });

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
  const { data: userMetadata } = useGetUserMetaDataQuery(
    dataSource,
    {
      id: subjectId,
    },
    {
      enabled: !!subjectId,
    }
  );
  useEffect(() => {
    if (
      userMetadata &&
      userMetadata.user_metadata_by_pk?.metadata?.brain_gauge?._id &&
      state.status === "subject_selection"
    ) {
      const bgmetadata =
        userMetadata.user_metadata_by_pk?.metadata?.brain_gauge;
      selectSubjectByNumber(bgmetadata?.number);
    }
  }, [subjectId, userMetadata, state]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBrainData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const { data: brainParamData, isLoading: brainParamLoading } =
    useGetBrainGaugeDetailsQuery(dataSource);

  const { mutate: updateBrainGauge } =
    useUpsertUserMetaDataMutation(dataSource);

  const [selectedOption, setSelectedOption] = useState("Accuracy");
  const [selectedBGData, setSelectedBGData] = useState<any>(null);

  // Add click handler function
  const handleBGClick = (data1: any) => {
    if (data1 && data1.activePayload && data1.activePayload[0]) {
      const clickedData = data1.activePayload[0].payload;
      const originalDatapoint = bgData?.find(
        (item: any) => item._id === clickedData.id
      );
      setSelectedBGData(originalDatapoint);
    }
  };
  if (bgData && !selectedBGData) {
    setSelectedBGData(bgData[0]);
  }

  const options = [
    // "Overall",
    "Accuracy",
    "Fatigue",
    "Focus",
    "Plasticity",
    "Speed",
    "TOJ",
    "Time Perception",
  ];

  const handleBGChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const graphData = useMemo(() => {
    if (!selectedOption) return [];

    return bgData
      ?.map((item: any) => {
        const category = item.categories.find(
          (cat: any) => cat.displayName === selectedOption
        );

        return {
          id: item._id,
          timestamp: new Date(item.endTime).getTime(), // Store actual timestamp
          date: new Date(item.endTime), // Store Date object
          displayDate: new Date(item.endTime).toLocaleString(), // Formatted date for display
          score: category?.score || null,
          components: category?.components,
          color: category?.color,
          empty: category?.empty || false,
        };
      })
      .sort((a: any, b: any) => a.timestamp - b.timestamp); // Sort by timestamp
  }, [bgData, selectedOption]);

  // Custom tick formatter for x-axis
  const formatXAxis = (timestamp: string) => {
    const date = new Date(timestamp);
    return `${format(date, "MMM dd")}`;
  };

  const selectedCategory = selectedBGData?.categories.find(
    (cat: any) => cat.displayName === selectedOption
  );

  useMemo(() => {
    if (!selectedBGData) return;
    const sortedArray = selectedBGData?.subMetrics?.sort((a: any, b: any) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (dateA < dateB) return -1;
      if (dateA > dateB) return 1;
      return 0;
    });
    const reactionTime = sortedArray?.filter(
      (item: any) => item.short === "rt"
    );
    set;
    const reactionTimeV = sortedArray?.filter(
      (item: any) => item.short === "rtvars"
    );
    const toj = sortedArray?.find((item: any) => item.short === "toj");
    const dur = sortedArray?.find((item: any) => item.short === "dur");
    const seqamp = sortedArray?.find((item: any) => item.short === "seqamp");
    const simultamp = sortedArray?.find(
      (item: any) => item.short === "simultamp"
    );
    setBrainData((prevState) => ({
      ...prevState,
      rt1: reactionTime[0]?.raw,
      rt2: reactionTime[1]?.raw,
      rtv1: reactionTimeV[0]?.raw,
      rtv2: reactionTimeV[1]?.raw,
      toj: toj?.raw,
      dd: dur?.raw,
      se_ad: seqamp?.raw,
      si_ad: simultamp?.raw,
    }));
  }, [selectedBGData]);

  useEffect(() => {
    const bgMetadata = userMetadata?.user_metadata_by_pk?.metadata?.brain_gauge;
    if (userMetadata && !bgMetadata) {
      updateBrainGauge({
        id: subjectId,
        metadata: {
          ...userMetadata?.user_metadata_by_pk?.metadata,
          brain_gauge: selectedSubject,
        },
      });
    }
    if (
      userMetadata &&
      bgMetadata &&
      bgMetadata?.number !== selectedSubject?.number
    ) {
      updateBrainGauge({
        id: subjectId,
        metadata: {
          ...userMetadata?.user_metadata_by_pk?.metadata,
          brain_gauge: selectedSubject,
        },
      });
    }
  }, [selectedSubject]);

  return (
    <div className="flex flex-row ml-[84px]">
      <div className="w-[293px]">
        <SubjectContextBox userId={userId} subjectId={subjectId} />
      </div>

      <div className="flex-1">

      <div className="flex ">
        <div className="flex-1"></div>
        <div className="flex flex-row items-center gap-1">
          <ReactToPrint
            content={() => componentRef.current}
            documentTitle={"Brain Gauge Interpretation"}
            removeAfterPrint
            onBeforeGetContent={() => {
              setBeforePrint(true);
            }}
            onAfterPrint={() => {
              setBeforePrint(false);
            }}
            trigger={() => (
              <button>
                <Print />
              </button>
            )}
          />
        </div>
      </div>
      <div ref={componentRef}>
        {beforePrint && (
          <div
            className="flex flex-col justify-center items-start w-full  mt-2"
            style={{
              width: "210",
            }}
          >
            <div className="text-charcoal text-md">
              {subject?.users_by_pk?.first_name}{" "}
              {subject?.users_by_pk?.last_name}
            </div>
            {subject && (
              <div className="text-charcoal text-md">
                Age:{" "}
                {differenceInYears(
                  new Date(),
                  new Date(subject.users_by_pk?.birth_date)
                )}{" "}
              </div>
            )}
            {subject && subject.users_by_pk && subject.users_by_pk.data && (
              <div className="text-charcoal text-md">
                {" "}
                Gender:
                <span className=" capitalize ">
                  {" " + JSON.parse(subject.users_by_pk?.data).data.gender}
                </span>
              </div>
            )}
          </div>
        )}
        {bgError ? (
          <div className="bg-red-500/20 border-2 border-red-500 rounded-md px-2">
            <div>Error: {bgError}</div>
          </div>
        ) : null}

        {brainGLoading ? <Loader /> : null}

        {!isAuthenticated ? (
          <div>
            <div className="text-2xl mt-4">Login to Brain Gauge</div>
            <div className="mt-4">
              You can log in to Brain Gauge to view the subject data here
            </div>
            <div className="w-full md:w-96">
              <Formik
                initialValues={{
                  username: "",
                  password: "",
                }}
                onSubmit={async (values) => {
                  const loggingIn = await login(
                    values.username,
                    values.password
                  );
                }}
              >
                <Form>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col">
                      <label htmlFor="username">Username</label>
                      <Field
                        type="text"
                        name="username"
                        id="username"
                        className="p-2 border-2 border-black rounded-md"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="password">Password</label>
                      <Field
                        type="password"
                        name="password"
                        id="password"
                        className="p-2 border-2 border-black rounded-md"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-charcoal text-white p-2 rounded-md"
                    >
                      Login
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        ) : null}
        {isAuthenticated && !bgData && state.status !== "loading_subjects" ? (
          <div>
            <div className="text-2xl mt-4">Enter Subject ID</div>
            <div className="mt-4">
              You can enter a subject ID to view the Brain Gauge data
            </div>
            <div className="w-full md:w-96">
              <Formik
                initialValues={{
                  subjectId:
                    userMetadata?.user_metadata_by_pk?.metadata?.brain_gauge
                      ?.number || "",
                }}
                onSubmit={async (values) => {
                  selectSubjectByNumber(values.subjectId);
                }}
              >
                <Form>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col">
                      <label htmlFor="subjectId">Subject ID</label>
                      <Field
                        type="text"
                        name="subjectId"
                        id="subjectId"
                        placeholder="Enter Subject ID"
                        className="p-2 border-2 border-black rounded-md"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-charcoal text-white p-2 rounded-md"
                    >
                      Select
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        ) : null}
        {bgData ? (
          <div>
            <div className="flex flex-row justify-start gap-4">
              <button
                className="bg-charcoal px-2 py-1 rounded-md text-white hover:bg-gray-700 "
                onClick={async () => getData()}
              >
                Refresh
              </button>
              <button
                className="bg-charcoal px-2 py-1 rounded-md text-white hover:bg-gray-700 "
                onClick={async () => logout()}
              >
                Logout
              </button>
              <button
                className="bg-charcoal px-2 py-1 rounded-md text-white hover:bg-gray-700 "
                onClick={async () => selectSubjectByNumber("")}
              >
                Edit
              </button>
            </div>
            <div className="mt-4">
              <span className="text-lg font-bold">Subject ID: </span>{" "}
              {selectedSubject?.number}
            </div>
            <div className="max-w-sm p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category:
              </label>

              <select
                value={selectedOption}
                onChange={handleBGChange}
                className="w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Choose an option</option>
                {options.map((option, i) => (
                  <option key={i} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              {selectedOption && (
                <div className="mt-4 border rounded-lg p-4 bg-white">
                  <h3 className="text-lg font-medium mb-4">
                    {selectedOption} Scores Over Time
                  </h3>
                  {graphData?.length === 0 ? (
                    <div>No data available</div>
                  ) : null}
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={graphData}
                        onClick={handleBGClick}
                        margin={{
                          top: 15,
                          right: 30,
                          left: 20,
                          bottom: 35,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="timestamp"
                          type="number"
                          domain={["dataMin", "dataMax"]}
                          scale="time"
                          tickFormatter={formatXAxis}
                          tick={{ fontSize: 12 }}
                          angle={-45}
                          textAnchor="end"
                        />
                        <YAxis
                          domain={[0, 100]}
                          tick={{ fontSize: 12 }}
                          label={{
                            value: "Score",
                            angle: -90,
                            position: "insideLeft",
                            style: { textAnchor: "middle" },
                          }}
                        />
                        {/* <Tooltip content={<CustomTooltip />} /> */}
                        {/* <Legend /> */}
                        <Line
                          type="monotone"
                          dataKey="score"
                          stroke="black"
                          name="Overall Score"
                          strokeWidth={1}
                          dot={(props) => {
                            return (
                              <circle
                                cx={props.cx}
                                cy={props.cy}
                                r={5}
                                fill={props?.payload?.color}
                                stroke={
                                  props?.payload?.empty === true
                                    ? "white"
                                    : "black"
                                }
                                strokeWidth={2}
                                style={{ cursor: "pointer" }}
                              />
                            );
                          }}
                          activeDot={{ stroke: "red", strokeWidth: 2, r: 10 }}
                          style={{ cursor: "pointer" }}
                          connectNulls={true}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </div>
            {selectedBGData && (
              <div className="grid grid-cols-1 xl:grid-cols-2 mt-4 gap-4">
                <div className="border rounded-md p-4 flex flex-col">
                  {selectedBGData?.categories?.map(
                    (category: any, i: number) => {
                      if (category.empty) return null;

                      return (
                        <BgProgressBar
                          key={i}
                          title={category.displayName}
                          value={category.score}
                          color={category.color}
                        />
                      );
                    }
                  )}
                </div>
                <div className="border rounded-md p-4">
                  <div className="text-center text-xl mb-2">
                    {format(new Date(selectedCategory?.date), "dd MMM yy")}
                  </div>
                  <div className="text-center text-lg mb-2">
                    {selectedOption}
                  </div>
                  <div className="flex flex-row justify-between font-bold gap-4 mb-4">
                    <div className="flex-1">Protocol</div>
                    <div>Score</div>
                    <div>Rank</div>
                  </div>
                  {selectedCategory.components.map(
                    (component: any, i: number) => {
                      const lineItems = selectedBGData?.subMetrics?.filter(
                        (item: any) => {
                          if (component?.short === "rt__rt") {
                            return item?.short === "rt";
                          }
                          if (item?.short === "rtvars") {
                            return item?.short === component.short;
                          }
                          return item?.short?.includes(component.short);
                        }
                      );
                      if (lineItems.length === 0) return null;
                      return lineItems.map((lineItem: any, i: number) => {
                        return (
                          <div
                            key={i}
                            className="flex flex-row justify-between border-b border-b-black gap-4 py-2"
                          >
                            <div className="flex-1">{lineItem?.name}</div>
                            <div>{lineItem?.raw}</div>
                            <div>{lineItem?.rank?.year}%</div>
                          </div>
                        );
                      });
                    }
                  )}
                </div>
              </div>
            )}
          </div>
        ) : null}

        <div className="text-2xl mt-4">Brain Gauge Interpretation</div>

        <div className="border-2 border-secondary-grey p-4 rounded-md mb-24 mt-16">
          <div className="text-xl">Brain Gauge Parameters</div>
          {isLoading ? (
            <div className="flex flex-row justify-center h-52 items-center">
              <svg
                aria-hidden="true"
                className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-charcoal"
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
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 my-8">
              {brainParamData?.bg_parameters.map((p) => {
                return (
                  <div
                    key={p.name}
                    className="py-8 cursor-pointer shadow-md rounded-md"
                    onClick={() =>
                      setOpen(
                        <div
                          className={` flex flex-col w-full md:w-1/2   min-h-40 bg-white shadow-md rounded-lg  overflow-y-auto p-3 z-50`}
                        >
                          <div className="text-charcoal text-lg border-desaturated-grey border-b-[1px] mb-3 uppercase">
                            {p.name}
                          </div>

                          <div>
                            <div
                              className="text-sm text-black pb-4"
                              dangerouslySetInnerHTML={{
                                __html:
                                  p?.explanation ??
                                  "Sorry could not get te decription",
                              }}
                            ></div>
                          </div>
                        </div>
                      )
                    }
                  >
                    <div className="text-center">{p.name}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div>
          {isLoading ? (
            <div className="flex flex-row justify-center h-52 items-center">
              <svg
                aria-hidden="true"
                className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-charcoal"
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
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <div>
              <div
                className="text-sm pb-4"
                dangerouslySetInnerHTML={{
                  __html:
                    data?.descriptions[0]?.hq_professional ??
                    "Sorry could not get te decription",
                }}
              ></div>
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-8">
          <div className="flex flex-col p-2 shadow-md rounded-md">
            <div className="text-lg font-bold">Reaction Time #1</div>
            <input
              value={brainData.rt1}
              onChange={handleChange}
              type="number"
              name="rt1"
              id="rt1"
              className=" p-2 text-center font-bold text-lg border-2 border-black rounded-md "
            />
            <div className="text-md my-2">
              This is the same as the speed of reaction time and your brain’s
              ability to react to changes in your environment. The Brain Gauge
              measures how fast you can respond to tactile stimulus. The average
              is 200 ms and the higher the number the worse the reaction time.
            </div>
          </div>
          <div className="flex flex-col p-2  shadow-md rounded-md">
            <div className="text-lg font-bold">
              Reaction Time Variability #1
            </div>
            <input
              value={brainData.rtv1}
              onChange={handleChange}
              type="number"
              name="rtv1"
              id="rtv1"
              className=" p-2 text-center font-bold text-lg border-2 border-black rounded-md "
            />
            <div className="text-md my-2">
              This is also a measurement of reaction time and is connected to
              focus. If you can answer every reaction time the same way, your
              reaction time variability remains low indicating a good score.
              With ADD there is a high Reaction Time Variability resulting in a
              low focus score. Reaction time is used to calculate fatigue,
              focus, speed. A good score is 5-15 ms and 20 ms is a medium score
              and over 30 ms is a poor score. A high performance person might
              show up with a score of 5 ms
            </div>
          </div>
          <div className="flex flex-col p-2  shadow-md rounded-md">
            <div className="text-lg font-bold">TOJ</div>
            <input
              value={brainData.toj}
              onChange={handleChange}
              type="number"
              name="toj"
              id="toj"
              className=" p-2 text-center font-bold text-lg border-2 border-black rounded-md "
            />
            <div className="text-md my-2">
              With Temporal Order Judgement scores, lower is better. With above
              30 ms you will see the percentage on the Brain Gauge bar graph
              start to decline. A normal reading is 20-30 ms and in most
              children it is around 70 ms. With ADD it can be around 110 ms and
              if over 120 ms or higher there is no concept of order.
            </div>
          </div>
          <div className="flex flex-col p-2  shadow-md rounded-md">
            <div className="text-lg font-bold">Duration Discrimination</div>
            <input
              value={brainData.dd}
              onChange={handleChange}
              type="number"
              name="dd"
              id="dd"
              className=" p-2 text-center font-bold text-lg border-2 border-black rounded-md "
            />
            <div className="text-md my-2">
              50 ms is optimal, 120-150ms is a poor reading and 250 is the worse
              you can get. This reading is about the cerebral cortex and the
              Parietal/Cerebellum. Someone with Pre-Parkinson or Parkinson would
              have a poor score here.50 ms is optimal, 120-150ms is a poor
              reading and 250 is the worse you can get. This reading is about
              the cerebral cortex and the Parietal/Cerebellum. Someone with
              Pre-Parkinson or Parkinson would have a poor score here.
            </div>
          </div>
          <div className="flex flex-col p-2  shadow-md rounded-md">
            <div className="text-lg font-bold">Reaction Time #2</div>
            <input
              value={brainData.rt2}
              onChange={handleChange}
              type="number"
              name="rt2"
              id="rt2"
              className=" p-2 text-center font-bold text-lg border-2 border-black rounded-md "
            />
            <div className="text-md my-2">
              This is run again and compared to the 1st reading and if much
              slower indicates fatigue.
            </div>
          </div>
          <div className="flex flex-col p-2  shadow-md rounded-md">
            <div className="text-lg font-bold">
              Reaction Time Variability #2
            </div>
            <input
              value={brainData.rtv2}
              onChange={handleChange}
              type="number"
              name="rtv2"
              id="rtv2"
              className=" p-2 text-center font-bold text-lg border-2 border-black rounded-md "
            />
            <div className="text-md my-2">
              This is run again to compare to the 1st reading and if much slower
              indicates fatigue.
            </div>
          </div>
          <div className="flex flex-col p-2  shadow-md rounded-md">
            <div className="text-lg font-bold">
              Sequential Amplitude Discrimination
            </div>
            <input
              value={brainData.se_ad}
              onChange={handleChange}
              type="number"
              name="se_ad"
              id="se_ad"
              className=" p-2 text-center font-bold text-lg border-2 border-black rounded-md "
            />
            <div className="text-md my-2">
              When higher than Simultaneous by 20 to 30% possible Dysglycemia
              (insulin resistance)When higher than simultaneous Discrimination
              by 20 to 30% there can be possible Dysglycemia. It has been
              observed on HQP that with a high insulin score and a high
              inflammatory index with a high cortisol there may be a possibility
              of Dysglycemia.
            </div>
          </div>
          <div className="flex flex-col p-2  shadow-md rounded-md">
            <div className="text-lg font-bold">
              Simultaneous Amplitude Discrimination
            </div>
            <input
              value={brainData.si_ad}
              onChange={handleChange}
              type="number"
              name="si_ad"
              id="si_ad"
              className=" p-2 text-center font-bold text-lg border-2 border-black rounded-md "
            />
            <div className="text-md my-2">
              Should not be higher than 20% to 30% higher than sequential and
              can be indicative of Gaba not attaching to receptor creating low
              Gaba. When Simultaneous A mplitude is significantly worse than
              Sequential, plasticity will be affected. A perfect score is 10-15
              %
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default BrainGauge;

type BgProgressBarProps = {
  title: string;
  value: number;
  color: string;
};
export const BgProgressBar = ({
  title: passedTitle,
  value,
  color,
}: BgProgressBarProps) => {
  let title = passedTitle;
  if (title === "corticalmetric") {
    title = "Overall";
  }
  return (
    <div className="flex flex-col">
      <div>{title}</div>
      <ProgressBar value={value} maxValue={100} color={color} />
    </div>
  );
};
