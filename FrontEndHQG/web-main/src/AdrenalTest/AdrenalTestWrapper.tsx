import { useMatch } from '@tanstack/react-location';
import { SubjectContextBox } from '../Common/SubjectContextBox';
import { LocationGenerics } from '../Router/CustomRouter';
import { AdrenalTestMenu } from './AdrenalTestMenu';
import {
  useGetAdrenalTestsByOwnerQuery,
  useInsertAdrenalTestMutation,
  useUpdateAdrenalTestMutation,
} from '../generated/graphql';
import { useEffect, useMemo, useState } from 'react';
import { ChartDataPoint, useChartData } from './hooks/ChartWithDraft';
import { DRAFT_ID, useDraftAdrenalTest } from './hooks/DraftTestHook';
import { format } from 'date-fns';
import { NewTestForm } from './NewTestForm';
import { set } from 'lodash';
import { AdrenalTestChart } from './AdrenalTestChart';

const dataSource = {
  endpoint: import.meta.env.VITE_GRAPHQL_URL,
  fetchParams: {
    headers: {
      'X-Hasura-Admin-Secret': import.meta.env.VITE_GRAPHQL_HEADER,
    },
  },
};

export type AdrenalTestData = {
  id: string;
  title: string;
  drops: number;
  created_at: Date;
  updated_at: Date;
  owner_id: string;
};
export const hypoColour = '#f5c242';
export const hyperColour = '#ba6129';

