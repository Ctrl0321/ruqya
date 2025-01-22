import axios from 'axios';
import {getUserTimeZone} from "@/lib/utils";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
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


export const login = async (email: string, password: string) => {
    const response = await api.post('ruqya-api/auth/login', { email, password });
    const { token } = response.data;
    localStorage.setItem('token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return response.data;
}

export const getUserProfile = async (id: string) => {
    const response = await api.get(`ruqya-api/user/${id}`);
    return response.data;
};
export const getOwnProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error("No token found. Please log in.");
    }

    const response = await api.get('ruqya-api/user/user-profile', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};



export const updateUserProfile = async (profileData: any) => {
    const response = await api.post('ruqya-api/user/update', profileData);
    return response.data;
};

export const getUsers = async () => {
    const response = await api.get('ruqya-api/user/users');
    return response.data;
};

export const updateUserRole=async (userId:String, newRole:String)=>{

    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error("No token found. Please log in.");
    }


    const response = await api.post('ruqya-api/user/update-role', {userId,role:newRole},{ headers: {
            Authorization: `Bearer ${token}`,
        },});
    return response.data;}

export const getRakis = async () => {
    const response = await api.get('ruqya-api/raki/rakis');
    return response.data;
};

export const updateUserStatus=async (userId:String, newRole:String)=>{

    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error("No token found. Please log in.");
    }


    const response = await api.post('ruqya-api/user/update-role', {userId,role:newRole},{ headers: {
            Authorization: `Bearer ${token}`,
        },});
    return response.data;

}

export const getTodaySessions = async (): Promise<Session[]> => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error("No token found. Please log in.");
    }
    const response = await api.get(`ruqya-api/meeting/get-today-meetings/?timeZone=${userTimeZone}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });


    return response.data
};
export const cancelSession=async (meetingId:string,note:string)=>{
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error("No token found. Please log in.");
    }
    const response = await api.post('ruqya-api/meeting//cancel/', { meetingId, note },{
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    return response.data
}
export const rescheduleSession=async (meetingId:string,newDate:string)=>{
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error("No token found. Please log in.");
    }
    const response = await api.post('ruqya-api/meeting/reschedule', { meetingId, newDate },{
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    return response.data
}

export  const getReviews= async (rakiId:string)=>{
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error("No token found. Please log in.");
    }
    const response = await api.get(`ruqya-api/review/get-review/${rakiId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    return response.data
}



export const updateRaki = async (tutorId: number, tutorData: any) => {
    const response = await api.put(`/tutors/${tutorId}`, tutorData);
    return response.data;
};


export const getRevenueData = async (filter: { filterType?: string; startDate?: string; endDate?: string;  }) => {
    const { filterType, startDate, endDate } = filter;

    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error("No token found. Please log in.");
    }

    const response = await api.get('ruqya-api/meeting/get-meeting-statistics', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            filterType,
            startDate,
            endDate,
            timeZone:userTimeZone
        }
    });

    return response.data;
};

export const setRakiAvailability = async (date:Date, timeSlots:[{startTime:Date,endTime:Date}]) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error("No token found. Please log in.");
    }

    console.log("Messi",date,timeSlots)

    // const response = await api.post('ruqya-api/raki/set-availability',
    //     {
    //       date,
    //       timeSlots,
    //       timeZone:userTimeZone
    //     },
    //     {
    //     headers: {
    //         Authorization: `Bearer ${token}`,
    //     },
    //
    // });

    // return response.data;
};

export const removeRakiAvailability = async (date:Date,startTime:Date) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error("No token found. Please log in.");
    }

    const response = await api.post('ruqya-api/raki/remove-availability',
        {
            date,
            startTime,
            timeZone:userTimeZone
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },

        });

    return response.data;
};

export const getClassData = async (selectedMonth: { type: string }) => {
    const response = await api.get('/classes');
    return response.data;
}



export default api;

