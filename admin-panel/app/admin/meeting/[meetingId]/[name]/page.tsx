'use client';

import { MeetingProvider } from "@/components/getStream/MeetingProvider";
import { MeetingRoom } from "@/components/getStream/MeetingRoom";
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function MeetingPage() {
    const params = useParams();
    const [data, setData] = useState<{ name: string; meetingId: string } | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            try {
                const name = params.name as string;
                const meetingId = params.meetingId as string;

                setData({
                    name,
                    meetingId,
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        getData();
    }, [params]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen ">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500" />
            </div>
        );
    }

    if (!data) {
        return <div>Error loading meeting data</div>;
    }

    return (
            <MeetingProvider userId={data.name} callId={data.meetingId}>
                <MeetingRoom />
            </MeetingProvider>

    );
}