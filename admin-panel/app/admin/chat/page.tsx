"use client";


import {
    Chat,
    Channel,
    ChannelList,
    Window,
    ChannelHeader,
    MessageList,
    MessageInput,
    Thread,
    useCreateChatClient,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";
import {useEffect, useState} from "react";
import {getStreamChatToken} from "@/lib/api";

const apiKey = "5cs96tqkyvv3";
const userId = "679bba3f3d6f1d200346271e";

const filters = { members: { $in: [userId] }, type: "messaging" };
const options = { presence: true, state: true };
// const sort : DefaultStreamChatGenerics= { last_message_at: -1 };

const useChatClient = (userId:string) => {
    const [token, setToken] = useState(null);

    useEffect(() => {
        if (!userId) return;

        const fetchToken = async () => {
            try {
                const  token  = await getStreamChatToken(userId);
                setToken(token);
                console.log("++++++++++++++",token)
            } catch (error) {
                console.error("Error fetching chat token:", error);
            }
        };

        fetchToken();
    }, [userId]);

    console.log("-----------------",token)

    const client = useCreateChatClient({
        apiKey,
        tokenOrProvider: token,
        userData: { id: userId },
    });

    console.log("Client initialized:", client); // Log client

    return client;
};

export  default function ChatApp() {
    const client = useChatClient(userId);
    console.log(client)

    if (!client) return <div>Loading...</div>;

    return (
        <Chat client={client}>
            <ChannelList filters={filters} options={options} />
            <Channel>
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