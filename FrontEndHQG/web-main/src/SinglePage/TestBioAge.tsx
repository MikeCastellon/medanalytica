import {
  Area,
  AreaChart,
  CartesianGrid,
  Label,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DisplayWrapper } from "../Common/DisplayWrapper";
import { LocationGenerics } from "../Router/CustomRouter";
import { useMatch } from "@tanstack/react-location";
import { useUserContext } from "../Hooks/UserContext";
import {
  Order_By,
  useGetAllHeartDataForOwnerQuery,
} from "../generated/graphql";
import { differenceInYears } from "date-fns";

const dataSource = {
  endpoint: import.meta.env.VITE_GRAPHQL_URL,
  fetchParams: {
    headers: {
      // 'Authorization': `Bearer ${auth.user?.token}`,
      "X-Hasura-Admin-Secret": import.meta.env.VITE_GRAPHQL_HEADER,
    },
  },
};

export const TestBioAge = () => {
  const {
    params: { userId, subjectId, recordingId },
    data: {
      // currentRecording
    },
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

  const { currentRecording } = useUserContext();

  const currentAge = differenceInYears(
    new Date(),
    new Date(subject?.users_by_pk?.birth_date)
  );

  const newRange = wellnessRanges.map((range) => {
    return {
      age: range.age,
      range: [range.min, range.max - 0.0001],
    };
  });

  const wellnessIndex = currentRecording?.data?.wellnessIndex;
  return (
    <DisplayWrapper>
      <div className="ml-8 flex flex-col gap-2 mb-8 mt-8">
        <div className="text-xl">
          Wellness Index: {wellnessIndex?.toFixed()}
        </div>
        <div className="text-xl">Actual Age: {currentAge}</div>
        <div className="text-xl">
          Bio Age: {getAgeFromWellnessIndex(wellnessIndex)}
        </div>
      </div>
      <div className="ml-16">
        <div className="text-md mb-4">Calculation Details:</div>
        <div>MxDMn = {currentRecording?.data.mxdmn?.toFixed(2)}</div>
        <div>
          Brain Power = {currentRecording?.data?.brain?.brain_power?.toFixed(2)}
        </div>
        <div>ANS Balance = {currentRecording?.data?.ans?.toFixed(2)}</div>
        <code></code>
        <pre className="mt-4">
          <code>
            def get_cardio_vascular_adaptation(MxDMn): <br />
            &nbsp;&nbsp;if MxDMn &#8804; 0.50: <br />
            &nbsp;&nbsp;&nbsp;&nbsp;return 0 <br />
            &nbsp;&nbsp;elif MxDMn &#8805; 0.350: <br />
            &nbsp;&nbsp;&nbsp;&nbsp;return 100 <br />
            &nbsp;&nbsp;return (MxDMn - 50) * 100 / 300
          </code>
        </pre>
        <pre className="mt-4 mb-8">
          <code className="language-python">
            def calculate_wellness_index(cardio_adaptation, ans_balance_index,
            brain_power): <br />
            &nbsp;&nbsp;return (cardio_adaptation + ans_balance_index +
            brain_power) / 3
          </code>
        </pre>
      </div>
      <ResponsiveContainer width={850} height={500}>
        <AreaChart
          data={newRange}
          margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
        >
          <defs>
            <linearGradient id="colorWellness" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="age">
            <Label value="Age" offset={-10} position="insideBottom" />
          </XAxis>
          <YAxis>
            <Label value="Wellness Index" angle={-90} position="insideLeft" />
          </YAxis>
          <Tooltip />
          <Area
            type="monotone"
            dataKey="range"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorWellness)"
          />
          <ReferenceLine y={wellnessIndex} stroke="red" />
          <ReferenceLine
            x={getAgeFromWellnessIndex(wellnessIndex) || 0}
            stroke="green"
          />
          {/* <Line type="monotone" dataKey="min" stroke="#82ca9d" /> */}
          {/* <Line type="monotone" dataKey="max" stroke="green" /> */}
        </AreaChart>
      </ResponsiveContainer>
    </DisplayWrapper>
  );
};

