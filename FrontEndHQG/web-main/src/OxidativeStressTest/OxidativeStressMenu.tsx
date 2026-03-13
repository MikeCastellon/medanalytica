import { useMatch } from '@tanstack/react-location';
import { LocationGenerics } from '../Router/CustomRouter';
import {
  useDeleteOxidativeStressTestMutation,
  useGetOxidativeStressTestsByOwnerQuery,
  useInsertOxidativeStressTestMutation,
  useUpdateOxidativeStressTestMutation,
} from '../generated/graphql';
import { format } from 'date-fns';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { colorMap, DRAFT_ID, TestForm } from './OxidativeStressTestForm';
import { AddiIcon } from '../Common/icons/AddiIcon';

const dataSource = {
  endpoint: import.meta.env.VITE_GRAPHQL_URL,
  fetchParams: {
    headers: {
      'X-Hasura-Admin-Secret': import.meta.env.VITE_GRAPHQL_HEADER,
    },
  },
};
export type OxidativeStressColor = 1 | 2 | 3 | 4 | 5 | number;
export interface OxidativeStressTestData {
  id: string;
  owner_id: string;
  title: string;
  color: OxidativeStressColor;
  created_at: Date;
  updated_at: Date;
}

export interface OxidativeStressDraft {
  id?: string;
  owner_id: string;
  title: string;
  color: OxidativeStressColor;
  created_at: Date;
  updated_at: Date;
}

