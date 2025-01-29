"use client"; // Ensure this directive is present for client-side functionality

import React, { useMemo } from "react";
import { useRouter } from "next/router"; // For navigation
import { MeetingProvider } from "@/components/getStream/MeetingProvider";
import { StreamVideo, StreamCall, NoiseCancellationProvider, BackgroundFiltersProvider } from "@stream-io/video-react-sdk";
import { NoiseCancellation } from "@stream-io/audio-filters-web";
import { useParams } from "next/navigation";
import { MeetingLayout } from "@/components/getStream/MeetingLayout";

const MeetingPage: React.FC = () => {
    const { name, meetingId } = useParams(); // To get the params from the URL
    const router = useRouter(); // For programmatic navigation
    const noiseCancellation = useMemo(() => new NoiseCancellation(), []);

    if (!name || !meetingId) {
        router.push("/"); // Redirect if parameters are missing
        return null;
    }

    return (
        <MeetingProvider userId={name.toString()} meetingId={meetingId.toString()}>
            {({ client, call }) => (
                <StreamVideo client={client}>
                    <StreamCall call={call}>
                        <NoiseCancellationProvider noiseCancellation={noiseCancellation}>
                            <BackgroundFiltersProvider
                                backgroundFilter="blur"
                                backgroundImages={[]}
                                onError={(error) => {
                                    console.error("Blur filter error:", error);
                                    call?.camera.disable();
                                }}
                            >
                                <MeetingLayout navigate={router.push} />
                            </BackgroundFiltersProvider>
                        </NoiseCancellationProvider>
                    </StreamCall>
                </StreamVideo>
            )}
        </MeetingProvider>
    );
};

export default MeetingPage; // Ensure default export is used
