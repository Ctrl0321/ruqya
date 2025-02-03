"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SessionList} from "@/components/SessionList"

const sessions = [
    {
        id: 1,
        meetingId:1002,
        topic: "Introduction to Mindfulness",
        date: "2024-02-01T10:00:00",
        duration: 60,
        rakiId:"34242534535",
        userId:"ee6r327782347",
        note:"",
        notificationSend:false
    },
    {
        id: 1,
        meetingId:1002,
        topic: "Introduction to Mindfulness",
        date: "2024-02-01T10:00:00",
        duration: 60,
        rakiId:"34242534535",
        userId:"ee6r327782347",
        note:"",
        notificationSend:false
    },
    {
        id: 1,
        meetingId:1002,
        topic: "Introduction to Mindfulness",
        date: "2024-02-01T10:00:00",
        duration: 60,
        rakiId:"34242534535",
        userId:"ee6r327782347",
        note:"",
        notificationSend:false
    },
    {
        id: 1,
        meetingId:1002,
        topic: "Introduction to Mindfulness",
        date: "2024-02-01T10:00:00",
        duration: 60,
        rakiId:"34242534535",
        userId:"ee6r327782347",
        note:"",
        notificationSend:false
    },
    {
        id: 1,
        meetingId:1002,
        topic: "Introduction to Mindfulness",
        date: "2024-02-01T10:00:00",
        duration: 60,
        rakiId:"34242534535",
        userId:"ee6r327782347",
        note:"",
        notificationSend:false
    },
]

export default function SessionsPage() {
    const [activeTab, setActiveTab] = useState("all")

    const filteredSessions = sessions.filter((session) => {
        if (activeTab === "completed") return session.notificationSend
        if (activeTab === "upcoming") return !session.notificationSend
        return true
    })

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Sessions</h1>
            <Tabs defaultValue="all" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3 mb-6 bg-gray-100 p-1 rounded-lg">
                    <TabsTrigger value="all" className="data-[state=active]:bg-primary-200 data-[state=active]:text-white data-[state=active]:font-bold ">
                        All Sessions
                    </TabsTrigger>
                    <TabsTrigger value="completed" className="data-[state=active]:bg-primary-200 data-[state=active]:text-white data-[state=active]:font-bold">
                        Completed Sessions
                    </TabsTrigger>
                    <TabsTrigger value="upcoming" className="data-[state=active]:bg-primary-200 data-[state=active]:text-white data-[state=active]:font-bold">
                        Upcoming Sessions
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="all">
                    <SessionList sessions={filteredSessions} />
                </TabsContent>
                <TabsContent value="completed">
                    <SessionList sessions={filteredSessions} />
                </TabsContent>
                <TabsContent value="upcoming">
                    <SessionList sessions={filteredSessions} />
                </TabsContent>
            </Tabs>
        </div>
    )
}

