import { useState } from "react"
import type { Meeting } from "./types"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

interface MeetingListProps {
    meetings: Meeting[]
    isAdmin: boolean
}

export function MeetingList({ meetings, isAdmin }: MeetingListProps) {
    const [updatedMeetings, setUpdatedMeetings] = useState(meetings)

    const handlePaymentAction = (meetingId: number, action: "pay" | "request") => {
        setUpdatedMeetings((prevMeetings) =>
            prevMeetings.map((meeting) =>
                meeting.id === meetingId
                    ? {
                        ...meeting,
                        paymentStatus: action === "pay" ? "paid" : "requested",
                    }
                    : meeting,
            ),
        )
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Topic</TableHead>
                    <TableHead>Duration</TableHead>
                    {isAdmin && <TableHead>Employee</TableHead>}
                    <TableHead>Payment Status</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {updatedMeetings.map((meeting) => (
                    <TableRow key={meeting.id}>
                        <TableCell>{format(new Date(meeting.date), "PPP")}</TableCell>
                        <TableCell>{meeting.topic}</TableCell>
                        <TableCell>{meeting.duration} minutes</TableCell>
                        {isAdmin && <TableCell>{meeting.employeeName}</TableCell>}
                        <TableCell>
                            <Badge
                                variant={
                                    meeting.paymentStatus === "paid"
                                        ? "default"
                                        : meeting.paymentStatus === "requested"
                                            ? "secondary"
                                            : "outline"
                                }
                            >
                                {meeting.paymentStatus}
                            </Badge>
                        </TableCell>
                        <TableCell>
                            {isAdmin
                                ? meeting.paymentStatus !== "paid" && (
                                <Button size="sm" onClick={() => handlePaymentAction(meeting.id, "pay")}>
                                    Mark as Paid
                                </Button>
                            )
                                : meeting.paymentStatus === "unpaid" && (
                                <Button size="sm" variant="outline" onClick={() => handlePaymentAction(meeting.id, "request")}>
                                    Request Payment
                                </Button>
                            )}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

