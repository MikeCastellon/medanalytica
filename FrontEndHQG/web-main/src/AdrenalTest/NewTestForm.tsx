import { hyperColour, hypoColour } from './AdrenalTestWrapper';
import { DRAFT_ID, DraftTest } from './hooks/DraftTestHook';

// Component for the test form
export const NewTestForm: React.FC<{
  draft: DraftTest;
  onDraftChange: (field: keyof DraftTest, value: any) => void;
  onCancel: () => void;
  onSubmit: () => void;
}> = ({ draft, onDraftChange, onCancel, onSubmit }) => {
  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h3 className="text-lg mb-3">
        {draft.id === DRAFT_ID ? 'New Test' : 'Update Test'}
      </h3>
      <div className="flex flex-col space-y-4">
        <div>
          <label className="block text-sm  text-gray-700 mb-1">Title</label>
          <input
            type="text"
            value={draft.title}
            onChange={(e) => onDraftChange('title', e.target.value)}
            className="w-full px-3 py-1 border rounded-md"
            placeholder="Test title"
          />
        </div>

        <div>
          <label className="block text-sm  text-gray-700 mb-1">Date</label>
          <input
            type="date"
            value={draft.date}
            onChange={(e) => onDraftChange('date', e.target.value)}
            className="w-full px-3 py-1 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Time</label>
          <input
            type="time"
            value={draft.time || ''}
            onChange={(e) => onDraftChange('time', e.target.value)}
            className="w-full px-3 py-1 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm  text-gray-700 mb-1">
            Drops (1-27)
          </label>
          <div className="flex flex-row justify-between">
            <div>
              <div
                className="w-12 h-16 rounded-md"
                style={{ backgroundColor: hypoColour }}
              ></div>
            </div>
            <div className=" flex-1 flex flex-col items-center space-x-4">
              <span className="w-12 text-center text-xl">
                {draft.drops || '-'}
              </span>
              <div className="w-[80%]">
                <input
                  type="range"
                  min="1"
                  max="27"
                  value={draft.drops || 14}
                  onChange={(e) =>
                    onDraftChange('drops', parseInt(e.target.value))
                  }
                  className="w-full"
                />
              </div>
            </div>
            <div
              className="w-12 h-16 rounded-md"
              style={{ backgroundColor: hyperColour }}
            ></div>
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
            disabled={draft.drops === null}
            className={`px-3 py-1 rounded-md text-white ${
              draft.drops === null ? 'bg-gray-400' : 'bg-blue-600'
            }`}
          >
            Save Test
          </button>
        </div>
      </div>
    </div>
  );
};
