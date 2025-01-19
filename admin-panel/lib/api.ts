import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
});

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

export  const getReviews= async (tutorId:string)=>{
    const dummyData = [
        {
            rakiId: "R001",
            meetingId: "M001",
            userId: "U001",
            points: 10,
            comment: "Great participation in the meeting."
        },
        {
            rakiId: "R002",
            meetingId: "M002",
            userId: "U002",
            points: 8,
            comment: "Good contributions during the discussion."
        },
        {
            rakiId: "R003",
            meetingId: "M003",
            userId: "U003",
            points: 7,
            comment: "Provided useful insights in the session."
        },
        {
            rakiId: "R004",
            meetingId: "M004",
            userId: "U004",
            points: 9,
            comment: "Active engagement throughout the meeting."
        },
        {
            rakiId: "R005",
            meetingId: "M005",
            userId: "U005",
            points: 6,
            comment: "Improved involvement but needs more input."
        },
        {
            rakiId: "R006",
            meetingId: "M006",
            userId: "U006",
            points: 10,
            comment: "Excellent contributions and ideas shared."
        },
        {
            rakiId: "R007",
            meetingId: "M007",
            userId: "U007",
            points: 5,
            comment: "Minimal contribution; needs improvement."
        },
        {
            rakiId: "R008",
            meetingId: "M008",
            userId: "U008",
            points: 8,
            comment: "Good participation and thoughtful comments."
        },
        {
            rakiId: "R009",
            meetingId: "M009",
            userId: "U009",
            points: 7,
            comment: "Contributed well to the brainstorming session."
        },
        {
            rakiId: "R010",
            meetingId: "M010",
            userId: "U010",
            points: 9,
            comment: "Demonstrated excellent analytical skills."
        },
        {
            rakiId: "R011",
            meetingId: "M011",
            userId: "U011",
            points: 6,
            comment: "Provided a few good points but lacked depth."
        },
        {
            rakiId: "R012",
            meetingId: "M012",
            userId: "U012",
            points: 10,
            comment: "Outstanding performance and engagement."
        },
        {
            rakiId: "R013",
            meetingId: "M013",
            userId: "U013",
            points: 8,
            comment: "Actively participated with valuable input."
        },
        {
            rakiId: "R014",
            meetingId: "M014",
            userId: "U014",
            points: 7,
            comment: "Good effort but can improve further."
        },
        {
            rakiId: "R015",
            meetingId: "M015",
            userId: "U015",
            points: 9,
            comment: "Excellent team collaboration and ideas."
        }
    ];

    return dummyData
}



export const updateRaki = async (tutorId: number, tutorData: any) => {
    const response = await api.put(`/tutors/${tutorId}`, tutorData);
    return response.data;
};

export const getRevenueData = async () => {
    const response = await api.get('/revenue');
    return response.data;
};

export const getClassData = async () => {
    const response = await api.get('/classes');
    return response.data;
};

export default api;

