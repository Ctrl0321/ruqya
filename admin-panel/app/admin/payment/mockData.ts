import type { Meeting } from "./types"

export const meetings: Meeting[] = [
    {
        id: 1,
        date: "2024-02-01T10:00:00",
        topic: "Introduction to Mindfulness",
        duration: 60,
        employeeId: 1,
        employeeName: "John Doe",
        paymentStatus: "paid",
    },
    {
        id: 2,
        date: "2024-02-15T14:00:00",
        topic: "Stress Management Techniques",
        duration: 90,
        employeeId: 2,
        employeeName: "Jane Smith",
        paymentStatus: "unpaid",
    },
    {
        id: 3,
        date: "2024-01-20T11:00:00",
        topic: "Cognitive Behavioral Therapy Basics",
        duration: 75,
        employeeId: 1,
        employeeName: "John Doe",
        paymentStatus: "requested",
    },
    {
        id: 4,
        date: "2024-03-01T09:00:00",
        topic: "Dealing with Anxiety",
        duration: 60,
        employeeId: 3,
        employeeName: "Emily Brown",
        paymentStatus: "unpaid",
    },
    {
        id: 5,
        date: "2024-02-28T13:00:00",
        topic: "Positive Psychology Workshop",
        duration: 120,
        employeeId: 2,
        employeeName: "Jane Smith",
        paymentStatus: "paid",
    },
]

