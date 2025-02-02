'use client'

import { Chat, Channel, ChannelHeader, MessageList, MessageInput, Thread, Window } from "stream-chat-react";
import { useChatClient } from "@/components/getStream/chat/useChatClient";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

export default function ChatApp() {
    const params = useParams();
    const [data, setData] = useState<{ userId: string; otherUserId: string } | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Initialize chat client with empty strings, will update when data is loaded
    const { client, channel } = useChatClient(
        data?.userId || '',
        data?.otherUserId || ''
    );

    useEffect(() => {
        const getData = async () => {
            try {
                const userId = params.userId as string;
                const otherUserId = params.otherUserId as string;

                setData({
                    userId,
                    otherUserId,
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        getData();
    }, [params]);

    // Loading state while fetching params
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-full">
                <div className="flex items-center justify-center">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="rounded-full h-16 w-16 border-t-4 border-b-4 border-[#0C8281] "
                    />
                </div>
                <div className="text-center">
                    <h3 className="text-xl text-primary-200 font-semibold animate-pulse mt-4">
                        Connecting to meeting...
                    </h3>
                </div>
            </div>
        );
    }

    // Error state for invalid parameters
    if (!data) {
        return <div>Invalid Chat Parameters</div>;
    }

    // Loading state while connecting to chat
    if (!client || !channel) {
        return (
            <div className="flex flex-col items-center justify-center h-full">
                <div className="flex items-center justify-center">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="rounded-full h-16 w-16 border-t-4 border-b-4 border-[#0C8281] "
                    />
                </div>
                <div className="text-center">
                    <h3 className="text-xl text-primary-200 font-semibold animate-pulse mt-4">
                        Initializing chat...
                    </h3>
                </div>
            </div>
        );
    }

    return (
        <Chat client={client}>
            <Channel channel={channel}>
                <Window>
                    <ChannelHeader />
                    <MessageList />
                    <MessageInput />
                </Window>
                <Thread />
            </Channel>
        </Chat>
    );
}