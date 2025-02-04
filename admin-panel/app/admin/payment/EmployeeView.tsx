"use client"

import { MeetingList } from "./MeetingList"
import { meetings } from "./mockData"

// Mock function to get current employee ID - replace with your actual auth logic
const getCurrentEmployeeId = () => 1

export function EmployeeView() {
    const currentEmployeeId = getCurrentEmployeeId()
    const employeeMeetings = meetings.filter((meeting) => meeting.employeeId === currentEmployeeId)

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Your Meetings</h2>
            <MeetingList meetings={employeeMeetings} isAdmin={false} />
        </div>
    )
}

