import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { format } from "date-fns"

interface RescheduleSessionDialogProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: (newStartDate: Date, newEndDate: Date) => void
}

export function RescheduleSessionDialog({ isOpen, onClose, onConfirm }: RescheduleSessionDialogProps) {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
    const [startTime, setStartTime] = useState("09:00")
    const [endTime, setEndTime] = useState("10:00")

    const handleConfirm = () => {
        if (selectedDate) {
            const [startHours, startMinutes] = startTime.split(":").map(Number)
            const [endHours, endMinutes] = endTime.split(":").map(Number)

            const newStartDate = new Date(selectedDate)
            newStartDate.setHours(startHours, startMinutes)

            const newEndDate = new Date(selectedDate)
            newEndDate.setHours(endHours, endMinutes)

            onConfirm(newStartDate, newEndDate)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Reschedule Session</DialogTitle>
                    <DialogDescription>Please select a new date and time range for the session.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="date">Date</Label>
                        <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            className="rounded-md border !w-[100%] [&_.rdp-months]:w-full [&_.rdp-table]:w-full [&_.rdp]:w-full [&_.rdp-month]:w-full"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="start-time">Start Time</Label>
                            <Input id="start-time" type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="end-time">End Time</Label>
                            <Input id="end-time" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleConfirm} disabled={!selectedDate}>
                        Confirm
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

