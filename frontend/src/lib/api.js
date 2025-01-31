import axios from 'axios';
import {getUserTimeZone} from "@/lib/utils";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
});


const userTimeZone = getUserTimeZone();


export const login = async (email, password) => {
    const response = await api.post('ruqya-api/auth/login', { email, password });
    const { token } = response.data;
    // localStorage.setItem('token', token);
    // api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return response.data;
}

export const getUserProfile = async (id) => {
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



// export const updateUserProfile = async (profileData: any) => {
//     const response = await api.post('ruqya-api/user/update', profileData);
//     return response.data;
// };

export const getUsers = async () => {
    const response = await api.get('ruqya-api/user/users');
    return response.data;
};

export const updateUserRole=async (userId, newRole)=>{

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

export const updateUserStatus=async (userId, newRole)=>{

    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error("No token found. Please log in.");
    }


    const response = await api.post('ruqya-api/user/update-role', {userId,role:newRole},{ headers: {
            Authorization: `Bearer ${token}`,
        },});
    return response.data;

}

export const getTodaySessions = async () => {
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
export const cancelSession=async (meetingId, note)=>{
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
export const rescheduleSession=async (meetingId,newDate)=>{
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error("No token found. Please log in.");
    }

    console.log("Messi ankara",newDate)
    // const response = await api.post('ruqya-api/meeting/reschedule', { meetingId, newDate },{
    //     headers: {
    //         Authorization: `Bearer ${token}`,
    //     }
    // });
    //
    // return response.data
}

export  const getReviews= async (rakiId)=>{
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



// export const updateRaki = async (tutorId: number, tutorData: any) => {
//     const response = await api.put(`/tutors/${tutorId}`, tutorData);
//     return response.data;
// };


export const getRevenueData = async (filter) => {
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




export const getRakiAvailability = async (rakiId, date) => {
    const token = localStorage.getItem("token")
    if (!token) {
        throw new Error("No token found. Please log in.")
    }

    const response = await api.get("ruqya-api/raki/get-availability/", {
        params:{
            rakiId,
            date,
            timeZone:userTimeZone
        },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data
}

export const setRakiAvailability = async (date,timeSlots) => {
    const token = localStorage.getItem("token")
    if (!token) {
        throw new Error("No token found. Please log in.")
    }
    const timeZone=userTimeZone

    const response = await api.post("ruqya-api/raki/set-availability", {date,timeSlots,timeZone}, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    return response.data
}

export const removeRakiAvailability = async (date, startTime) => {
    const token = localStorage.getItem("token")
    if (!token) {
        throw new Error("No token found. Please log in.")

    }
    const timeZone=userTimeZone
    const response = await api.post("ruqya-api/raki/remove-availability", {date,startTime,timeZone}, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    return response.data
}


// export const getClassData = async (selectedMonth: { type }) => {
//     const month=selectedMonth
//     const response = await api.get('/classes');
//     return response.data;
// }


export const verifyMeetingAccess = async (callId, userId) => {
    try {
        const response = await api.get(`ruqya-api/meeting/getCallDetails/${callId}`);
        const { callDetails } = response.data;

        // Extract members from the call details
        const members = callDetails?.members ?? [];

        // Find the user in the members array
        const user = members.find((member) => {
            console.log("Checking member:", member.user_id);
            return member.user_id === userId.toString(); // Ensure comparison works
        });

        console.log("Found User:", user, "All Members:", members, "Input User ID:", userId);

        if (!user) {
            throw new Error('Unauthorized');
        }

        return {
            role: user.role || 'member',
            authorized: true,
            name:user.name
        };
    } catch (error) {
        throw new Error('Meeting verification failed');
    }
};



export const getStreamToken = async (userId, role) => {
    const response = await api.post(`ruqya-api/meeting/getCallToken`, { userId, role });
    return response.data.token;
};



export default api;

