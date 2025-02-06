'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CancelSessionDialog } from '@/components/CancelSessionDialog';
import { RescheduleSessionDialog } from '@/components/ResheduledSessionDialog';
import { DateRangeFilter } from '@/components/DateRangeFilter';
import { useChat } from '@/components/getStream/chat/ChatContextProvider';
import { ChatWidgetWrapper } from '@/components/getStream/chat/ChatWidgetWrapper';
import { toast } from '@/components/ui/use-toast';
import withAuth from '@/hoc/withAuth';
import { cancelSession, rescheduleSession } from '@/lib/api';
import SessionTable from "@/components/ui/dashboard/SessionTable";
import {IRevenueData, useDashboardData} from "@/components/ui/dashboard/useDashboardData";
import {useAuth} from "@/contexts/AuthContexts";

const AdminDashboard = () => {
    const { setUserId } = useChat();
    const { user :currentUser} = useAuth()

    const { isSuperAdmin, revenueData, todaySessions, setDateFilter, userData, rakiData } = useDashboardData();

    const [cancelSessionId, setCancelSessionId] = useState<string | null>(null);
    const [rescheduleSessionId, setRescheduleSessionId] = useState<string | null>(null);

    useEffect(() => {
        if (currentUser) setUserId(currentUser._id);
    }, [currentUser]);

    const handleCancelSession = async (meetingId: string, reason: string) => {
        try {
            await cancelSession(meetingId, reason);
            toast({ title: "Success", description: "Session cancelled successfully!" });
            setCancelSessionId(null);
        } catch (error) {
            toast({ title: "Error", description: `Failed to cancel session ${error}`, variant: "destructive" });
        }
    };

    const handleRescheduleSession = async (meetingId: string, newDate: Date) => {
        try {
            await rescheduleSession(meetingId, newDate.toISOString());
            toast({ title: "Success", description: "Session rescheduled successfully!" });
            setRescheduleSessionId(null);
        } catch (error) {
            toast({ title: "Error", description: `Failed to cancel session ${error}`, variant: "destructive" });
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-primary-700">{isSuperAdmin ? "Super " : ""} Admin Dashboard</h1>
                {isSuperAdmin && <DateRangeFilter onFilterChange={setDateFilter} />}
            </div>

            {isSuperAdmin && <DashboardStats revenueData={revenueData} />}

            <SessionTable sessions={todaySessions} userData={userData} rakiData={rakiData} setCancelSessionId={setCancelSessionId} setRescheduleSessionId={setRescheduleSessionId} />

            <CancelSessionDialog isOpen={!!cancelSessionId} onClose={() => setCancelSessionId(null)} onConfirm={(reason) => cancelSessionId && handleCancelSession(cancelSessionId, reason)} />
            <RescheduleSessionDialog isOpen={!!rescheduleSessionId} onClose={() => setRescheduleSessionId(null)} onConfirm={(newDate) => rescheduleSessionId && handleRescheduleSession(rescheduleSessionId, newDate)} />

            <ChatWidgetWrapper />
        </div>
    );
};

export default withAuth(AdminDashboard, ["admin", "super-admin"]);


const DashboardStats = ({ revenueData }:{revenueData:IRevenueData}) => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {[
            { title: "Total Sessions", value: revenueData.totalMeetings, bg: "" },
            { title: "Completed Sessions", value: revenueData.completedMeetings, bg: "#C1E1C1" },
            { title: "Cancelled Sessions", value: revenueData.cancelledMeetings, bg: "#FF6961" },
            { title: "Total Revenue", value: `$${revenueData.revenue.toFixed(2)}`, bg: "#A1D6B2" }
        ].map(({ title, value, bg }) => (
            <Card key={title} style={{ background: bg }}>
                <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
                <CardContent><p className="text-3xl font-bold">{value}</p></CardContent>
            </Card>
        ))}
    </div>
);
