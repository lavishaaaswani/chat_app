import { useQuery } from "@tanstack/react-query";
import { getFriendRequests } from "../lib/api";
import useUnreadMessages from "./useUnreadMessages";

// Combines unread chat messages + incoming friend requests into a single
// count for the bell/notifications badge.
const useNotificationCount = () => {
  const { total: unreadMessages, conversations } = useUnreadMessages();

  const { data: friendRequests } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  });

  const incomingRequestCount = friendRequests?.incomingReqs?.length || 0;

  return {
    unreadMessages,
    conversations,
    incomingRequestCount,
    total: unreadMessages + incomingRequestCount,
  };
};

export default useNotificationCount;
