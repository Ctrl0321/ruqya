
import { MeetingProvider } from "@/components/getStream/MeetingProvider";
import { MeetingRoom } from "@/components/getStream/MeetingRoom";
import {Suspense} from "react";

export default async function MeetingPage({ params }: PageProps) {
    // Await the params data
    const data = await getData(params.name, params.meetingId);

    return (
        <Suspense
            fallback={
                <div className="flex items-center justify-center h-screen bg-red-600 z-50">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500" />
                </div>
            }
        >
            <div className="">
                <MeetingProvider userId={data.name} callId={data.meetingId}>
                    <MeetingRoom />
                </MeetingProvider>
            </div>

        </Suspense>
    );
}



async function getData(name: string, meetingId: string) {
    return {
        name,
        meetingId,
    };
}


interface PageProps {
    params: {
        name: string;
        meetingId: string;
    }
}
