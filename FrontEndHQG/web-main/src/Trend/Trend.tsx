import { useMatch } from "@tanstack/react-location";
import {
  Legend,
  Line,
  LineChart,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Order_By,
  useGetSubjectDetailsQuery,
  useGetSubjectHeartDataRangeQuery,
} from "../generated/graphql";
import { useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import { Print } from "../Common/icons/Print";
import {
  differenceInYears,
  format,
  isAfter,
  isBefore,
  isValid,
  parseISO,
  subYears,
} from "date-fns";
import html2canvas from "html2canvas";
import { getSelectItemByPath } from "./TrendUtils";
import { debounce } from "lodash";

const dataSource = {
  endpoint: import.meta.env.VITE_GRAPHQL_URL,
  fetchParams: {
    headers: {
      "X-Hasura-Admin-Secret": import.meta.env.VITE_GRAPHQL_HEADER,
    },
  },
};

function allContainWord(arr: string[], word: string) {
  return arr.every((str) => str.includes(word));
}

type ValidDateType = {
  valid: boolean;
  message: string;
};

const validateDateRange = (
  start: string,
  end: string,
  notBeforeDate: Date = new Date("2019-01-01"),
  today: Date = new Date()
): ValidDateType => {
  const startISO = parseISO(start);
  const endISO = parseISO(end);

  if (!isValid(startISO) || !isValid(endISO)) {
    return {
      valid: false,
      message: "One or both dates are invalid.",
    };
  }

  if (isBefore(startISO, notBeforeDate)) {
    return {
      valid: false,
      message: `Start date is before the ${formatDate(notBeforeDate)}.`,
    };
  }

  if (isAfter(endISO, today)) {
    return {
      valid: false,
      message: "End date is in the future.",
    };
  }

  if (isAfter(startISO, endISO)) {
    return {
      valid: false,
      message: "Start date is after the end date.",
    };
  }

  return {
    valid: true,
    message: "Date range is valid.",
  };
};

const generateColors = (numColors: number) => {
  const colors = [];
  for (let i = 0; i < numColors; i++) {
    const hue = Math.round((360 / numColors) * i);
    const saturation = 70; // Adjust saturation to your preference
    const lightness = 50; // Adjust lightness to your preference
    colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
  }
  return colors;
};

const formatDate = (date: Date, locale: Intl.LocalesArgument = "en-US") => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  return date.toLocaleDateString(locale, options).replace(",", "");
};

type TransformationTypes = {
  [key: string]: (value: number) => number;
};

const transformations: TransformationTypes = {};
const registerTransformation = (
  key: string,
  transformFn: (value: number) => number
) => {
  transformations[key] = transformFn;
};

registerTransformation("amo", (value: number) => value * 100);
registerTransformation("total_power", (value: number) =>
  Number(value.toFixed())
);

const transformObject = (obj: any) => {
  const transformRecursively = (currentObj: any): any => {
    if (Array.isArray(currentObj)) {
      return currentObj.map(transformRecursively);
    } else if (typeof currentObj === "object" && currentObj !== null) {
      return Object.keys(currentObj).reduce((acc, key) => {
        const value = currentObj[key];
        const transformedValue = transformations[key]
          ? transformations[key](value)
          : transformRecursively(value);
        return {
          ...acc,
          [key]: transformedValue,
        };
      }, {});
    } else {
      return currentObj;
    }
  };

  return transformRecursively(obj);
};

const filterByTimeRange = (
  data: any,
  startTime: string = "00:00",
  endTime: string = "23:59"
) => {
  // Convert time strings to minutes since start of the day
  const getTimeInMinutes = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const startTimeInMinutes = getTimeInMinutes(startTime);
  const endTimeInMinutes = getTimeInMinutes(endTime);

  return (
    data?.filter((item: any) => {
      const date = new Date(item.created_on);
      const itemTimeInMinutes = date.getUTCHours() * 60 + date.getUTCMinutes();

      return (
        itemTimeInMinutes >= startTimeInMinutes &&
        itemTimeInMinutes <= endTimeInMinutes
      );
    }) || []
  );
};

