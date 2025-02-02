"use client";
import { useEffect, useState, useRef } from "react";
import { StreamChat, Channel as StreamChannel } from "stream-chat";
import { getStreamChatToken } from "@/lib/api";
import "stream-chat-react/dist/css/v2/index.css";
import { useAuth } from "@/contexts/AuthContexts";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY_CHAT || "";


const createChannelName = (currentUser: string, otherUser: string) => {
    if (!currentUser || !otherUser) return "";
    // return `${otherUser.firstName || otherUser.name || otherUser.id}'s Chat`;
    return `${otherUser}'s Chat`;
};

export const useChatClient = (userId: string, otherUserId: string) => {
    const [client, setClient] = useState<StreamChat | null>(null);
    const [channel, setChannel] = useState<StreamChannel | null>(null);
    const [allChannels, setAllChannels] = useState<StreamChannel[]>([]);
    const { user: currentUser } = useAuth();
    const chatClientRef = useRef<StreamChat | null>(null);

    // Function to get all channels for admin
    const fetchAdminChannels = async (currentClient: StreamChat) => {
        try {
            const channels = await currentClient.queryChannels(
                { type: 'messaging' },
                { last_message_at: -1 },
                { watch: true, state: true }
            );
            setAllChannels(channels);
            return channels;
        } catch (error) {
            console.error("Error fetching admin channels:", error);
            return [];
        }
    };

    // Function to select a specific channel
    const selectChannel = async (selectedChannel: StreamChannel) => {
        try {
            await selectedChannel.watch();
            setChannel(selectedChannel);
        } catch (error) {
            console.error("Error selecting channel:", error);
        }
    };

    useEffect(() => {
        if (!userId) return;

        if (!chatClientRef.current) {
            chatClientRef.current = StreamChat.getInstance(apiKey);
        }

        let isMounted = true;
        const currentClient = chatClientRef.current;

        const initChat = async () => {
            try {
                const token = await getStreamChatToken(userId);

                if (!currentClient.userID) {
                    await currentClient.connectUser({ id: userId }, token);
                }

                if (isMounted) {
                    setClient(currentClient);
                }

                if (currentUser?.role === "super-admin") {
                    const adminChannels = await fetchAdminChannels(currentClient);

                    if (otherUserId) {
                        const sortedMembers = [userId, otherUserId].sort();
                        const channelId = `dm_${sortedMembers[0]}_${sortedMembers[1]}`;

                        // Find existing channel
                        const existingChannel = adminChannels.find(ch => ch.id === channelId);

                        if (existingChannel) {
                            await selectChannel(existingChannel);
                        } else {
                            const channelName = createChannelName(userId, otherUserId);

                            const newChannel = currentClient.channel('messaging', channelId, {
                                members: sortedMembers,
                                created_by_id: userId,
                                name: channelName,

                            });
                            await newChannel.watch();
                            setChannel(newChannel);
                        }
                    }
                } else {
                    if (otherUserId) {
                        const sortedMembers = [userId, otherUserId].sort();
                        const channelId = `dm_${sortedMembers[0]}_${sortedMembers[1]}`;

                        const channels = await currentClient.queryChannels({
                            id: channelId,
                            type: 'messaging',
                            members: { $in: [userId] }
                        }, {}, { watch: true, state: true });

                        if (channels.length === 0) {
                            const newChannel = currentClient.channel('messaging', channelId, {
                                members: sortedMembers,
                                created_by_id: userId,
                            });
                            await newChannel.watch();
                            setChannel(newChannel);
                        } else {
                            setChannel(channels[0]);
                        }
                    }
                }
            } catch (error) {
                console.error("Error initializing chat:", error);
            }
        };

        initChat();

        return () => {
            isMounted = false;
            if (currentClient.userID) {
                currentClient.disconnectUser();
            }
        };
    }, [userId, otherUserId, currentUser?.role]);

    return {
        client,
        channel,
        allChannels,
        selectChannel,
        isAdmin: currentUser?.role === "super-admin"
    };
};