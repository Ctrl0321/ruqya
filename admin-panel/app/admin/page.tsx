'use client';

import { useEffect, useState } from 'react';
import { CancelSessionDialog } from '@/components/CancelSessionDialog';
import { RescheduleSessionDialog } from '@/components/ResheduledSessionDialog';
import { DateRangeFilter } from '@/components/DateRangeFilter';
import { useChat } from '@/components/getStream/chat/ChatContextProvider';
import { ChatWidgetWrapper } from '@/components/getStream/chat/ChatWidgetWrapper';
import { toast } from '@/components/ui/use-toast';
import withAuth from '@/hoc/withAuth';
import { cancelSession, rescheduleSession } from '@/lib/api';
import SessionTable from "@/components/ui/dashboard/SessionTable";
import {useDashboardData} from "@/components/ui/dashboard/useDashboardData";
import {useAuth} from "@/contexts/AuthContexts";
import {DashboardStats} from "@/components/ui/dashboard/DashboardStats";

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