type TrendProps = {
  selection: string[];
};

export const Trend = (props: TrendProps) => {
  // Get today's date
  const today = new Date();
  // Subtract one year from today's date
  const oneYearAgo = subYears(today, 1);

  // Format the dates as YYYY-MM-DD
  const formattedToday = format(today, "yyyy-MM-dd");
  const formattedOneYearAgo = format(oneYearAgo, "yyyy-MM-dd");
  const {
    params: { subjectId },
  } = useMatch();
  const [start_date, setStartDate] = useState(formattedOneYearAgo);
  const [end_date, setEndDate] = useState(formattedToday);
  const [searchStartDate, setSearchStartDate] = useState(formattedOneYearAgo);
  const [searchEndDate, setSearchEndDate] = useState(formattedToday);
  const [dateRageMessage, setDateRangeMessage] = useState<string | null>(null);
  const [startTime, setStartTime] = useState("00:00");
  const [endTime, setEndTime] = useState("23:59");

  const componentRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [chartImage, setChartImage] = useState<string | null>(null);
  const chartRef = useRef(null);

  const handleStartDateChange = (e: any) => {
    console.log("Target: ", e.target.value);
    const valdidateRange = validateDateRange(e.target.value, end_date);
    valdidateRange ? setDateRangeMessage(valdidateRange.message) : null;

    if (valdidateRange.valid) {
      setSearchStartDate(e.target.value);
      debounce(refetchData, 500);
      setDateRangeMessage(null);
    }
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e: any) => {
    const valdidateRange = validateDateRange(start_date, e.target.value);
    console.log(valdidateRange.message);
    setDateRangeMessage(valdidateRange.message);
    if (valdidateRange.valid) {
      setSearchEndDate(e.target.value);
      debounce(refetchData, 500);
      setDateRangeMessage(null);
    }
    setEndDate(e.target.value);
  };

  const handleStartTimeChange = (e: any) => {
    setStartTime(e.target.value);
  };

  const handleEndTimeChange = (e: any) => {
    setEndTime(e.target.value);
  };

  const {
    data,
    isError,
    isLoading: dataLoading,
    refetch: refetchData,
  } = useGetSubjectHeartDataRangeQuery(dataSource, {
    id: subjectId,
    start_date: searchStartDate,
    end_date: searchEndDate,
    order_by: Order_By.Desc,
  });

  const { data: userDetails, isLoading: subjectLoading } =
    useGetSubjectDetailsQuery(dataSource, {
      id: subjectId,
      _eq: subjectId,
    });

  const timeFilterred = filterByTimeRange(data?.heart_data, startTime, endTime);

  const formattedData = timeFilterred
    .map((d: any) => {
      return {
        ...d,
        data: transformObject(d.data),
        created_on: formatDate(new Date(d.created_on)),
      };
    })
    .reverse();
  const chartColours = generateColors(props.selection.length);

  return (
    <div>
      <div className="ml-[380px]">
        <div className=" mt-8 "></div>
        <div className="flex mr-8">
          <div className="flex-1"></div>
          <div className="flex flex-row items-center gap-1">
            <ReactToPrint
              content={() => componentRef.current}
              onBeforeGetContent={() => {
                return new Promise((resolve) => {
                  if (chartRef.current) {
                    html2canvas(chartRef.current).then((canvas) => {
                      const image = canvas.toDataURL("image/png");
                      setChartImage(image);
                      setIsReady(true);
                    });
                  }
                  setTimeout(resolve, 400);
                });
              }}
              onBeforePrint={() =>
                new Promise<void>((resolve) => {
                  const checkIfReady = () => {
                    if (isReady) {
                      resolve();
                    } else {
                      setTimeout(checkIfReady, 100);
                    }
                  };
                  checkIfReady();
                })
              }
              documentTitle={"HeartQuest-Trend"}
              removeAfterPrint={false}
              trigger={() => (
                <button>
                  <Print />
                </button>
              )}
            />
          </div>
        </div>

        <div className="mt-4 ml-4 text-2xl">Trend Recordings</div>
        <div className="mt-4 ml-4">
          Select which value you want to trend from the side bar and set the
          time <br />
          frame for the recording that you want to include above the graph
        </div>
        <div className="flex flex-row justify-between items-center px-4 mt-4">
          <div className="flex flex-col">
            <label htmlFor="start_date">Start Date</label>
            <input
              className="border-2 border-gray-300 p-1 rounded-md"
              type="date"
              id="start_date"
              name="start_date"
              value={start_date}
              onChange={handleStartDateChange}
            />
            {dateRageMessage ? (
              <div className="text-red-500">{dateRageMessage}</div>
            ) : null}
          </div>
          <div className="flex flex-col">
            <label htmlFor="end_date">End Date</label>
            <input
              className="border-2 border-gray-300 p-1 rounded-md"
              type="date"
              id="end_date"
              name="end_date"
              value={end_date}
              onChange={handleEndDateChange}
            />
          </div>
        </div>
        <div className="ml-4 my-4 flex flex-col gap-3">
          <div className="w-44 flex flex-row justify-between items-center">
            <label htmlFor="appt">Start time:</label>
            <input
              className="border-2 border-gray-300 p-1 rounded-md"
              type="time"
              id="appt"
              name="appt"
              value={startTime}
              onChange={handleStartTimeChange}
            ></input>
          </div>
          <div className="w-44 flex flex-row justify-between items-center">
            <label htmlFor="appt">End time:</label>
            <input
              className="border-2 border-gray-300 p-1 rounded-md"
              type="time"
              id="appt"
              name="appt"
              value={endTime}
              onChange={handleEndTimeChange}
            ></input>
          </div>
        </div>
        <div className="ml-4 my-2">
          Datapoint found: {formattedData?.length}
        </div>
        <div className="mt-8">
          <div className={`flex flex-col m-5`}>
            {dataLoading ? (
              <div>Loading...</div>
            ) : !isError ? (
              <div
                ref={chartRef}
                style={{ width: "100%" }}
                className="relative"
              >
                <ResponsiveContainer width="100%" height={530}>
                  <LineChart
                    data={formattedData}
                    margin={{ top: 5, bottom: 5 }}
                  >
                    <XAxis dataKey="created_on" />

                    {props.selection.length &&
                    allContainWord(props.selection, "minerals") ? (
                      <>
                        <YAxis domain={[0, 10]} />
                        <ReferenceArea y1={4} y2={6} fillOpacity={0.2} />
                        <ReferenceLine
                          y={4}
                          stroke="blue"
                          label="Min - 4"
                          strokeDasharray="3 3"
                        />
                        <ReferenceLine
                          y={6}
                          stroke="blue"
                          label="Max - 6"
                          strokeDasharray="3 3"
                        />
                      </>
                    ) : (
                      <YAxis />
                    )}
                    {props.selection.length &&
                    allContainWord(props.selection, "hormones") ? (
                      <>
                        <YAxis domain={[0, 10]} />
                        <ReferenceArea y1={4} y2={6} fillOpacity={0.2} />
                        <ReferenceLine
                          y={4}
                          stroke="blue"
                          label="Min - 4"
                          strokeDasharray="3 3"
                        />
                        <ReferenceLine
                          y={6}
                          stroke="blue"
                          label="Max - 6"
                          strokeDasharray="3 3"
                        />
                      </>
                    ) : (
                      <YAxis />
                    )}
                    {props.selection.length &&
                    allContainWord(props.selection, "bnt") ? (
                      <>
                        <YAxis domain={[0, 5]} allowDataOverflow={false} />
                        <ReferenceArea y1={2} y2={4} fillOpacity={0.2} />
                        <ReferenceLine
                          y={2}
                          stroke="blue"
                          label="Min - 2"
                          strokeDasharray="3 3"
                        />
                        <ReferenceLine
                          y={4}
                          stroke="blue"
                          label="Max - 4"
                          strokeDasharray="3 3"
                        />
                      </>
                    ) : (
                      <YAxis />
                    )}
                    {props.selection.length &&
                    allContainWord(props.selection, "total_power") ? (
                      <>
                        {/* <YAxis domain={[0, 5]} allowDataOverflow={false} /> */}
                        <ReferenceArea y1={1500} y2={3500} fillOpacity={0.2} />
                        <ReferenceLine
                          y={1500}
                          stroke="blue"
                          label="Min - 1500"
                          strokeDasharray="3 3"
                        />
                        <ReferenceLine
                          y={3500}
                          stroke="blue"
                          label="Max - 3500"
                          strokeDasharray="3 3"
                        />
                      </>
                    ) : (
                      <YAxis />
                    )}
                    {props.selection.length &&
                    allContainWord(props.selection, "stressIndex") ? (
                      <>
                        <YAxis domain={[0, 500]} allowDataOverflow={false} />
                        <ReferenceArea y1={10} y2={100} fillOpacity={0.2} />
                        <ReferenceLine
                          y={10}
                          stroke="blue"
                          label="Min - 10"
                          strokeDasharray="3 3"
                        />
                        <ReferenceLine
                          y={100}
                          stroke="blue"
                          label="Max - 100"
                          strokeDasharray="3 3"
                        />
                      </>
                    ) : (
                      <YAxis />
                    )}
                    {props.selection.length &&
                    allContainWord(props.selection, "sdnn") ? (
                      <>
                        {/* <YAxis domain={[0, 5]} allowDataOverflow={false} /> */}
                        <ReferenceArea y1={50} y2={70} fillOpacity={0.2} />
                        <ReferenceLine
                          y={50}
                          stroke="blue"
                          label="Min - 50"
                          strokeDasharray="3 3"
                        />
                        <ReferenceLine
                          y={70}
                          stroke="blue"
                          label="Max - 70"
                          strokeDasharray="3 3"
                        />
                      </>
                    ) : (
                      <YAxis />
                    )}
                    {props.selection.length &&
                    allContainWord(props.selection, "bpm") ? (
                      <>
                        <YAxis
                          domain={[30, (dataMax: number) => dataMax + 20]}
                          allowDataOverflow={true}
                        />
                        <ReferenceArea y1={60} y2={84} fillOpacity={0.2} />
                        <ReferenceLine
                          y={60}
                          stroke="blue"
                          label="Min - 60"
                          strokeDasharray="3 3"
                        />
                        <ReferenceLine
                          y={84}
                          stroke="blue"
                          label="Max - 84"
                          strokeDasharray="3 3"
                        />
                      </>
                    ) : (
                      <YAxis />
                    )}
                    {props.selection.map((s, i) => {
                      return (
                        <Line
                          isAnimationActive={false}
                          key={s}
                          type="monotone"
                          dataKey={`${s}`}
                          stroke={chartColours[i]}
                        />
                      );
                    })}
                    <Tooltip
                      formatter={(value: number, name: string) => {
                        return [
                          value?.toFixed(1) || value,
                          getSelectItemByPath(name)?.label || name,
                        ];
                      }}
                    />
                    <Legend
                      formatter={(value) => {
                        let newLabel = getSelectItemByPath(value)?.label;
                        let values = value.split(".");
                        return newLabel;
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
                {props.selection.length === 0 &&
                formattedData.length !== 0 &&
                !dateRageMessage ? (
                  <div className="bg-light-grey opacity-50 absolute top-0 left-0 right-0 bottom-0 flex flex-row justify-center items-center">
                    <div className="text-lg text-center">
                      Select data to graph in the Left Menu
                    </div>
                  </div>
                ) : null}
                {dateRageMessage &&
                props.selection.length !== 0 &&
                formattedData.length !== 0 ? (
                  <div className="bg-light-grey opacity-50 absolute top-0 left-0 right-0 bottom-0 flex flex-row justify-center items-center">
                    <div className="text-lg text-center text-red-500">
                      {dateRageMessage}
                    </div>
                  </div>
                ) : null}
                {formattedData.length === 0 && !dateRageMessage ? (
                  <div className="bg-light-grey opacity-50 absolute top-0 left-0 right-0 bottom-0 flex flex-row justify-center items-center">
                    <div className="text-lg text-center pt-8">
                      No data points found in the selected range
                    </div>
                  </div>
                ) : null}

                {props.selection.length !== 0 &&
                  formattedData.length === 0 &&
                  dateRageMessage && (
                    <div className="bg-light-grey opacity-50 absolute top-0 left-0 right-0 bottom-0 flex flex-row justify-center items-center">
                      <div className="text-lg text-center text-red-500">
                        {dateRageMessage}
                      </div>
                    </div>
                  )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div
        style={{
          height: "210mm",
          width: "297mm",
          display: "none",
        }}
      >
        <div ref={componentRef}>
          <div
            className="flex flex-col justify-center items-start w-full bg-opacity-10 "
            style={{
              height: "210",
            }}
          >
            <div className="mt-2">
              <div className="text-charcoal text-md ">Trend Recordings</div>
              <div className="text-charcoal text-xs">
                {true ? format(new Date(), "dd MMM yyyy  kk:mm") : null}
              </div>
            </div>
          </div>

          <div
            className="flex flex-col justify-center items-start w-full  mt-2"
            style={{
              width: "210",
            }}
          >
            <div className="text-charcoal text-md">
              {userDetails?.users_by_pk?.first_name}{" "}
              {userDetails?.users_by_pk?.last_name}
            </div>
            {userDetails && (
              <div className="text-charcoal text-md">
                Age:{" "}
                {differenceInYears(
                  new Date(),
                  new Date(userDetails.users_by_pk?.birth_date)
                )}{" "}
              </div>
            )}
            {userDetails &&
              userDetails.users_by_pk &&
              userDetails.users_by_pk.data && (
                <div className="text-charcoal text-md">
                  {" "}
                  Gender:
                  <span className=" capitalize ">
                    {" " +
                      JSON.parse(userDetails.users_by_pk?.data).data.gender}
                  </span>
                </div>
              )}
          </div>
          <div className="flex flex-row justify-between items-center px-4 mt-4">
            <div className="flex flex-col">
              <label htmlFor="start_date">Start Date</label>
              <input
                className="border-2 border-gray-300 p-1 rounded-md"
                type="date"
                id="start_date"
                name="start_date"
                value={start_date}
                onChange={handleStartDateChange}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="end_date">End Date</label>
              <input
                className="border-2 border-gray-300 p-1 rounded-md"
                type="date"
                id="end_date"
                name="end_date"
                value={end_date}
                onChange={handleEndDateChange}
              />
            </div>
          </div>
          <div className="ml-4 my-4 flex flex-col gap-3">
            <div className="w-44 flex flex-row justify-between items-center">
              <label htmlFor="appt">Start time:</label>
              <input
                className="border-2 border-gray-300 p-1 rounded-md"
                type="time"
                id="appt"
                name="appt"
                value={startTime}
                onChange={handleStartTimeChange}
              ></input>
            </div>
            <div className="w-44 flex flex-row justify-between items-center">
              <label htmlFor="appt">End time:</label>
              <input
                className="border-2 border-gray-300 p-1 rounded-md"
                type="time"
                id="appt"
                name="appt"
                value={endTime}
                onChange={handleEndTimeChange}
              ></input>
            </div>
          </div>

          <div className="ml-4 my-2">
            Datapoint found: {formattedData?.length}
          </div>
          <div className="mt-16"></div>
          <div className="">
            <img src={chartImage || ""} alt="placeholder" />
          </div>
        </div>
      </div>
    </div>
  );
};
