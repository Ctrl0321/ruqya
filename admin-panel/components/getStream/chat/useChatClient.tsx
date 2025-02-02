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

                const channelId = `dm_${userId}_${otherUserId}`;
                const dmChannel = currentClient.channel("messaging", channelId, {
                    name: "Private Chat",
                    members: [userId, otherUserId],
                    created_by_id: userId,
                });

                await dmChannel.watch();

                if (isMounted) {
                    setChannel(dmChannel);
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