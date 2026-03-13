import { useMatch } from '@tanstack/react-location';
import { SubjectContextBox } from '../Common/SubjectContextBox';
import { LocationGenerics } from '../Router/CustomRouter';
import {
  OxidativeStressMenu,
  OxidativeStressTestData,
} from './OxidativeStressMenu';
import { useEffect, useState } from 'react';
import { OxidativeTestChart } from './OxidativeTestChart';
import { useChartData } from './hooks/useOxidativeTestData';
import { useGetOxidativeStressTestsByOwnerQuery } from '../generated/graphql';

const dataSource = {
  endpoint: import.meta.env.VITE_GRAPHQL_URL,
  fetchParams: {
    headers: {
      'X-Hasura-Admin-Secret': import.meta.env.VITE_GRAPHQL_HEADER,
    },
  },
};

export const OxidativeStressWrapper = () => {
  const {
    params: { userId, subjectId },
  } = useMatch<LocationGenerics>();
  const [timeProportional, setTimeProportional] = useState(true);
  const { data } = useGetOxidativeStressTestsByOwnerQuery(dataSource, {
    owner_id: subjectId,
  });
  const { chartData, xDomain } = useChartData(
    data?.oxidative_stress_test || [],
    timeProportional
  );

  return (
    <div className="flex flex-row ml-[83px]">
      <div className="flex flex-col w-[297px]">
        <SubjectContextBox userId={userId} subjectId={subjectId} />
        <OxidativeStressMenu />
      </div>
      <div className="flex-1 px-4 py-8 print-content">
        <div className="text-2xl">Oxidative Stress Test</div>
        <div className="mt-4 mb-10">
          <VisualizationToggle
            timeProportional={timeProportional}
            onToggle={setTimeProportional}
          />
        </div>
        <div className="h-[500px] mt-6">
          <OxidativeTestChart
            data={chartData}
            timeProportional={timeProportional}
            xDomain={xDomain}
            // selectedId={selectedTest?.id || undefined}
            onSelectPoint={(item) => {}}
          />
        </div>
        <div className="mx-4 lg:w-3/5">
          <div>
            The Free Radical Test Kit is designed to monitor the morning urine
            to check for free radical activity in the body. It checks the
            presence of Malondialdehyde (MDA) which is the most prevalent by
            product of lipid peroxidation and is an indication of free radical
            activity. When we talk about lipid peroxidation, we are talking
            about damage our fats, especially the cell membranes. The brains of
            your cells. Excessive free radical activity has been linked as a
            causal link of many degenerative issues.
          </div>
          <div>
            The results obtained can be used to determine the adequacy of
            anti-oxidants of the body. Antioxidants prevent free radical induced
            tissue damage by preventing the formation of radicals scavenging
            them, or by promoting their decomposition. Some of these damaging
            molecules can be superoxide, Peroxynitrite, Hydroxyl Radicals and
            can be neutralized with the specific antioxidants.
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
