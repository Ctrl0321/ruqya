'use client'

import {useEffect, useState} from 'react'
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {
    cancelSession,
    getRakis,
    getRevenueData,
    getTodaySessions, getUsers,
    rescheduleSession
} from '@/lib/api'
import {useAuth} from '@/contexts/AuthContexts'
import {format} from 'date-fns'
import {CancelSessionDialog} from '@/components/CancelSessionDialog'
import {RescheduleSessionDialog} from '@/components/ResheduledSessionDialog'
import {DateRangeFilter} from '@/components/DateRangeFilter'
import {formatDateTimeWithOffset, getNameById} from "@/lib/utils";
import {useChat} from "@/components/getStream/chat/ChatContextProvider";
import {ChatWidgetWrapper} from "@/components/getStream/chat/ChatWidgetWrapper";
import {toast} from "@/components/ui/use-toast";
import withAuth from "@/hoc/withAuth";

interface Session {
    meetingId: string;
    topic: string;
    date: Date;
    rakiId: string;
    userId: string;
    notificationSend: boolean;
}


const AdminDashboard =()=> {
    const { setUserId } = useChat();
    const { user :currentUser} = useAuth()
    const [revenueData, setRevenueData] = useState({
        totalMeetings: 0,
        completedMeetings: 0,
        cancelledMeetings: 0,
        revenue: 0,
        averageMeetingsPerDay: 0,
    })
    const [dateFilter, setDateFilter] = useState<{ type: string; start?: Date; end?: Date }>({ type: 'all' })

    const [, setTodayClasses] = useState(0)
    const [todaySessions, setTodaySessions] = useState<Session[]>([])
    const [cancelSessionId, setCancelSessionId] = useState<string | null>(null)
    const [rescheduleSessionId, setRescheduleSessionId] = useState<string | null>(null)
    const [userData, setUserData] = useState([]);
    const [rakiData, setRakiData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>setUserId(currentUser?._id!!),[currentUser])


    useEffect(() => {
        const fetchData = async () => {
            try {
                const [fetchedRakiData, fetchedUserData] = await Promise.all([
                    getRakis(),
                    getUsers(),
                ]);

                setRakiData(fetchedRakiData);
                setUserData(fetchedUserData);
            } catch (error) {
                console.error("Error fetching data:", error);
                toast({
                    title: "Error",
                    description: "Failed to fetch data. Please try again.",
                    variant: "destructive",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);




    useEffect(() => {
        const fetchData = async () => {
            try {
                if (currentUser?.role === 'super-admin') {
                    const revenue = await getRevenueData({
                        filterType: dateFilter.type,
                        startDate: formatDateTimeWithOffset(dateFilter.start) ,
                        endDate: formatDateTimeWithOffset(dateFilter.end),
                    })
                    setRevenueData(revenue)
                    setTodaySessions(revenue.totalMeetings)
                }

                const sessions = await getTodaySessions()
                if (Array.isArray(sessions)) {
                    setTodaySessions(sessions)
                } else {
                    setTodaySessions([])
                }
                setTodayClasses(sessions.filter(session => new Date(session.date).toDateString() === new Date().toDateString()).length)
            } catch (error) {
                console.error('Failed to fetch dashboard data:', error)
            }
        }

        fetchData()
    }, [currentUser, dateFilter])

    const handleDateFilterChange = (filter: { type: string; start?: Date; end?: Date }) => {
        console.log("Filter",filter)
        setDateFilter(filter)
    }

    const handleCancelSession = async (meetingId: string, reason: string) => {
        try {
            await cancelSession(meetingId, reason)
            const sessions = await getTodaySessions()
            if (Array.isArray(sessions)) {
                setTodaySessions(sessions)
            } else {
                setTodaySessions([])
            }
            setCancelSessionId(null)
        } catch (error) {
            console.error('Failed to cancel session:', error)
        }
    }

    const handleRescheduleSession = async (meetingId: string, newDate: Date) => {
        try {
            await rescheduleSession(meetingId, newDate.toISOString())
            const sessions = await getTodaySessions()
            if (Array.isArray(sessions)) {
                setTodaySessions(sessions)
            } else {
                setTodaySessions([])
            }
            setRescheduleSessionId(null)
        } catch (error) {
            console.error('Failed to reschedule session:', error)
        }
    }

    const isSuperAdmin= currentUser?.role==="super-admin"

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-primary-700">{isSuperAdmin && "Super" }  Admin Dashboard</h1>
                { isSuperAdmin && <DateRangeFilter onFilterChange={handleDateFilterChange} />}
            </div>
            {
                isSuperAdmin &&
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Total Sessions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">{revenueData.totalMeetings}</p>
                        </CardContent>
                    </Card>
                    <Card style={{background:"#C1E1C1"}}>
                        <CardHeader>
                            <CardTitle>Completed Sessions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">{revenueData.completedMeetings}</p>
                        </CardContent>
                    </Card>
                    <Card style={{background:"#FF6961"}}>
                        <CardHeader>
                            <CardTitle>Cancelled Sessions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">{revenueData.cancelledMeetings}</p>
                        </CardContent>
                    </Card>
                    <Card style={{background:"#A1D6B2"}}>
                        <CardHeader>
                            <CardTitle>Total Revenue</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">${revenueData.revenue.toFixed(2)}</p>
                        </CardContent>
                    </Card>
                </div>
            }

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
                            {todaySessions[0] && (
                            <TableBody>
                                {todaySessions.map((session) => (
                                    <TableRow key={session.meetingId}>
                                        <TableCell className="font-medium">{session.topic}</TableCell>
                                        <TableCell>{getNameById(session.rakiId,rakiData,"_id","name")}</TableCell>
                                        <TableCell>{getNameById(session.userId,userData,"_id","name")}</TableCell>
                                        <TableCell>{format(new Date(session.date), 'hh:mm a')}</TableCell>
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
                            )}
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
            {/*<button onClick={() => handleStartChat("679bbab33d6f1d2003462724")}>*/}
            {/*    Chat with user*/}
            {/*</button>*/}
            <ChatWidgetWrapper/>
        </div>
    )
}

export default withAuth(AdminDashboard, ["admin", "super-admin"]);

