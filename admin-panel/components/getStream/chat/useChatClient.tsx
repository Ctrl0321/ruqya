"use client";
import { useEffect, useState, useRef } from "react";
import { StreamChat, Channel as StreamChannel } from "stream-chat";
import { getStreamChatToken } from "@/lib/api";
import "stream-chat-react/dist/css/v2/index.css";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY_CHAT||"";

export const useChatClient = (userId: string, otherUserId: string) => {
    const [client, setClient] = useState<StreamChat | null>(null);
    const [channel, setChannel] = useState<StreamChannel | null>(null);


    const chatClientRef = useRef<StreamChat | null>(null);

    useEffect(() => {
        if (!userId || !otherUserId) return;

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

                const sortedMembers = [userId, otherUserId].sort();
                const channelId = `dm_${sortedMembers[0]}_${sortedMembers[1]}`;

                // Query existing channels first
                const channels = await currentClient.queryChannels({
                    id: channelId,
                    type: 'messaging',
                    members: { $in: [userId] }
                }, {}, { watch: true, state: true });

                let chatChannel;

                if (channels.length === 0) {
                    // Only create a new channel if none exists
                    chatChannel = currentClient.channel('messaging', channelId, {
                        members: sortedMembers,
                        created_by_id: userId,
                    });
                    await chatChannel.watch();
                } else {
                    // Use existing channel
                    chatChannel = channels[0];
                }

                if (isMounted) {
                    setChannel(chatChannel);
                    setClient(currentClient);
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
    }, [userId, otherUserId]);

    return { client, channel };
};