type WellnessRange = {
  min: number;
  max: number;
  age: number;
};

const wellnessRanges: WellnessRange[] = [
  { min: 90, max: 100, age: 20 },
  { min: 89, max: 90, age: 21 },
  { min: 88, max: 89, age: 22 },
  { min: 86, max: 88, age: 23 },
  { min: 84, max: 86, age: 24 },
  { min: 82, max: 84, age: 25 },
  { min: 80, max: 82, age: 26 },
  { min: 78, max: 80, age: 27 },
  { min: 76, max: 78, age: 28 },
  { min: 74, max: 76, age: 29 },
  { min: 72, max: 74, age: 30 },
  { min: 70, max: 72, age: 31 },
  { min: 68, max: 70, age: 32 },
  { min: 66, max: 68, age: 33 },
  { min: 64, max: 66, age: 34 },
  { min: 62, max: 64, age: 35 },
  { min: 60, max: 62, age: 36 },
  { min: 58, max: 60, age: 37 },
  { min: 56, max: 58, age: 38 },
  { min: 54, max: 56, age: 39 },
  { min: 52, max: 54, age: 40 },
  { min: 50, max: 52, age: 41 },
  { min: 48, max: 50, age: 42 },
  { min: 46, max: 48, age: 43 },
  { min: 44, max: 46, age: 44 },
  { min: 42, max: 44, age: 45 },
  { min: 40, max: 42, age: 46 },
  { min: 38, max: 40, age: 47 },
  { min: 36, max: 38, age: 48 },
  { min: 34, max: 36, age: 49 },
  { min: 32, max: 34, age: 50 },
  { min: 31, max: 32, age: 51 },
  { min: 30, max: 31, age: 52 },
  { min: 29, max: 30, age: 53 },
  { min: 28, max: 29, age: 54 },
  { min: 27, max: 28, age: 55 },
  { min: 26, max: 27, age: 56 },
  { min: 25, max: 26, age: 57 },
  { min: 24, max: 25, age: 58 },
  { min: 23, max: 24, age: 59 },
  { min: 22, max: 23, age: 60 },
  { min: 21, max: 22, age: 61 },
  { min: 20, max: 21, age: 62 },
  { min: 19, max: 20, age: 63 },
  { min: 18, max: 19, age: 64 },
  { min: 17, max: 18, age: 65 },
  { min: 16, max: 17, age: 66 },
  { min: 15, max: 16, age: 67 },
  { min: 14, max: 15, age: 68 },
  { min: 13, max: 14, age: 69 },
  { min: 12, max: 13, age: 70 },
  { min: 11, max: 12, age: 71 },
  { min: 10, max: 11, age: 72 },
  { min: 9.5, max: 10, age: 73 },
  { min: 9, max: 9.5, age: 74 },
  { min: 8.5, max: 9, age: 75 },
  { min: 8, max: 8.5, age: 76 },
  { min: 7.5, max: 8, age: 77 },
  { min: 7, max: 7.5, age: 78 },
  { min: 6.5, max: 7, age: 79 },
  { min: 6, max: 6.5, age: 80 },
  { min: 5.5, max: 6, age: 81 },
  { min: 5, max: 5.5, age: 82 },
  { min: 4.5, max: 5, age: 83 },
  { min: 4, max: 4.5, age: 84 },
  { min: 3.5, max: 4, age: 85 },
  { min: 3, max: 3.5, age: 86 },
  { min: 2.5, max: 3, age: 87 },
  { min: 2, max: 2.5, age: 88 },
  { min: 1.5, max: 2, age: 89 },
  { min: 1, max: 1.5, age: 90 },
];

export function getAgeFromWellnessIndex(wellnessIndex: number): number | null {
  const range = wellnessRanges.find(
    (range) => wellnessIndex >= range.min && wellnessIndex < range.max
  );
  return range ? range.age : null;
}
