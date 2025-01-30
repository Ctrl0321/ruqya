'use client';

import {
    StreamVideo,
    StreamCall,
    StreamTheme,
    SpeakerLayout,
    useCallStateHooks,
    NoiseCancellationProvider
} from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import { useMeeting } from './MeetingProvider';
import { Controls } from './Controls';
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "react-tooltip/dist/react-tooltip.css";
import { NoiseCancellation } from "@stream-io/audio-filters-web";
import { useMemo } from "react";

export const MeetingRoom: React.FC = () => {
    const { client, call, error } = useMeeting();
    const router = useRouter();
    const noiseCancellation = useMemo(() => new NoiseCancellation(), []);

    const ParticipantCount = () => {
        const { useParticipants } = useCallStateHooks();
        const participants = useParticipants();

        return (
            <div className="fixed top-15 right-8 z-50 px-4 py-2 bg-black/60 text-white rounded-lg font-medium flex items-center space-x-2">
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                </svg>
                <span>{participants.length}</span>
            </div>
        );
    };

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-red-600 mb-4">{error}</h2>
                    <button
                        onClick={() => router.push('/')}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Return Home
                    </button>
                </div>
            </div>
        );
    }

    if (!client || !call) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500" />
            </div>
        );
    }

    return (
        <StreamVideo client={client}>
            <StreamCall call={call}>
                <StreamTheme>
                    <ParticipantCount />
                    <SpeakerLayout participantsBarPosition="bottom" />
                    <Controls onLeave={() => router.push('/')} />
                </StreamTheme>
            </StreamCall>
        </StreamVideo>
    );
};