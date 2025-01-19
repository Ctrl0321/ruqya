'use client'

import { useEffect, useState } from 'react'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getRevenueData, getClassData, getTodaySessions, cancelSession, rescheduleSession } from '@/lib/api'
import { useAuth } from '@/contexts/AuthContexts'
import { format } from 'date-fns'
import { CancelSessionDialog } from '@/components/CancelSessionDialog'
import { RescheduleSessionDialog } from '@/components/ResheduledSessionDialog'
import { DateRangeFilter } from '@/components/DateRangeFilter'

interface Session {
    meetingId: string;
    topic: string;
    date: Date;
    rakiId: string;
    userId: string;
    notificationSend: boolean;
}

const FIXED_SESSION_FEE = 50;

export default function AdminDashboard() {
    const { user } = useAuth()
    const [revenueData, setRevenueData] = useState([])
    const [classData, setClassData] = useState([])
    const [selectedMonth, setSelectedMonth] = useState(format(new Date(), 'yyyy-MM'))
    const [totalSessions, setTotalSessions] = useState(0)
    const [totalRevenue, setTotalRevenue] = useState(0)
    const [todayClasses, setTodayClasses] = useState(0)
    const [todaySessions, setTodaySessions] = useState<Session[]>([])
    const [cancelSessionId, setCancelSessionId] = useState<string | null>(null)
    const [rescheduleSessionId, setRescheduleSessionId] = useState<string | null>(null)
    const [dateFilter, setDateFilter] = useState({ type: 'all' })

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (user?.role === 'admin') {
                    const revenue = await getRevenueData(dateFilter)
                    const classes = await getClassData(dateFilter)
                    setRevenueData(revenue)
                    setClassData(classes)
                }

                const sessions = await getTodaySessions(dateFilter)
                setTodaySessions(sessions)

                setTotalSessions(sessions.length)
                setTotalRevenue(sessions.length * FIXED_SESSION_FEE)
                setTodayClasses(sessions.filter(session => new Date(session.date).toDateString() === new Date().toDateString()).length)
            } catch (error) {
                console.error('Failed to fetch dashboard data:', error)
            }
        }

        fetchData()
    }, [user, dateFilter])

    const handleDateFilterChange = (filter: { type: string; start?: Date; end?: Date }) => {
        console.log("Filter",filter)
        setDateFilter(filter)
    }

    const handleCancelSession = async (meetingId: string, reason: string) => {
        try {
            await cancelSession(meetingId, reason)
            // Refresh today's sessions
            const sessions = await getTodaySessions(dateFilter)
            setTodaySessions(sessions)
            setCancelSessionId(null)
        } catch (error) {
            console.error('Failed to cancel session:', error)
        }
    }

    const handleRescheduleSession = async (meetingId: string, newDate: Date) => {
        try {
            await rescheduleSession(meetingId, newDate.toISOString())
            // Refresh today's sessions
            const sessions = await getTodaySessions(dateFilter)
            setTodaySessions(sessions)
            setRescheduleSessionId(null)
        } catch (error) {
            console.error('Failed to reschedule session:', error)
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-primary-700">Admin Dashboard</h1>
                <DateRangeFilter onFilterChange={handleDateFilterChange} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Sessions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">{totalSessions}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Total Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">${totalRevenue.toFixed(2)}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Today's Classes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">{todayClasses}</p>
                    </CardContent>
                </Card>
            </div>

            {user?.role === 'admin' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Revenue</CardTitle>
                            <CardDescription>Revenue for the selected period</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer
                                config={{
                                    revenue: {
                                        label: "Revenue",
                                        color: "hsl(var(--primary-500))",
                                    },
                                }}
                                className="h-[300px]"
                            >
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={revenueData}>
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Bar dataKey="revenue" fill="var(--color-revenue)" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Classes</CardTitle>
                            <CardDescription>Number of classes for the selected period</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer
                                config={{
                                    classes: {
                                        label: "Classes",
                                        color: "hsl(var(--secondary-500))",
                                    },
                                }}
                                className="h-[300px]"
                            >
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={classData}>
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Bar dataKey="classes" fill="var(--color-classes)" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </div>
            )}

            <Card>
                <CardHeader>
                    <CardTitle>Sessions</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[25%]">Topic</TableHead>
                                    <TableHead className="w-[20%]">Raki ID</TableHead>
                                    <TableHead className="w-[20%]">User ID</TableHead>
                                    <TableHead className="w-[15%]">Time</TableHead>
                                    <TableHead className="w-[20%]">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {todaySessions.map((session) => (
                                    <TableRow key={session.meetingId}>
                                        <TableCell className="font-medium">{session.topic}</TableCell>
                                        <TableCell>{session.rakiId}</TableCell>
                                        <TableCell>{session.userId}</TableCell>
                                        <TableCell>{format(new Date(session.date), 'yyyy-MM-dd HH:mm')}</TableCell>
                                        <TableCell>
                                            <Button variant="destructive" size="sm" className="mr-2" onClick={() => setCancelSessionId(session.meetingId)}>
                                                Cancel
                                            </Button>
                                            <Button variant="outline" size="sm" onClick={() => setRescheduleSessionId(session.meetingId)}>
                                                Reschedule
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
            <CancelSessionDialog
                isOpen={!!cancelSessionId}
                onClose={() => setCancelSessionId(null)}
                onConfirm={(reason) => cancelSessionId && handleCancelSession(cancelSessionId, reason)}
            />
            <RescheduleSessionDialog
                isOpen={!!rescheduleSessionId}
                onClose={() => setRescheduleSessionId(null)}
                onConfirm={(newDate) => rescheduleSessionId && handleRescheduleSession(rescheduleSessionId, newDate)}
            />
        </div>
    )
}

