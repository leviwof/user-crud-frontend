import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const userService = {
    // Get all users
    getAll: async () => {
        const response = await api.get('/');
        return response.data;
    },

    // Get single user
    getById: async (id) => {
        const response = await api.get(`/${id}`);
        return response.data;
    },

    // Create user
    create: async (userData) => {
        const response = await api.post('/', userData);
        return response.data;
    },

    // Update user
    update: async (id, userData) => {
        const response = await api.put(`/${id}`, userData);
        return response.data;
    },

    // Delete user
    delete: async (id) => {
        const response = await api.delete(`/${id}`);
        return response.data;
    }
};

export default userService;