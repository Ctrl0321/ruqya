'use client'

import { useState } from 'react'
import { format, startOfWeek, addDays, isBefore, startOfDay } from 'date-fns'
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

interface TimeSlot {
    start: string;
    end: string;
}

interface DayAvailability {
    [date: string]: TimeSlot[];
}

export default function AvailabilityPage() {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
    const [availability, setAvailability] = useState<DayAvailability>({})
    const [newSlot, setNewSlot] = useState<TimeSlot>({ start: '', end: '' })

    const handleDateSelect = (date: Date | undefined) => {
        console.log(date)
        setSelectedDate(date)
    }

    const handleAddTimeSlot = () => {
        if (!selectedDate || !newSlot.start || !newSlot.end) return

        const dateKey = format(selectedDate, 'yyyy-MM-dd')
        const updatedAvailability = {
            ...availability,
            [dateKey]: [...(availability[dateKey] || []), newSlot]
        }
        setAvailability(updatedAvailability)
        setNewSlot({ start: '', end: '' })

        toast({
            title: "Time slot added",
            description: `Added ${newSlot.start} - ${newSlot.end} to ${format(selectedDate, 'MMMM d, yyyy')}`,
        })
    }

    const handleRemoveTimeSlot = (date: string, index: number) => {
        const updatedAvailability = { ...availability }
        updatedAvailability[date] = updatedAvailability[date].filter((_, i) => i !== index)
        setAvailability(updatedAvailability)

        toast({
            title: "Time slot removed",
            description: `Removed time slot from ${format(new Date(date), 'MMMM d, yyyy')}`,
        })
    }

    const isDateInPast = (date: Date) => {
        return isBefore(startOfDay(date), startOfDay(new Date()))
    }

    return (
        <div className="container mx-auto px-4 py-8 ">
            <h1 className="text-3xl font-bold mb-6 text-primary-700">Availability</h1>
            <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/4">
                    <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={handleDateSelect}
                        className="rounded-md border"
                        disabled={(date:any) => isDateInPast(date)}
                    />
                </div>
                <div className="md:w-1/2">
                    {selectedDate && !isDateInPast(selectedDate) && (
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold">
                                {format(selectedDate, 'MMMM d, yyyy')}
                            </h2>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <Label htmlFor="start-time">Start Time</Label>
                                    <Input
                                        id="start-time"
                                        type="time"
                                        value={newSlot.start}
                                        onChange={(e) => setNewSlot({ ...newSlot, start: e.target.value })}
                                    />
                                </div>
                                <div className="flex-1">
                                    <Label htmlFor="end-time">End Time</Label>
                                    <Input
                                        id="end-time"
                                        type="time"
                                        value={newSlot.end}
                                        onChange={(e) => setNewSlot({ ...newSlot, end: e.target.value })}
                                    />
                                </div>
                            </div>
                            <Button onClick={handleAddTimeSlot}>Add Time Slot</Button>
                            <div className="mt-4">
                                <h3 className="text-lg font-semibold mb-2">Available Time Slots:</h3>
                                {availability[format(selectedDate, 'yyyy-MM-dd')]?.map((slot, index) => (
                                    <div key={index} className="flex justify-between items-center mb-2">
                                        <span>{slot.start} - {slot.end}</span>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleRemoveTimeSlot(format(selectedDate, 'yyyy-MM-dd'), index)}
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {selectedDate && isDateInPast(selectedDate) && (
                        <p className="text-red-500">Cannot edit availability for past dates.</p>
                    )}
                </div>
            </div>
        </div>
    )
}