export const OxidativeStressMenu = () => {
  const {
    params: { userId, subjectId },
  } = useMatch<LocationGenerics>();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isNewTestModalOpen, setIsNewTestModalOpen] = useState(false);
  const [testToDelete, setTestToDelete] =
    useState<OxidativeStressTestData | null>(null);
  const [newTest, setNewTest] = useState<OxidativeStressDraft>({
    owner_id: subjectId,
    title: '',
    color: 1,
    created_at: new Date(),
    updated_at: new Date(),
  });
  const [draft, setDraft] = useState<OxidativeStressDraft>({
    id: DRAFT_ID,
    owner_id: subjectId,
    title: '',
    color: 1,
    created_at: new Date(),
    updated_at: new Date(),
  });

  const { data, isLoading, error, refetch } =
    useGetOxidativeStressTestsByOwnerQuery(dataSource, {
      owner_id: subjectId,
    });

  const { mutate: createNewTest } = useInsertOxidativeStressTestMutation(
    dataSource,
    {
      onSuccess: () => {
        refetch();
      },
      onError: (err) => {
        console.error('Error adding test:', err);
      },
    }
  );

  const { mutate: deleteTest } = useDeleteOxidativeStressTestMutation(
    dataSource,
    {
      onSuccess: () => {
        refetch();
      },
      onError: (err) => {
        console.error('Error deleting test:', err);
      },
    }
  );

  const { mutate: updateTest } = useUpdateOxidativeStressTestMutation(
    dataSource,
    {
      onSuccess: () => {
        refetch();
      },
      onError: (err) => {
        console.error('Error deleting test:', err);
      },
    }
  );

  const handleDeleteClick = (test: OxidativeStressTestData) => {
    setTestToDelete(test);
    setIsDeleteModalOpen(true);
  };

  const handleSelectTest = (test: OxidativeStressTestData) => {
    // Pass the selected test to the parent component
    // onSelected && onSelected(test);
  };

  const handleEditClick = (test: OxidativeStressTestData) => {
    // Handle edit action here
    setDraft({
      id: test.id,
      owner_id: test.owner_id,
      title: test.title,
      color: test.color,
      created_at: new Date(test.created_at),
      updated_at: new Date(test.updated_at),
    });
    setIsEditModalOpen(true);
    // You can navigate to the edit page or open a modal for editing
  };

  const confirmDelete = async () => {
    await deleteTest({ id: testToDelete?.id });
    setIsDeleteModalOpen(false);
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setTestToDelete(null);
  };

  const updateDraft = (field: keyof OxidativeStressDraft, value: any) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
  };
  const updateNewTest = (field: keyof OxidativeStressDraft, value: any) => {
    setNewTest((prev) => ({ ...prev, [field]: value }));
  };

  const tests = data?.oxidative_stress_test || [];

  return (
    <div className="flex flex-col w-[297px]">
      <div className="text-charcoal text-lg border-desaturated-grey border-b-[1px] mb-3 uppercase p-3">
        Oxidative Tests
      </div>

      <div className="flex-1 flex flex-row justify-center mb-4">
        <button
          className="flex flex-row items-center "
          onClick={() => setIsNewTestModalOpen(true)}
        >
          <div className="p-1 bg-primary-red shadow-md text-white rounded-full">
            <AddiIcon />
          </div>
          <span className="pl-3">New Test</span>
        </button>
      </div>

      {tests.length === 0 ? (
        <div className="p-6 bg-gray-50 rounded-lg text-center">
          <p className="text-gray-500">No oxidative stress tests found.</p>
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {tests.map((test) => (
              <li
                key={test.id}
                className={`p-2 hover:bg-gray-50 flex justify-between items-center ${
                  // selectedTestId === test.id ? 'bg-gray-100' : ''
                  ''
                }`}
              >
                <div
                  className="flex-1 cursor-pointer"
                  onClick={() =>
                    handleSelectTest(test as OxidativeStressTestData)
                  }
                >
                  <div className="font-medium">{test.title}</div>
                  <div className="flex flex-row gap-2 items-center text-xs text-gray-600">
                    Color:{' '}
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{
                        backgroundColor:
                          colorMap[test.color as 1 | 2 | 3 | 4 | 5],
                      }}
                    >
                      {/* {test.color} */}
                    </div>
                  </div>
                  <div className="text-xs text-gray-600">
                    Created:{' '}
                    {format(new Date(test.created_at), 'MMM d, yyyy, HH:mm')}
                  </div>
                </div>
                <div>
                  <button
                    onClick={() =>
                      handleEditClick(test as OxidativeStressTestData)
                    }
                    className="p-1 text-blue-600 hover:bg-blue-50 rounded-full"
                    aria-label="Delete test"
                  >
                    <EditOutlined />
                  </button>
                  <button
                    onClick={() =>
                      handleDeleteClick(test as OxidativeStressTestData)
                    }
                    className="p-1 text-red-600 hover:bg-red-50 rounded-full"
                    aria-label="Delete test"
                  >
                    <DeleteOutlined />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isNewTestModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
            <h3 className="text-lg font-semibold mb-2">New Test</h3>
            <TestForm
              draft={newTest}
              onDraftChange={updateNewTest}
              onCancel={() => {
                setIsNewTestModalOpen(false);
                setNewTest({
                  owner_id: subjectId,
                  title: '',
                  color: 1,
                  created_at: new Date(),
                  updated_at: new Date(),
                });
              }}
              onSubmit={() => {
                createNewTest({
                  owner_id: subjectId,
                  title: newTest.title,
                  color: newTest.color,
                  created_at: newTest.created_at,
                });
                setIsNewTestModalOpen(false);
              }}
            />
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
            <h3 className="text-lg font-semibold mb-2">Confirm Delete</h3>
            <p className="mb-4 text-gray-600">
              Are you sure you want to delete this oxidative test? This action
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
      {/* Delete Confirmation Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
            <h3 className="text-lg font-semibold mb-2">Edit Modal</h3>
            <TestForm
              draft={draft}
              onDraftChange={updateDraft}
              onCancel={() => {
                setIsEditModalOpen(false);
              }}
              onSubmit={() => {
                updateTest({
                  id: draft.id,
                  _set: {
                    title: draft.title,
                    color: draft.color,
                    created_at: draft.created_at,
                  },
                });
                setIsEditModalOpen(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
