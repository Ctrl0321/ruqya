"use client"

import { useCallback, useEffect, useRef, useState, ReactNode, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
    StreamVideoClient,
    Call,
    CallState,
    CameraManager,
    MicrophoneManager
} from "@stream-io/video-react-sdk";
import { LoadingScreen } from "./LoadingScreen";

interface MeetingProviderProps {
    children: (props: { client: StreamVideoClient; call: Call }) => ReactNode;
    userId: string;
    meetingId: string;
}

export const MeetingProvider: React.FC<MeetingProviderProps> = ({ children, userId, meetingId }) => {
    const [token, setToken] = useState<string | null>(null);
    const [client, setClient] = useState<StreamVideoClient | null>(null);
    const [call, setCall] = useState<Call | null>(null);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const hasLeft = useRef(false);

    // Check meeting authorization and fetch token
    const initializeMeeting = useCallback(async () => {
        try {
            const meetingResponse = await axios.get(`${process.env.REACT_APP_API_URL}/meetings/${meetingId}`);
            const { rakiId, userId: participantId } = meetingResponse.data;

            if (userId !== rakiId && userId !== participantId) {
                setError("You are not authorized to join this meeting");
                return;
            }

            const role = userId === rakiId ? "admin" : "member";

            const tokenResponse = await axios.post(`${process.env.REACT_APP_API_URL}/getstream-token`, {
                userId,
                role,
            });

            setToken(tokenResponse.data.token);
        } catch (error: any) {
            console.error("Error initializing meeting:", error);
            setError(error.response?.status === 404 ? "Meeting not found" : "Failed to initialize meeting");
            navigate("/");
        }
    }, [userId, meetingId, navigate]);

    useEffect(() => {
        if (userId && meetingId) {
            initializeMeeting();
        }
    }, [userId, meetingId, initializeMeeting]);

    useEffect(() => {
        if (!token) return;

        const clientInstance = new StreamVideoClient({
            apiKey: process.env.REACT_APP_API_KEY || "",
            user: {
                id: userId,
                name: userId,
            },
            token,
        });

        const callInstance:any = clientInstance.call("default", meetingId);
        setClient(clientInstance);
        setCall(callInstance);

        const joinCall = async () => {
            try {
                await callInstance.join({ create: false });
            } catch (error) {
                console.error("Error joining call:", error);
                setError("Failed to join meeting");
                navigate("/");
            }
        };

        joinCall();

        callInstance.on("leave", () => {
            if (!hasLeft.current) {
                hasLeft.current = true;
                navigate("/");
            }
        });

        return () => {
            if (!hasLeft.current) {
                hasLeft.current = true;
                callInstance?.leave();
            }
            clientInstance?.disconnectUser();
        };
    }, [token, userId, meetingId, navigate]);

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-red-600 mb-4">{error}</h2>
                    <button
                        onClick={() => navigate("/")}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Return Home
                    </button>
                </div>
            </div>
        );
    }

    if (!client || !call || !token) {
        return <LoadingScreen />;
    }

    // Use useMemo to ensure `call` remains a valid type
    const wrappedCall: Call = useMemo(() => {
        if (!call) return null as unknown as Call; // Ensure `call` is always defined

        return {
            ...call,
            leave: () => {
                if (!hasLeft.current) {
                    hasLeft.current = true;
                    call.leave();
                }
            },
        } as Call;
    }, [call]);

    return <>{children({ client, call: wrappedCall })}</>;
};
