"use client"

import { useState, useEffect } from "react"
import { format, parse, startOfDay, isBefore, addHours } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getRakiAvailability, setRakiAvailability, removeRakiAvailability } from "@/lib/api"
import { useAuth } from "@/contexts/AuthContexts"

export interface TimeSlot {
    startTime: string
    endTime: string
}

export interface DayAvailability {
    date: string
    timeSlots: TimeSlot[]
}

const HOURS = Array.from({ length: 24 }, (_, i) => i)

export default function AvailabilityPage() {
    const { user:currentUser } = useAuth()
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
    const [availability, setAvailability] = useState<DayAvailability | null>(null)
    const [newSlot, setNewSlot] = useState<{ start: number; end: number }>({ start: 9, end: 10 })
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (selectedDate && currentUser) {
            fetchAvailability(selectedDate)
        }
    }, [selectedDate, currentUser])

    const fetchAvailability = async (date: Date) => {
        setIsLoading(true)
        try {
            const dateKey = format(date, "yyyy-MM-dd")
            const data = await getRakiAvailability(currentUser?._id, dateKey)
            setAvailability(data)
        } catch (error) {
            console.error("Failed to fetch availability:", error)
            toast({
                title: "Error",
                description: "Failed to fetch availability. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    const handleDateSelect = (date: Date | undefined) => {
        setSelectedDate(date)
    }

    const splitTimeRange = (start: number, end: number): TimeSlot[] => {
        const slots: TimeSlot[] = []
        for (let i = start; i < end; i++) {
            slots.push({
                startTime: `${i.toString().padStart(2, "0")}:00`,
                endTime: `${(i + 1).toString().padStart(2, "0")}:00`,
            })
        }
        return slots
    }

    const handleAddTimeSlot = async () => {
        if (!selectedDate || !currentUser) return

        setIsLoading(true)
        const dateKey = format(selectedDate, "yyyy-MM-dd")

        try {
            const newTimeSlots = splitTimeRange(newSlot.start, newSlot.end)
            const newAvailability: DayAvailability = {
                date: dateKey,
                timeSlots: availability ? [...availability.timeSlots, ...newTimeSlots] : newTimeSlots,
            }

            await setRakiAvailability(newAvailability.date,newAvailability.timeSlots)
            setAvailability(newAvailability)

            toast({
                title: "Time slot(s) added",
                description: `Added ${newSlot.start}:00 - ${newSlot.end}:00 to ${format(selectedDate, "MMMM d, yyyy")}`,
            })
        } catch (error) {
            console.error("Failed to add time slot:", error)
            toast({
                title: "Error",
                description: "Failed to add time slot. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    const handleRemoveTimeSlot = async (index: number) => {
        if (!availability || !currentUser) return

        setIsLoading(true)

        try {
            const updatedTimeSlots = availability.timeSlots.filter((_, i) => i !== index)
            const removeTimeSlots = availability.timeSlots.filter((_, i) => i === index)[0]
            const updatedAvailability: DayAvailability = {
                ...availability,
                timeSlots: updatedTimeSlots,
            }

            const dateKey = format(updatedAvailability.date, "yyyy-MM-dd")

            await removeRakiAvailability(dateKey,removeTimeSlots.startTime)
            setAvailability(updatedAvailability)

            toast({
                title: "Time slot removed",
                description: `Removed time slot from ${format(new Date(availability.date), "MMMM d, yyyy")}`,
            })
        } catch (error) {
            console.error("Failed to remove time slot:", error)
            toast({
                title: "Error",
                description: "Failed to remove time slot. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    const isDateInPast = (date: Date) => {
        return isBefore(startOfDay(date), startOfDay(new Date()))
    }

    const formatTimeSlot = (slot: TimeSlot) => {
        return `${slot.startTime} - ${slot.endTime}`
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-primary-700">Manage Your Availability</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Select Date</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={handleDateSelect}
                            className="rounded-md border"
                            disabled={(date) => isBefore(startOfDay(date), startOfDay(new Date()))}
                        />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>{selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Select a Date"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {selectedDate && !isBefore(startOfDay(selectedDate), startOfDay(new Date())) ? (
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="start-time">Start Time</Label>
                                        <Select
                                            value={newSlot.start.toString()}
                                            onValueChange={(value) => setNewSlot({ ...newSlot, start: Number.parseInt(value) })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select start time" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {HOURS.map((hour) => (
                                                    <SelectItem key={hour} value={hour.toString()}>
                                                        {`${hour.toString().padStart(2, "0")}:00`}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label htmlFor="end-time">End Time</Label>
                                        <Select
                                            value={newSlot.end.toString()}
                                            onValueChange={(value) => setNewSlot({ ...newSlot, end: Number.parseInt(value) })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select end time" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {HOURS.map((hour) => (
                                                    <SelectItem key={hour} value={hour.toString()}>
                                                        {`${hour.toString().padStart(2, "0")}:00`}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <Button
                                    onClick={handleAddTimeSlot}
                                    disabled={isLoading || newSlot.start >= newSlot.end}
                                    className="w-full"
                                >
                                    {isLoading ? "Adding..." : "Add Time Slot"}
                                </Button>
                                <div className="mt-4">
                                    <h3 className="text-lg font-semibold mb-2">Available Time Slots:</h3>
                                    {availability?.timeSlots.length === 0 && (
                                        <p className="text-muted-foreground">No time slots available for this date.</p>
                                    )}
                                    {availability?.timeSlots.map((slot, index) => (
                                        <div key={index} className="flex justify-between items-center mb-2 bg-secondary p-2 rounded-md">
                                            <span>{formatTimeSlot(slot)}</span>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleRemoveTimeSlot(index)}
                                                disabled={isLoading}
                                            >
                                                {isLoading ? "Removing..." : "Remove"}
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <p className="text-muted-foreground">
                                {selectedDate
                                    ? "Cannot edit availability for past dates."
                                    : "Please select a date to manage your availability."}
                            </p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

