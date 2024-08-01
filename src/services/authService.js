import axiosInstance from '../axiosInstance';

const login = async (email, password) => {
    const { data } = await axiosInstance.post('/auth/login', { email, password });
    return data;
};

const register = async (name, email, password) => {
    const { data } = await axiosInstance.post('/auth/register', { name, email, password });
    return data;
};

const getProfile = async (token) => {
    const { data } = await axiosInstance.get('/users/profile', {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};

const updateProfile = async (token, name, email) => {
    const { data } = await axiosInstance.put('/users/profile', { name, email }, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};

export { login, register, getProfile, updateProfile };
