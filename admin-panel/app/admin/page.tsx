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
import {motion} from "framer-motion";
import {sendMeetingEmail} from "@/lib/emailService";

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
            const results=await rescheduleSession(meetingId, newDate.toISOString());
            const success = await sendMeetingEmail(results?.userId, results?.date, "New class date: Sept 15th.",`Hello Your class rescheduled`,"Aathiq");
            toast({ title: "Success", description: "Session rescheduled successfully!" });
            setRescheduleSessionId(null);
        } catch (error) {
            toast({ title: "Error", description: `Failed to cancel session ${error}`, variant: "destructive" });
        }
    };


    if (!currentUser || !revenueData || !todaySessions){
        return (
        <div className="flex items-center justify-center">
            <motion.div
                animate={{rotate: 360}}
                transition={{repeat: Infinity, duration: 1, ease: "linear"}}
                className="rounded-full h-16 w-16 border-t-4 border-b-4 border-[#0C8281] "
            />
            <p>Loading</p>
        </div>
        )
    }

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



