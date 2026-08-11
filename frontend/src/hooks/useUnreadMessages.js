import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { StreamChat } from "stream-chat";
import { getStreamToken } from "../lib/api";
import useAuthUser from "./useAuthUser";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

// Tracks unread Stream Chat conversations for the logged-in user - both a
// total count (for badges) and a list with sender info (for a "new
// messages" section in the Notifications page). Stays live via Stream's
// websocket events, no polling.
const useUnreadMessages = () => {
  const { authUser } = useAuthUser();
  const [conversations, setConversations] = useState([]);

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  useEffect(() => {
    if (!tokenData?.token || !authUser) return;

    let isMounted = true;
    const client = StreamChat.getInstance(STREAM_API_KEY);

    const refreshConversations = async () => {
      try {
        const channels = await client.queryChannels(
          { members: { $in: [authUser._id] } },
          { last_message_at: -1 },
          { watch: true, state: true }
        );

        const unread = channels
          .filter((channel) => channel.state.unreadCount > 0)
          .map((channel) => {
            const otherMember = Object.values(channel.state.members || {}).find(
              (member) => member.user?.id !== authUser._id
            );
            const lastMessage = channel.state.messages?.[channel.state.messages.length - 1];

            return {
              channelId: channel.id,
              otherUserId: otherMember?.user?.id,
              otherUserName: otherMember?.user?.name || "Someone",
              otherUserImage: otherMember?.user?.image,
              unreadCount: channel.state.unreadCount,
              lastMessageText: lastMessage?.text || "Sent you a message",
            };
          })
          .filter((c) => c.otherUserId);

        if (isMounted) setConversations(unread);
      } catch (error) {
        console.error("Error fetching unread conversations:", error);
      }
    };

    const init = async () => {
      try {
        if (!client.userID) {
          await client.connectUser(
            {
              id: authUser._id,
              name: authUser.fullName,
              image: authUser.profilePic,
            },
            tokenData.token
          );
        }
        await refreshConversations();
      } catch (error) {
        console.error("Error connecting to Stream for unread messages:", error);
      }
    };

    init();

    client.on("notification.message_new", refreshConversations);
    client.on("notification.mark_read", refreshConversations);
    client.on("message.new", refreshConversations);

    return () => {
      isMounted = false;
      client.off("notification.message_new", refreshConversations);
      client.off("notification.mark_read", refreshConversations);
      client.off("message.new", refreshConversations);
    };
  }, [tokenData, authUser]);

  const total = conversations.reduce((sum, c) => sum + c.unreadCount, 0);

  return { total, conversations };
};

export default useUnreadMessages;
