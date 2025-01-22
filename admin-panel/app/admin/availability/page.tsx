"use client"

import { useState } from "react"
import { format, parse, startOfDay, isBefore } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { setRakiAvailability, removeRakiAvailability } from "@/lib/api"
import { formatDateTimeWithOffset } from "@/lib/utils"

interface TimeSlot {
    startTime: Date
    endTime: Date
}

interface DayAvailability {
    [date: string]: TimeSlot[]
}

export default function AvailabilityPage() {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
    const [availability, setAvailability] = useState<DayAvailability>({})
    const [newSlot, setNewSlot] = useState<TimeSlot>({ startTime: new Date(), endTime: new Date() })
    const [isLoading, setIsLoading] = useState(false)

    const handleDateSelect = (date: Date | undefined) => {
        setSelectedDate(date)
    }

    const handleAddTimeSlot = async () => {
        if (!selectedDate || !newSlot.startTime || !newSlot.endTime) return

        setIsLoading(true)
        const dateKey = format(selectedDate, "yyyy-MM-dd")

        try {
            await setRakiAvailability(selectedDate, [newSlot])

            setAvailability((prev) => ({
                ...prev,
                [dateKey]: [...(prev[dateKey] || []), newSlot],
            }))
            setNewSlot({ startTime: new Date(), endTime: new Date() })

            toast({
                title: "Time slot added",
                description: `Added ${formatDateTimeWithOffset(newSlot.startTime)} - ${formatDateTimeWithOffset(newSlot.endTime)} to ${format(selectedDate, "MMMM d, yyyy")}`,
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

    const handleRemoveTimeSlot = async (date: string, index: number) => {
        setIsLoading(true)
        const slotToRemove = availability[date][index]

        try {
            await removeRakiAvailability(new Date(date), slotToRemove.startTime)

            setAvailability((prev) => ({
                ...prev,
                [date]: prev[date].filter((_, i) => i !== index),
            }))

            toast({
                title: "Time slot removed",
                description: `Removed time slot from ${format(new Date(date), "MMMM d, yyyy")}`,
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

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-primary-700">Availability</h1>
            <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2">
                    <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={handleDateSelect}
                        className="rounded-md border"
                        disabled={(date) => isDateInPast(date)}
                    />
                </div>
                <div className="md:w-1/2">
                    {selectedDate && !isDateInPast(selectedDate) && (
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold">{format(selectedDate, "MMMM d, yyyy")}</h2>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <Label htmlFor="start-time">Start Time</Label>
                                    <Input
                                        id="start-time"
                                        type="time"
                                        value={format(newSlot.startTime, "HH:mm")}
                                        onChange={(e) =>
                                            setNewSlot({
                                                ...newSlot,
                                                startTime: parse(e.target.value, "HH:mm", selectedDate),
                                            })
                                        }
                                    />
                                </div>
                                <div className="flex-1">
                                    <Label htmlFor="end-time">End Time</Label>
                                    <Input
                                        id="end-time"
                                        type="time"
                                        value={format(newSlot.endTime, "HH:mm")}
                                        onChange={(e) =>
                                            setNewSlot({
                                                ...newSlot,
                                                endTime: parse(e.target.value, "HH:mm", selectedDate),
                                            })
                                        }
                                    />
                                </div>
                            </div>
                            <Button onClick={handleAddTimeSlot} disabled={isLoading}>
                                {isLoading ? "Adding..." : "Add Time Slot"}
                            </Button>
                            <div className="mt-4">
                                <h3 className="text-lg font-semibold mb-2">Available Time Slots:</h3>
                                {selectedDate &&
                                    availability[format(selectedDate, "yyyy-MM-dd")]?.map((slot, index) => (
                                        <div key={index} className="flex justify-between items-center mb-2">
                      <span>
                        {formatDateTimeWithOffset(slot.startTime)} - {formatDateTimeWithOffset(slot.endTime)}
                      </span>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleRemoveTimeSlot(format(selectedDate, "yyyy-MM-dd"), index)}
                                                disabled={isLoading}
                                            >
                                                {isLoading ? "Removing..." : "Remove"}
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

