"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MeetingList } from "./MeetingList"
import { meetings } from "./mockData"

export function AdminView() {
    const [filter, setFilter] = useState("")

    const filteredMeetings = meetings.filter((meeting) =>
        meeting.employeeName.toLowerCase().includes(filter.toLowerCase()),
    )

    return (
        <div>
            <div className="flex items-center space-x-2 mb-4">
                <Input
                    type="text"
                    placeholder="Filter by employee name"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="max-w-sm"
                />
                <Button onClick={() => setFilter("")}>Clear</Button>
            </div>
            <MeetingList meetings={filteredMeetings} isAdmin={true} />
        </div>
    )
}

