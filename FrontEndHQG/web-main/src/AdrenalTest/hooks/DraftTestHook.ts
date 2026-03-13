import { useState } from 'react';
import { format, parse } from 'date-fns';

export type DraftTest = {
  id?: string;
  title: string;
  drops: number | null;
  date: string;
  time: string;
};

export const DRAFT_ID = 'draft'; // Constant for draft ID

// Custom Hook for managing test data and draft
export const useDraftAdrenalTest = () => {
  // Format current date and time using date-fns
  const now = new Date();
  const currentDate = format(now, 'yyyy-MM-dd');
  const currentTime = format(now, 'HH:mm');

  const [draft, setDraft] = useState<DraftTest>({
    id: DRAFT_ID,
    title: 'New Test',
    drops: null,
    date: currentDate,
    time: currentTime,
  });

  const updateDraft = (field: keyof DraftTest, value: any) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
  };

  const resetDraft = () => {
    // Get fresh current date and time when resetting
    const resetNow = new Date();
    setDraft({
      id: DRAFT_ID,
      title: 'New Test',
      drops: null,
      date: format(resetNow, 'yyyy-MM-dd'),
      time: format(resetNow, 'HH:mm'),
    });
  };

  // Helper function to get combined date and time as Date object or ISO string
  const getDateTime = (asIsoString = true): Date | string => {
    if (!draft.date) return new Date();

    // Parse the date and time strings to create a Date object
    // format: "2023-01-31 14:30" (yyyy-MM-dd HH:mm)
    const dateTimeString = `${draft.date} ${draft.time || '00:00'}`;
    const dateTime = parse(dateTimeString, 'yyyy-MM-dd HH:mm', new Date());

    return asIsoString ? dateTime.toISOString() : dateTime;
  };

  return {
    draft,
    updateDraft,
    resetDraft,
    getDateTime,
  };
};
