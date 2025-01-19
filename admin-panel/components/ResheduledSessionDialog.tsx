import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { format } from 'date-fns'

interface RescheduleSessionDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (newDate: Date) => void;
}

export function RescheduleSessionDialog({ isOpen, onClose, onConfirm }: RescheduleSessionDialogProps) {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
    const [selectedTime, setSelectedTime] = useState('12:00')

    const handleConfirm = () => {
        if (selectedDate) {
            const [hours, minutes] = selectedTime.split(':').map(Number)
            const newDate = new Date(selectedDate)
            newDate.setHours(hours, minutes)
            onConfirm(newDate)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Reschedule Session</DialogTitle>
                    <DialogDescription>
                        Please select a new date and time for the session.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="rounded-md border"
                    />
                    <input
                        type="time"
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className="border rounded-md p-2"
                    />
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleConfirm} disabled={!selectedDate}>Confirm</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

