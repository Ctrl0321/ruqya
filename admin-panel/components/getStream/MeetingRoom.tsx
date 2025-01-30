'use client'

import { StreamVideo, StreamCall, StreamTheme, SpeakerLayout } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import { useMeeting } from './MeetingProvider';
import { Controls } from './Controls';
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "react-tooltip/dist/react-tooltip.css";


export const MeetingRoom: React.FC = () => {
    const { client, call, error } = useMeeting();
    const router = useRouter();

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

    if (!client || !call || call.participants.length==0 ) {
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
                    <div className="fixed top-4 right-4 z-50 px-3 py-1 bg-black/50 text-white rounded bg-black">
                        Participants: {call.participants.length}
                    </div>
                    <SpeakerLayout participantsBarPosition="bottom"  />
                    <Controls onLeave={() => router.push('/')} />
                </StreamTheme>
            </StreamCall>
        </StreamVideo>
    );
};