import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { Followee, getBulkUsers } from "../Services/FollowService";
import { useGetUserFollowingQuery } from "../generated/graphql";
import { LocationGenerics } from "../Router/CustomRouter";
import { useMatch } from "@tanstack/react-location";

const dataSource = {
  endpoint: import.meta.env.VITE_GRAPHQL_URL,
  fetchParams: {
    headers: {
      "X-Hasura-Admin-Secret": import.meta.env.VITE_GRAPHQL_HEADER,
    },
  },
};

type FollowContextType = {
  isLoading: boolean;
  followees: Followee[];
  refetch: () => void;
};

const FollowContext = createContext<FollowContextType | undefined>(undefined);

interface FollowersProviderProps {
  children: React.ReactNode;
}

export const FollowProvider = ({ children }: FollowersProviderProps) => {
  const {
    params: { userId },
  } = useMatch<LocationGenerics>();

  // Fetch the user's following list
  const {
    data,
    isLoading: queryLoading,
    error,
    refetch: refetchFollowing,
  } = useGetUserFollowingQuery(dataSource, {
    userId: userId,
  });

  const [bulkLoading, setBulkLoading] = useState<boolean>(false);
  const [followees, setFollowees] = useState<Followee[]>([]);

  // Ref to store the previous follower IDs
  const prevFollowerIdsRef = useRef<string[]>([]);

  // Memoize follower IDs to prevent unnecessary computations
  const followerIds = useMemo(() => {
    return data?.followers.map((f) => f.followee_id) || [];
  }, [data]);

  // Memoized function to fetch followers
  const fetchFollowers = useCallback(async () => {
    // Check if the follower IDs have changed
    const prevFollowerIds = prevFollowerIdsRef.current;
    const idsHaveChanged =
      JSON.stringify(prevFollowerIds) !== JSON.stringify(followerIds);

    if (!idsHaveChanged) {
      // If IDs haven't changed, skip fetching
      return;
    }

    try {
      setBulkLoading(true);

      // Update the ref with the new IDs
      prevFollowerIdsRef.current = followerIds;

      // Fetch bulk users
      const users = await getBulkUsers(followerIds);

      // Map followers with user data
      const followersWithUsers = data?.followers
        .map((f) => {
          const user = users.find((u) => u.id === f.followee_id);
          if (!user) {
            console.error(`User not found: ${f.followee_id}`);
            return null; // Handle missing user
          }
          return {
            id: f.id,
            user: user,
            requested_on: f.requested_on as Date,
            accepted_on: f.accepted_on ? (f.accepted_on as Date) : null,
          };
        })
        .filter(Boolean) as Followee[]; // Filter out null values

      setFollowees(followersWithUsers || []);
    } catch (error) {
      console.error("Failed to fetch followers:", error);
      setFollowees([]);
    } finally {
      setBulkLoading(false);
    }
  }, [data, followerIds]);

  // useEffect to fetch followers when data or follower IDs change
  useEffect(() => {
    if (data && followerIds.length > 0) {
      fetchFollowers();
    }
  }, [data, followerIds, fetchFollowers]);

  // Function to refetch data
  const refetch = useCallback(async () => {
    // Refetch the following data
    await refetchFollowing();
    // Reset previous follower IDs to force refetch in fetchFollowers
    prevFollowerIdsRef.current = [];
  }, [refetchFollowing]);

  // Memoize the context value
  const contextValue = useMemo(
    () => ({
      isLoading: queryLoading || bulkLoading,
      followees,
      refetch,
    }),
    [queryLoading, bulkLoading, followees, refetch]
  );

  return (
    <FollowContext.Provider value={contextValue}>
      {children}
    </FollowContext.Provider>
  );
};

// Custom hook to use the followers context
export const useFollowing = () => {
  const context = useContext(FollowContext);
  if (context === undefined) {
    throw new Error("useFollowing must be used within a FollowProvider");
  }
  return context;
};
