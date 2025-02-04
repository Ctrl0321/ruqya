import axios from "axios";
import { getUserTimeZone } from "@/lib/utils";
import { TimeSlot } from "@/app/admin/availability/page";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
});

// Attach token to requests automatically
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

interface Session {
    meetingId: string;
    topic: string;
    date: Date;
    rakiId: string;
    userId: string;
    notificationSend: boolean;
}

const userTimeZone = getUserTimeZone();

// Authentication
export const login = async (email: string, password: string) => {
    const response = await api.post("ruqya-api/auth/login", { email, password });
    localStorage.setItem("token", response.data.token);
    return response.data;
};

// User Profile
export const getUserProfile = async (id: string) =>
    (await api.get(`ruqya-api/user/${id}`)).data;

export const getOwnProfile = async () =>
    (await api.get("ruqya-api/user/user-profile")).data;

export const getMyBookings = async () =>
    (await api.get(`ruqya-api/meeting/get-meetings/user/?timeZone=${userTimeZone}`)).data;

export const updateUserProfile = async (profileData: any) =>
    (await api.post("ruqya-api/user/update", profileData)).data;

export const changePassword = async (
    currentPassword: string,
    newPassword: string
) =>
    (
        await api.post("ruqya-api/user/change-password", {
            currentPassword,
            newPassword,
        })
    ).data;

export const getUsers = async () =>
    (await api.get("ruqya-api/user/users")).data;

// User Role & Status Management
export const updateUserRole = async (userId: string, newRole: string) =>
    (await api.post("ruqya-api/user/update-role", { userId, role: newRole })).data;

export const updateUserStatus = async (userId: string, status: string) =>
    (await api.post("ruqya-api/user/update-status", { userId, status })).data;

// Raki Management
export const getRakis = async () =>
    (await api.get("ruqya-api/raki/rakis")).data;

// Sessions & Meetings
export const getTodaySessions = async (): Promise<Session[]> =>
    (
        await api.get(
            `ruqya-api/meeting/get-today-meetings/?timeZone=${userTimeZone}`
        )
    ).data;

export const cancelSession = async (meetingId: string, note: string) =>
    (
        await api.post("ruqya-api/meeting/cancel", { meetingId, note })
    ).data;

export const rescheduleSession = async (meetingId: string, newDate: string) =>
    (await api.post("ruqya-api/meeting/reschedule", { meetingId, newDate })).data;

// Reviews
export const getReviews = async (rakiId: string) =>
    (await api.get(`ruqya-api/review/get-review/${rakiId}`)).data;

export const addReviews = async( rakiId:string, meetingId:string, points:number, comment:string) =>
    (await api.post(`ruqya-api/review/add-review`,{rakiId,meetingId,points,comment})).data;

// Revenue & Statistics

export const getMeetings = async () =>
    (await api.get(`ruqya-api/meeting/get-meetings/?timeZone=${userTimeZone}`)).data;

export const getMeetingsByRakiId = async () =>
    (await api.get(`ruqya-api/meeting/get-meetings/raki/?timeZone=${userTimeZone}`)).data;

export const getRevenueData = async (filter: {
    filterType?: string;
    startDate?: string;
    endDate?: string;
}) =>
    (
        await api.get("ruqya-api/meeting/get-meeting-statistics", {
            params: { ...filter, timeZone: userTimeZone },
        })
    ).data;

// Availability Management
export const getRakiAvailability = async (
    rakiId: string | undefined,
    date: string
) =>
    (
        await api.get("ruqya-api/raki/get-availability", {
            params: { rakiId, date, timeZone: userTimeZone },
        })
    ).data;

export const setRakiAvailability = async (date: string, timeSlots: TimeSlot[]) =>
    (
        await api.post("ruqya-api/raki/set-availability", {
            date,
            timeSlots,
            timeZone: userTimeZone,
        })
    ).data;

export const removeRakiAvailability = async (date: string, startTime: string) =>
    (
        await api.post("ruqya-api/raki/remove-availability", {
            date,
            startTime,
            timeZone: userTimeZone,
        })
    ).data;

// Meeting Verification & Streaming
export const verifyMeetingAccess = async (callId: string, userId: string) => {
    try {
        const response = await api.get(
            `ruqya-api/get-stream/getCallDetails/${callId}`
        );
        const members = response.data.callDetails?.members ?? [];
        const user = members.find(
            (member: { user_id: string }) => member.user_id === userId
        );

        if (!user) throw new Error("Unauthorized");

        return { role: user.role || "member", authorized: true, name: user.name };
    } catch (error) {
        throw new Error("Meeting verification failed");
    }
};

export const getStreamToken = async (userId: string, role: string) =>
    (await api.post("ruqya-api/get-stream/getCallToken", { userId, role })).data
        .token;

export const getStreamChatToken = async (userId: string) =>
    (await api.post("ruqya-api/get-stream/getuserToken", { userId })).data.token;

export default api;
