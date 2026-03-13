import { format, parse, isValid, parseISO } from 'date-fns';
import {
  OxidativeStressDraft,
  OxidativeStressTestData,
} from './OxidativeStressMenu';

export const DRAFT_ID = 'draft';
export const colorMap = {
  1: '#FFD700', // Gold
  2: '#FF8C00', // Dark Orange
  3: '#FF4500', // Orange Red
  4: '#DC143C', // Crimson
  5: '#8B0000', // Dark Red
};

// Component for the test form
export const TestForm: React.FC<{
  draft: OxidativeStressDraft;
  onDraftChange: (field: keyof OxidativeStressDraft, value: any) => void;
  onCancel: () => void;
  onSubmit: () => void;
}> = ({ draft, onDraftChange, onCancel, onSubmit }) => {
  const colorOptions = [
    {
      id: 1,
      name: 'Very Low',
      color: colorMap[1],
      value: 1,
    }, // Blue
    {
      id: 2,
      name: 'Low',
      color: colorMap[2],
      value: 2,
    }, // Green
    {
      id: 3,
      name: 'Normal',
      color: colorMap[3],
      value: 3,
    }, // Yellow
    {
      id: 4,
      name: 'High',
      color: colorMap[4],
      value: 4,
    }, // Orange
    {
      id: 5,
      name: 'Very High',
      color: colorMap[5],
      value: 5,
    }, // Red
  ];

  // Helper function to safely parse a date
  const safeParseDate = (dateValue: Date | string) => {
    if (!dateValue) return null;

    // If it's already a Date object
    if (dateValue instanceof Date) return dateValue;

    // If it's a string, try to parse it
    if (typeof dateValue === 'string') {
      const parsedDate = parseISO(dateValue);
      return isValid(parsedDate) ? parsedDate : null;
    }

    return null;
  };

  // Get formatted date for the input
  const getFormattedDate = () => {
    const date = safeParseDate(draft.created_at);
    return date ? format(date, 'yyyy-MM-dd') : '';
  };

  // Get formatted time for the input
  const getFormattedTime = () => {
    const date = safeParseDate(draft.created_at);
    return date ? format(date, 'HH:mm') : '';
  };

  // Update the date
  const updateDate = (dateStr: string) => {
    if (!dateStr) return;

    // Parse the new date
    const newDate = parse(dateStr, 'yyyy-MM-dd', new Date());

    // Get current time from updated_at or use current time
    const timeDate = safeParseDate(draft.updated_at) || new Date();

    // Create a new date with the new date part and existing time part
    const combinedDate = new Date(
      newDate.getFullYear(),
      newDate.getMonth(),
      newDate.getDate(),
      timeDate.getHours(),
      timeDate.getMinutes(),
      timeDate.getSeconds()
    );

    onDraftChange('created_at', combinedDate.toISOString());
  };

  // Update the time
  const updateTime = (timeStr: string) => {
    if (!timeStr) return;

    // Parse the new time
    const [hours, minutes] = timeStr.split(':').map(Number);

    // Get current date from created_at or use current date
    const dateDate = safeParseDate(draft.created_at) || new Date();

    // Create a new date with the existing date part and new time part
    const combinedDate = new Date(
      dateDate.getFullYear(),
      dateDate.getMonth(),
      dateDate.getDate(),
      hours,
      minutes,
      0
    );

    onDraftChange('created_at', combinedDate.toISOString());
  };

  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <div className="flex flex-col space-y-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Title</label>
          <input
            type="text"
            value={draft.title || ''}
            onChange={(e) => onDraftChange('title', e.target.value)}
            className="w-full px-3 py-1 border rounded-md"
            placeholder="Test title"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Date</label>
          <input
            type="date"
            value={getFormattedDate()}
            onChange={(e) => updateDate(e.target.value)}
            className="w-full px-3 py-1 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Time</label>
          <input
            type="time"
            value={getFormattedTime()}
            onChange={(e) => updateTime(e.target.value)}
            className="w-full px-3 py-1 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Select a color:
          </label>
          <div className="flex flex-wrap gap-2">
            {colorOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                className={`flex items-center p-2 rounded-full ${
                  draft.color === option.value
                    ? 'ring-2 ring-offset-2 ring-black'
                    : 'border border-gray-300'
                }`}
                style={{ backgroundColor: option.color }}
                onClick={() => onDraftChange('color', option.value)}
              >
                <div
                  className="w-4 h-4 rounded-full "
                  style={{ backgroundColor: option.color }}
                ></div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={onCancel}
            className="px-4 py-2 border rounded-md bg-white text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            disabled={!draft.color}
            className={`px-3 py-1 rounded-md text-white ${
              !draft.color ? 'bg-gray-400' : 'bg-blue-600'
            }`}
          >
            Save Test
          </button>
        </div>
      </div>
    </div>
  );
};
