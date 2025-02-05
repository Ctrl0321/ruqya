import axios from "axios";
import { getUserTimeZone } from "@/lib/utils";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
});

const apiSignup = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
});


// Attach token to requests automatically
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("fe-token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});


const userTimeZone = getUserTimeZone();

// Authentication
export const login = async (email, password) => {
    const response = await api.post("ruqya-api/auth/login", { email, password });
    localStorage.setItem("fe-token", response.data.token);
    return response.data;
};

export const signup = async (email,name,password) => {
    const response = await apiSignup.post("ruqya-api/auth/register", {email,name,password});
    localStorage.setItem("fe-token", response.data.token);
    return response.data;
};

// User Profile
export const getUserProfile = async (id) =>
    (await api.get(`ruqya-api/user/${id}`)).data;

export const getOwnProfile = async () =>
    (await api.get("ruqya-api/user/user-profile")).data;

export const getMyBookings = async () =>
    (await api.get(`ruqya-api/meeting/get-meetings/user/?timeZone=${userTimeZone}`)).data;

export const updateUserProfile = async (profileData) =>
    (await api.post("ruqya-api/user/update", profileData)).data;

export const changePassword = async (
    currentPassword,
    newPassword
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
export const updateUserRole = async (userId, newRole) =>
    (await api.post("ruqya-api/user/update-role", { userId, role: newRole })).data;

export const updateUserStatus = async (userId, status) =>
    (await api.post("ruqya-api/user/update-status", { userId, status })).data;

// Raki Management
export const getRakis = async () =>
    (await api.get("ruqya-api/raki/rakis")).data;

// Sessions & Meetings
export const getTodaySessions = async () =>
    (
        await api.get(
            `ruqya-api/meeting/get-today-meetings/?timeZone=${userTimeZone}`
        )
    ).data;

export const cancelSession = async (meetingId, note) =>
    (
        await api.post("ruqya-api/meeting/cancel", { meetingId, note })
    ).data;

export const rescheduleSession = async (meetingId, newDate) =>
    (await api.post("ruqya-api/meeting/reschedule", { meetingId, newDate })).data;

// Reviews
export const getReviews = async (rakiId) =>
    (await api.get(`ruqya-api/review/get-review/${rakiId}`)).data;


export const addReviews = async( rakiId, meetingId, points, comment) =>
    (await api.post(`ruqya-api/review/add-review`,{rakiId,meetingId,points,comment})).data;


// Revenue & Statistics
export const getRevenueData = async (filter) =>
    (
        await api.get("ruqya-api/meeting/get-meeting-statistics", {
            params: { ...filter, timeZone: userTimeZone },
        })
    ).data;

// Availability Management
export const getRakiAvailability = async (rakiId, date) =>
    (
        await api.get("ruqya-api/raki/get-availability", {
            params: { rakiId, date, timeZone: userTimeZone },
        })
    ).data.timeSlots;

export const setRakiAvailability = async (date, timeSlots) =>
    (
        await api.post("ruqya-api/raki/set-availability", {
            date,
            timeSlots,
            timeZone: userTimeZone,
        })
    ).data;

export const removeRakiAvailability = async (date, startTime) =>
    (
        await api.post("ruqya-api/raki/remove-availability", {
            date,
            startTime,
            timeZone: userTimeZone,
        })
    ).data;

// Meeting Verification & Streaming
export const verifyMeetingAccess = async (callId, userId) => {
    try {
        const response = await api.get(
            `ruqya-api/get-stream/getCallDetails/${callId}`
        );
        const members = response.data.callDetails?.members ?? [];
        const user = members.find(
            (member) => member.user_id === userId
        );

        if (!user) throw new Error("Unauthorized");

        return { role: user.role || "member", authorized: true, name: user.name };
    } catch (error) {
        throw new Error("Meeting verification failed");
    }
};

export const getStreamToken = async (userId, role) =>
    (await api.post("ruqya-api/get-stream/getCallToken", { userId, role })).data
        .token;

export const getStreamChatToken = async (userId) =>
    (await api.post("ruqya-api/get-stream/getuserToken", { userId })).data.token;



export default api;
