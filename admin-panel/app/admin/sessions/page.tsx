"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SessionList } from "@/components/SessionList"

// Mock data for sessions (you would typically fetch this from an API)
const sessions = [
    {
        id: 1,
        title: "Introduction to Mindfulness",
        date: "2024-02-01T10:00:00",
        duration: 60,
        status: "completed",
        image: `/placeholder.svg?height=200&width=400`,
        rakiName: "Dr. Jane Doe",
    },
    {
        id: 2,
        title: "Stress Management Techniques",
        date: "2024-02-15T14:00:00",
        duration: 90,
        status: "upcoming",
        image: `/placeholder.svg?height=200&width=400`,
        rakiName: "Dr. John Smith",
    },
    {
        id: 3,
        title: "Cognitive Behavioral Therapy Basics",
        date: "2024-01-20T11:00:00",
        duration: 75,
        status: "completed",
        image: `/placeholder.svg?height=200&width=400`,
        rakiName: "Dr. Emily Brown",
    },
    {
        id: 4,
        title: "Dealing with Anxiety",
        date: "2024-03-01T09:00:00",
        duration: 60,
        status: "upcoming",
        image: `/placeholder.svg?height=200&width=400`,
        rakiName: "Dr. Michael Johnson",
    },
    {
        id: 5,
        title: "Positive Psychology Workshop",
        date: "2024-02-28T13:00:00",
        duration: 120,
        status: "upcoming",
        image: `/placeholder.svg?height=200&width=400`,
        rakiName: "Dr. Sarah Williams",
    },
]

export default function SessionsPage() {
    const [activeTab, setActiveTab] = useState("all")

    const filteredSessions = sessions.filter((session) => {
        if (activeTab === "completed") return session.status === "completed"
        if (activeTab === "upcoming") return session.status === "upcoming"
        return true
    })

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Sessions</h1>
            <Tabs defaultValue="all" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3 mb-6">
                    <TabsTrigger value="all">All Sessions</TabsTrigger>
                    <TabsTrigger value="completed">Completed Sessions</TabsTrigger>
                    <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
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