export const AdrenalTestWrapper = () => {
  const {
    params: { userId, subjectId },
  } = useMatch<LocationGenerics>();
  const { data, isLoading, error, refetch } = useGetAdrenalTestsByOwnerQuery(
    dataSource,
    { owner_id: subjectId }
  );
  const { mutate: saveTest } = useInsertAdrenalTestMutation(dataSource, {
    onSuccess: () => {
      refetch();
    },
    onError: (err) => {
      console.error('Error adding test:', err);
    },
  });
  const { mutate: updateTest } = useUpdateAdrenalTestMutation(dataSource, {
    onSuccess: () => {
      refetch();
    },
    onError: (err) => {
      console.error('Error updating test:', err);
    },
  });
  const [timeProportional, setTimeProportional] = useState(true);
  const [showForm, setShowForm] = useState(false);
  // const [selectedId, setSelectedId] = useState<string | number | null>(null);
  const [selectedTest, setSelectedTest] = useState<ChartDataPoint | null>(null);
  const [tests, setTests] = useState<AdrenalTestData[]>([]);

  // Use our custom hooks
  const { draft, updateDraft, resetDraft, getDateTime } = useDraftAdrenalTest();

  useEffect(() => {
    if (data?.adrenal_function_urine_test) {
      setTests(data.adrenal_function_urine_test);
    }
  }, [data, setTests, isLoading]);

  const { chartData, xDomain } = useChartData(tests, draft, timeProportional);

  const submitTest = () => {
    if (draft.drops === null) return;
    if (draft.id === DRAFT_ID) {
      // If it's a new test, we need to set the ID to null
      saveTest({
        owner_id: subjectId,
        title: draft.title,
        drops: draft.drops,
        created_at: draft.date ? new Date(draft.date) : new Date(),
      });
    }
    if (selectedTest) {
      // If it's an existing test, we need to update it
      updateTest({
        id: selectedTest.id,
        _set: {
          title: draft.title,
          drops: draft.drops,
          created_at: getDateTime(false),
        },
      });
    }
    resetDraft();
    setShowForm(false);
    setSelectedTest(null);
  };

  const cancleDraft = () => {
    setSelectedTest(null);
    resetDraft();
    setShowForm(false);
  };

  return (
    <div className="flex flex-row ml-[83px]">
      <div className="flex flex-col w-[297px]">
        <SubjectContextBox userId={userId} subjectId={subjectId} />
        <AdrenalTestMenu
          selectedTestId={selectedTest?.id}
          onSelected={(test) => {
            setSelectedTest(test);
            setShowForm(true);
            updateDraft('id', test.id);
            updateDraft('title', test.title);
            updateDraft('drops', test.drops);
            updateDraft('date', format(test.timestamp, 'yyyy-MM-dd'));
            updateDraft('time', format(test.timestamp, 'HH:mm'));
          }}
        />
      </div>
      <div className="flex-1 px-4 py-8 print-content">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="text-2xl">
              Adrenal function urine test ({tests.length} tests)
            </div>
          </div>
          <VisualizationToggle
            timeProportional={timeProportional}
            onToggle={setTimeProportional}
          />

          <div className="h-80 mt-6">
            <AdrenalTestChart
              data={chartData}
              timeProportional={timeProportional}
              xDomain={xDomain}
              selectedId={selectedTest?.id || undefined}
              onSelectPoint={(item) => {
                updateDraft('id', item.id);
                updateDraft('title', item.title);
                updateDraft('drops', item.drops);
                updateDraft('date', format(item.timestamp, 'yyyy-MM-dd'));
                updateDraft('time', format(item.timestamp, 'HH:mm'));

                setSelectedTest(item);
                setShowForm(true);
              }}
            />
          </div>
        </div>
        {showForm ? (
          <div className="flex justify-center">
            <div className="w-96">
              <NewTestForm
                draft={draft}
                onDraftChange={updateDraft}
                onCancel={cancleDraft}
                onSubmit={submitTest}
              />
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              {draft.id === DRAFT_ID ? 'New Test' : 'Update Test'}
            </button>
          </div>
        )}
        <div className="grid grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Left Column - Hypo */}
          <div className="flex flex-col items-center">
            <div
              className="w-20 h-24 rounded-md mb-4"
              style={{ backgroundColor: hypoColour }}
            ></div>
            <div className="text-center mb-4">Urine color before test</div>
            <div className="text-2xl font-bold text-center w-full mb-4">
              Hypo
            </div>
            <div className="">
              Decreased motivation <br />
              Fatigue or extreme tiredness <br />
              Low blood pressure, especially on standing <br />
              Muscle weakness, or joint pain <br />
              Lower threshold in dealing with stress <br />
              Hypoglycemia
            </div>
          </div>

          {/* Middle Column - Parameters */}
          <div className="flex flex-col items-center">
            <div className="h-24 mb-4"></div>
            <div className="invisible mb-4">Placeholder for alignment</div>
            <div className="text-2xl font-bold text-center w-full mb-4">
              HQP Parameters
            </div>
            <div className="bg-light-grey p-4 rounded-lg w-full mb-6">
              5 drops or less: hyper <br />
              Approximately 10 drops: moderate hyper <br />
              Approximately 20 drops: normal <br />
              25 drops or more: adrenal fatigue <br />
              Allow a margin of error of 2-3 drops
            </div>
            <div className="">
              Adrenal questionnaire <br />
              Cortisol and DHEA <br />
              Stress Index <br />
              LF, Sympathetic N. (Yellow Pie) <br />
              Decreased HF Parasympathetic N (Green Pie) <br />
              Increased HF with decreased total power <br />
              Increased VLF Neurohormonal (Red Pie) Chronic stress
            </div>
          </div>

          {/* Right Column - Hyper */}
          <div className="flex flex-col items-center">
            <div
              className="w-20 h-24 rounded-md mb-4"
              style={{ backgroundColor: hyperColour }}
            ></div>
            <div className="text-center mb-4">Urine color test completion</div>
            <div className="text-2xl font-bold text-center w-full mb-4">
              Hyper
            </div>
            <div className="">
              Restlessness <br />
              Difficulty falling asleep even if exhausted <br />
              increased anxiety <br />
              Inability to relax and chill out <br />
              can feel weird
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Component for the visualization mode selector
const VisualizationToggle: React.FC<{
  timeProportional: boolean;
  onToggle: (value: boolean) => void;
}> = ({ timeProportional, onToggle }) => {
  return (
    <div className="flex items-center space-x-2 print:hidden">
      <span className="text-sm text-gray-600">View mode:</span>
      <button
        onClick={() => onToggle(true)}
        className={`px-3 py-1 text-sm rounded-md ${
          timeProportional
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700'
        }`}
      >
        Time-based
      </button>
      <button
        onClick={() => onToggle(false)}
        className={`px-3 py-1 text-sm rounded-md ${
          !timeProportional
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700'
        }`}
      >
        Sequential
      </button>
    </div>
  );
};
