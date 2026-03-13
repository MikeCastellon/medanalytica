import { useMemo } from 'react';
import {
  OxidativeStressDraft,
  OxidativeStressTestData,
} from '../OxidativeStressMenu';

export type ChartDataPoint = {
  id: string;
  title: string;
  color: number | null;
  timestamp: number;
  date: string;
  index: number;
  isDraft?: boolean;
};

export const useChartData = (
  tests: OxidativeStressTestData[],
  timeProportional: boolean,
  draft?: OxidativeStressDraft
) => {
  return useMemo(() => {
    // Sort data by created_at date
    const sortedTests = [...tests].sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );

    // Convert tests to chart data format
    const testData: ChartDataPoint[] = sortedTests.map((item, index) => ({
      id: item.id,
      title: item.title,
      color: item.color,
      timestamp: new Date(item.created_at).getTime(),
      date: new Date(item.created_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
      index: index,
    }));

    // Add draft point if it exists
    let dataWithDraft = [...testData];

    if (draft?.color !== null && draft?.id === 'draft') {
      const draftDate = new Date(draft.created_at);
      const draftPoint: ChartDataPoint = {
        id: draft.id || 'draft',
        title: draft.title,
        color: draft.color,
        timestamp: draftDate.getTime(),
        date: draftDate.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        }),
        index: testData.length,
        isDraft: true,
      };

      dataWithDraft.push(draftPoint);

      // Resort after adding draft
      dataWithDraft = dataWithDraft.sort((a, b) => a.timestamp - b.timestamp);

      // Recalculate indices after sorting
      dataWithDraft = dataWithDraft.map((item, index) => ({
        ...item,
        index,
      }));
    }

    // Calculate time domain for x-axis
    let xDomain: [number, number] = [0, 0];

    if (dataWithDraft.length > 0) {
      const timestamps = dataWithDraft.map((d) => d.timestamp);
      const minTime = Math.min(...timestamps);
      const maxTime = Math.max(...timestamps);

      // Add padding (10% on each side)
      const range = maxTime - minTime;
      const padding = range * 0.1 || 86400000; // Use 1 day if range is 0
      xDomain = [minTime - padding, maxTime + padding];
    }

    return {
      chartData: dataWithDraft,
      xDomain,
    };
  }, [tests, draft, timeProportional]);
};
