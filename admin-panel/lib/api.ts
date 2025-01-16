import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const login = async (email: string, password: string) => {
    const response = await api.post('ruqya-api/auth/login', { email, password });
    const { token } = response.data;
    localStorage.setItem('token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return response.data;
};

export const getUserProfile = async () => {
    const response = await api.get('/user/profile');
    return response.data;
};

export const updateUserProfile = async (profileData: any) => {
    const response = await api.put('/user/profile', profileData);
    return response.data;
};

export const getUsers = async () => {
    const response = await api.get('/users');
    return response.data;
};

export const getTutors = async () => {
    const response = await api.get('/tutors');
    return response.data;
};

export const updateTutor = async (tutorId: number, tutorData: any) => {
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

