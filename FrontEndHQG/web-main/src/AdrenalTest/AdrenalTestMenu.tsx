import { useMatch } from '@tanstack/react-location';
import { LocationGenerics } from '../Router/CustomRouter';
import { format, sub } from 'date-fns';
import { useState } from 'react';
import {
  GetAdrenalTestsByOwnerQuery,
  useDeleteAdrenalTestByIdMutation,
  useGetAdrenalTestsByOwnerQuery,
} from '../generated/graphql';
import { t } from 'xstate';
import { AdrenalTestData } from './AdrenalTestWrapper';
import { XMark } from '../Common/icons/XMark';
import { DeleteOutlined } from '@ant-design/icons';

const dataSource = {
  endpoint: import.meta.env.VITE_GRAPHQL_URL,
  fetchParams: {
    headers: {
      // 'Authorization': `Bearer ${auth.user?.token}`,
      'X-Hasura-Admin-Secret': import.meta.env.VITE_GRAPHQL_HEADER,
    },
  },
};
type AdrenalTestMenuProps = {
  selectedTestId?: string;
  onSelected?: (test: any) => void;
};

export const AdrenalTestMenu = ({
  selectedTestId,
  onSelected,
}: AdrenalTestMenuProps) => {
  const {
    params: { subjectId },
  } = useMatch<LocationGenerics>();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [testToDelete, setTestToDelete] = useState<AdrenalTestData | null>(
    null
  );

  // Fetch tests for the current user
  const { data, isLoading, error, refetch } = useGetAdrenalTestsByOwnerQuery(
    dataSource,
    { owner_id: subjectId }
  );

  const { mutate: deleteTest } = useDeleteAdrenalTestByIdMutation(dataSource, {
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.error('Error deleting test:', error);
      // Handle error (show notification, etc.)
    },
    onSettled(data, error, variables, context) {
      // Optionally, you can handle any side effects after the mutation
      // For example, you can show a success message or refetch data
      if (!error) {
        console.log('Test deleted successfully');
      }
      setIsDeleteModalOpen(false);
      setTestToDelete(null);
    },
  });

  const handleDeleteClick = (test: AdrenalTestData) => {
    setTestToDelete(test);
    setIsDeleteModalOpen(true);
  };

  const handleSelectTest = (test: any) => {
    // Pass the selected test to the parent component
    onSelected && onSelected(test);
  };

  const confirmDelete = async () => {
    await deleteTest({ id: testToDelete?.id });
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setTestToDelete(null);
  };

  if (isLoading)
    return <div className="p-4 text-gray-600">Loading tests...</div>;
  if (error)
    return (
      <div className="p-4 flex flex-col text-red-600">
        <div>Failed to load tests</div>
      </div>
    );

  const tests = data?.adrenal_function_urine_test || [];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-charcoal text-lg border-desaturated-grey border-b-[1px] mb-3 uppercase p-3">
        Adrenal Tests
      </div>

      {tests.length === 0 ? (
        <div className="p-6 bg-gray-50 rounded-lg text-center">
          <p className="text-gray-500">No adrenal tests found.</p>
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {tests.map((test) => (
              <li
                key={test.id}
                className={`p-2 hover:bg-gray-50 flex justify-between items-center ${
                  selectedTestId === test.id ? 'bg-gray-100' : ''
                }`}
              >
                <div
                  className="flex-1 cursor-pointer"
                  onClick={() => handleSelectTest(test)}
                >
                  <div className="font-medium">{test.title}</div>
                  <div className="text-xs text-gray-600">
                    Drops: {test.drops}
                  </div>
                  <div className="text-xs text-gray-600">
                    Created:{' '}
                    {format(new Date(test.created_at), 'MMM d, yyyy, HH:mm')}
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteClick(test)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                  aria-label="Delete test"
                >
                  <DeleteOutlined />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
            <h3 className="text-lg font-semibold mb-2">Confirm Delete</h3>
            <p className="mb-4 text-gray-600">
              Are you sure you want to delete this adrenal test? This action
              cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
